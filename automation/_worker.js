const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

const PRIVATE_HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store, private",
  "x-robots-tag": "noindex, nofollow, noarchive",
  "x-frame-options": "DENY",
  "referrer-policy": "no-referrer",
  "content-security-policy": "default-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/api/interesadas") {
      return handleLead(request, env, url, ctx);
    }

    if (url.pathname === "/interesadas" || url.pathname === "/interesadas/") {
      if (!isAuthorized(request, env)) return unauthorized();
      if (!env.INTERESADAS) return configurationError("Falta conectar el registro privado.");
      const primaryLeads = await readLeads(env.INTERESADAS);
      const backupLeads = env.INTERESADAS_BACKUP ? await readLeads(env.INTERESADAS_BACKUP) : [];
      const leads = mergeLeads(primaryLeads, backupLeads);
      return new Response(renderDashboard(leads, { primaryCount: primaryLeads.length, backupCount: backupLeads.length, backupConfigured: Boolean(env.INTERESADAS_BACKUP) }), { headers: PRIVATE_HEADERS });
    }

    if (url.pathname === "/interesadas.csv") {
      if (!isAuthorized(request, env)) return unauthorized();
      if (!env.INTERESADAS) return configurationError("Falta conectar el registro privado.");
      const primaryLeads = await readLeads(env.INTERESADAS);
      const backupLeads = env.INTERESADAS_BACKUP ? await readLeads(env.INTERESADAS_BACKUP) : [];
      const leads = mergeLeads(primaryLeads, backupLeads);
      return new Response(toCsv(leads), {
        headers: {
          "content-type": "text/csv; charset=utf-8",
          "content-disposition": 'attachment; filename="interesadas-vida-modo-ohm.csv"',
          "cache-control": "no-store, private",
          "x-robots-tag": "noindex, nofollow, noarchive",
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleLead(request, env, url, ctx) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Método no permitido" }, 405, { Allow: "POST" });
  }
  if (!env.INTERESADAS) {
    return json({ ok: false, error: "Servicio no configurado" }, 503);
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== url.origin) {
    return json({ ok: false, error: "Origen no permitido" }, 403);
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: "Datos no válidos" }, 400);
  }

  const name = clean(input.name, 100);
  const email = clean(input.email, 180).toLowerCase();
  const phone = clean(input.phone, 40);
  const consent = input.consent === "accepted" || input.consent === true;

  if (!name || !isEmail(email) || !consent) {
    return json({ ok: false, error: "Revisa el nombre, el correo y el consentimiento" }, 400);
  }

  // A welcome can be retried after a previous delivery attempt failed.
  const welcomeKey = `welcome:${email}`;
  const welcomeSent = await env.INTERESADAS.get(welcomeKey);

  const createdAt = new Date().toISOString();
  const record = { name, email, phone, consent: true, createdAt };
  const key = `lead:${createdAt}:${crypto.randomUUID()}`;
  const payload = JSON.stringify(record);
  await env.INTERESADAS.put(key, payload);

  let backupSaved = false;
  if (env.INTERESADAS_BACKUP) {
    try {
      await env.INTERESADAS_BACKUP.put(key, payload);
      backupSaved = true;
    } catch (error) {
      console.error("No se pudo guardar la copia de seguridad de interesadas", error);
    }
  }

  if (env.RESEND_API_KEY && !welcomeSent) {
    ctx.waitUntil(sendWelcomeEmail(env.RESEND_API_KEY, email, name).then(async (accepted) => {
      if (accepted) await env.INTERESADAS.put(welcomeKey, new Date().toISOString());
    }));
  } else if (!env.RESEND_API_KEY && !welcomeSent) {
    console.error("RESEND_API_KEY no está configurada; registro guardado sin correo de bienvenida");
  }

  return json({ ok: true, backupSaved }, 201);
}

async function sendWelcomeEmail(apiKey, recipient, name) {
  // Resend deduplicates concurrent form submissions even while KV is propagating.
  const recipientHash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(recipient));
  const idempotencyKey = `vmo-welcome-v1/${Array.from(new Uint8Array(recipientHash), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
  const text = `Hola, ${name}:

Gracias por formar parte de Vida Modo Ohm, un espacio creado para parar, respirar y volver a ti.

Aquí encontrarás herramientas, recursos y pequeños momentos pensados para acompañarte en tu bienestar interior.

También queremos que conozcas Vibrando en Positivo, nuestra comunidad gratuita de WhatsApp, un espacio donde compartimos prácticas, reflexiones y contenido para seguir caminando juntas.

Dentro de Vida Modo Ohm también encontrarás Refugio de Paz: tu espacio de bienestar interior, nuestra membresía de acompañamiento con prácticas, encuentros y herramientas para ayudarte a dedicarte tiempo, escucharte y volver a ti.

Puedes acceder a todo desde nuestra página web.

🌿 ENTRAR EN VIDA MODO OHM
https://vidamodoohm.es`;

  const html = `<!doctype html>
<html lang="es"><body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#333333">
<div style="max-width:620px;margin:0 auto;padding:36px 24px;line-height:1.65;font-size:16px">
<p>Hola, ${escapeHtml(name)}:</p>
<p>Gracias por formar parte de Vida Modo Ohm, un espacio creado para parar, respirar y volver a ti.</p>
<p>Aquí encontrarás herramientas, recursos y pequeños momentos pensados para acompañarte en tu bienestar interior.</p>
<p>También queremos que conozcas Vibrando en Positivo, nuestra comunidad gratuita de WhatsApp, un espacio donde compartimos prácticas, reflexiones y contenido para seguir caminando juntas.</p>
<p>Dentro de Vida Modo Ohm también encontrarás Refugio de Paz: tu espacio de bienestar interior, nuestra membresía de acompañamiento con prácticas, encuentros y herramientas para ayudarte a dedicarte tiempo, escucharte y volver a ti.</p>
<p>Puedes acceder a todo desde nuestra página web.</p>
<p style="margin-top:30px;text-align:center"><a href="https://vidamodoohm.es" style="display:inline-block;padding:14px 22px;border-radius:8px;background:#7f9d87;color:#ffffff;text-decoration:none;font-weight:700">🌿 ENTRAR EN VIDA MODO OHM</a></p>
</div></body></html>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: "Vida Modo Ohm <hola@vidamodoohm.es>",
        to: [recipient],
        subject: "Bienvenida a Vida Modo Ohm 🌿",
        html,
        text,
      }),
    });
    if (!response.ok) {
      console.error("Correo de bienvenida rechazado por Resend", response.status, (await response.text()).slice(0, 500));
      return false;
    }
    return true;
  } catch (error) {
    console.error("No se pudo enviar el correo de bienvenida", error);
    return false;
  }
}

function clean(value, maxLength) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

function isAuthorized(request, env) {
  const expectedUser = env.ADMIN_USER || "laly";
  const expectedPassword = env.ADMIN_PASSWORD || "";
  if (!expectedPassword) return false;

  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Basic ")) return false;

  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return false;
    const user = decoded.slice(0, separator);
    const password = decoded.slice(separator + 1);
    return safeEqual(user, expectedUser) && safeEqual(password, expectedPassword);
  } catch {
    return false;
  }
}

function safeEqual(a, b) {
  const left = new TextEncoder().encode(String(a));
  const right = new TextEncoder().encode(String(b));
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (left[index] || 0) ^ (right[index] || 0);
  }
  return difference === 0;
}

function unauthorized() {
  return new Response("Acceso privado de Vida Modo Ohm", {
    status: 401,
    headers: {
      "www-authenticate": 'Basic realm="Zona privada Vida Modo Ohm", charset="UTF-8"',
      ...PRIVATE_HEADERS,
    },
  });
}

function configurationError(message) {
  return new Response(`<!doctype html><meta charset="utf-8"><title>Zona privada</title><p>${escapeHtml(message)}</p>`, {
    status: 503,
    headers: PRIVATE_HEADERS,
  });
}

async function readLeads(namespace) {
  const keys = [];
  let cursor;
  do {
    const page = await namespace.list({ prefix: "lead:", limit: 1000, cursor });
    keys.push(...page.keys.map((item) => item.name));
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  const values = await Promise.all(keys.map((key) => namespace.get(key, "json")));
  return values.filter(Boolean).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

function mergeLeads(primary, backup) {
  const seen = new Set();
  return [...primary, ...backup]
    .filter(Boolean)
    .filter((lead) => {
      const signature = [lead.createdAt, lead.email, lead.phone, lead.name].map((value) => String(value ?? "")).join("|");
      if (seen.has(signature)) return false;
      seen.add(signature);
      return true;
    })
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

function renderDashboard(leads, storage = {}) {
  const rows = leads.length
    ? leads.map((lead) => `
      <tr>
        <td>${escapeHtml(formatDate(lead.createdAt))}</td>
        <td><strong>${escapeHtml(lead.name)}</strong></td>
        <td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td>
        <td>${lead.phone ? `<a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a>` : "—"}</td>
      </tr>`).join("")
    : '<tr><td class="empty" colspan="4">Todavía no hay personas registradas.</td></tr>';

  return `<!doctype html>
  <html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="robots" content="noindex,nofollow,noarchive">
    <title>Interesadas · Vida Modo Ohm</title>
    <style>
      :root{--ink:#263d2c;--sage:#819174;--blush:#efd3d2;--paper:#fbfaf7;--line:#dfe5dc}
      *{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
      header{padding:38px 5vw 28px;background:#fff;border-bottom:1px solid var(--line)}
      .eyebrow{margin:0 0 8px;letter-spacing:.2em;font-size:12px;font-weight:700}.top{display:flex;gap:24px;align-items:end;justify-content:space-between;flex-wrap:wrap}
      h1{font-family:Georgia,serif;font-weight:500;font-size:clamp(34px,6vw,64px);margin:0}.count{color:var(--sage);font-size:18px;margin:8px 0 0}
      .actions{display:flex;gap:10px;flex-wrap:wrap}.button{display:inline-block;border-radius:999px;padding:12px 18px;text-decoration:none;font-weight:700;border:1px solid var(--ink)}
      .primary{background:var(--ink);color:#fff}.secondary{background:#fff;color:var(--ink)}main{padding:30px 5vw 60px}
      .card{overflow:auto;background:#fff;border:1px solid var(--line);border-radius:20px;box-shadow:0 16px 45px rgba(38,61,44,.08)}
      table{width:100%;border-collapse:collapse;min-width:760px}th,td{text-align:left;padding:16px 18px;border-bottom:1px solid var(--line);vertical-align:top}
      th{font-size:12px;letter-spacing:.12em;text-transform:uppercase;background:#f3f5f0}td{font-size:15px}tr:last-child td{border-bottom:0}a{color:var(--ink)}.empty{text-align:center;padding:50px;color:#718073}
      .privacy{margin:18px 4px;color:#718073;font-size:13px}.dot{color:#dca9aa}.storage{margin:18px 0;padding:14px 16px;border-radius:14px;background:#f3f5f0;color:#526253;font-size:13px}.storage.warn{background:#fff3e6;color:#7a4d22}.storage strong{color:var(--ink)}
    </style>
  </head>
  <body>
    <header>
      <p class="eyebrow">VIDA MODO OHM <span class="dot">·</span> ZONA PRIVADA</p>
      <div class="top">
        <div><h1>Personas interesadas</h1><p class="count">${leads.length} ${leads.length === 1 ? "registro" : "registros"}</p></div>
        <div class="actions"><a class="button secondary" href="/interesadas">Actualizar</a><a class="button primary" href="/interesadas.csv">Descargar CSV</a></div>
      </div>
    </header>
    <main>
      ${storage.backupConfigured
        ? `<div class="storage${storage.primaryCount === 0 && storage.backupCount > 0 ? " warn" : ""}"><strong>Estado del almacenamiento:</strong> principal ${storage.primaryCount ?? 0} · copia ${storage.backupCount ?? 0}${storage.primaryCount === 0 && storage.backupCount > 0 ? " · Atención: la principal está vacía; se muestran los datos recuperados de la copia." : ""}</div>`
        : `<div class="storage warn"><strong>Copia de seguridad no conectada.</strong> La lista funciona, pero conviene añadir una segunda KV como INTERESADAS_BACKUP para tener redundancia.</div>`}
      <div class="card"><table><thead><tr><th>Fecha</th><th>Nombre</th><th>Correo</th><th>Teléfono</th></tr></thead><tbody>${rows}</tbody></table></div>
      <p class="privacy">Información privada de Vida Modo Ohm. No compartas esta dirección ni tus datos de acceso.</p>
    </main>
  </body>
  </html>`;
}

function formatDate(value) {
  try {
    return new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Europe/Madrid",
    }).format(new Date(value));
  } catch {
    return String(value || "");
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function csvCell(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function toCsv(leads) {
  const header = ["Fecha", "Nombre", "Correo electrónico", "Teléfono"];
  const rows = leads.map((lead) => [formatDate(lead.createdAt), lead.name, lead.email, lead.phone]);
  return "\uFEFF" + [header, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n");
}
