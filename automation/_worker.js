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

    if (url.pathname === "/regalo" || url.pathname === "/regalo/" || url.pathname === "/regalo/index.html") {
      return new Response("<!doctype html>\n<html lang=\"es\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>Mi primer encuentro contigo · Vida Modo Ohm</title><meta name=\"robots\" content=\"noindex\"><style>\n*{box-sizing:border-box}body{background:#eff1ed;color:#3d5145;font-family:Arial,Helvetica,sans-serif;margin:0}.toolbar{padding:13px 20px;text-align:center;position:sticky;top:0;background:#f8faf7;box-shadow:0 1px 6px #0001;z-index:5}.toolbar a,.toolbar button{display:inline-block;border:1px solid #849c8e;border-radius:5px;background:#829c89;color:white;padding:11px 20px;text-decoration:none;font-size:14px;cursor:pointer}.toolbar span{font-size:13px;margin-right:14px}.page{width:min(794px,calc(100% - 24px));min-height:1050px;margin:28px auto;background:#fffdfb;box-shadow:0 5px 24px #13201615;padding:75px 75px 65px;position:relative;page-break-after:always}.brand{letter-spacing:4px;font-size:13px;font-weight:bold;color:#8da394}.eyebrow{text-align:center;font-weight:bold;letter-spacing:3px;color:#879e8e;font-size:13px;margin:70px 0 20px}h1,h2,h3{font-family:Georgia,'Times New Roman',serif;font-weight:400;color:#455f4e;text-align:center}h1{font-size:61px;line-height:1.04;margin:105px 0 30px}h2{font-size:32px;line-height:1.2;margin:24px 0 55px}h3{font-size:23px}p{font-size:16px;line-height:1.85;margin:17px 0}section{margin-top:48px}.small{font-size:15px}.accent{background:#f0f5ef;padding:22px 28px;margin:42px 0;text-align:center}strong{color:#5a7462}.quote{font-family:Georgia,serif;font-size:22px;color:#65866e;text-align:center;margin:26px 0}.step{border-bottom:1px solid #d5e0d7;padding:15px 0}.step b{letter-spacing:1px}.footer{position:absolute;bottom:34px;left:75px;right:75px;font-size:11px;color:#8a9d8d;display:flex;justify-content:space-between;letter-spacing:1px}.intro{text-align:center;font-size:19px}.resource{font-size:16px;padding:9px 0}.link{color:#5b8266}.last{text-align:center;margin-top:70px}.last a{color:#456c52} @media print{body{background:white}.toolbar{display:none}.page{margin:0;width:210mm;min-height:297mm;box-shadow:none;padding:20mm;break-after:page}.footer{bottom:15mm;left:20mm;right:20mm}}@media(max-width:680px){.page{min-height:820px;padding:42px 30px}.footer{left:30px;right:30px}h1{font-size:45px}h2{font-size:28px}.eyebrow{margin-top:44px}}\n</style></head><body><div class=\"toolbar\"><span>🎁 Tu regalo · Vida Modo Ohm</span><button onclick=\"window.print()\">Guardar como PDF</button></div>\n<article class=\"page\"><div class=\"brand\">VIDA MODO OHM</div><h1>MI PRIMER<br>ENCUENTRO<br>CONTIGO</h1><p class=\"intro\">Una pausa para escucharte,<br>comprenderte y acompañarte</p><p class=\"eyebrow\">MÉTODO RAIN</p><p class=\"last\">Una guía práctica para comenzar a volver a ti</p></article>\n<article class=\"page\"><div class=\"brand\">VIDA MODO OHM</div><p class=\"eyebrow\">BIENVENIDA</p><h2>Este momento es para ti</h2><p>Quizá llevas días atendiendo pendientes, escuchando a otras personas y resolviendo todo lo que aparece. Pero ¿cuándo fue la última vez que te preguntaste cómo estás realmente?</p><p>Este pequeño e-book es una invitación a detenerte unos minutos. No necesitas saber meditar, solo tener disposición para mirar lo que sientes con curiosidad y amabilidad.</p><section><h3>¿Qué es RAIN?</h3><p>Es una práctica de atención plena que te ayuda a relacionarte con una emoción difícil sin ignorarla ni luchar contra ella. Sus cuatro pasos son: Reconocer, Aceptar, Investigar y Nutrir.</p></section><div class=\"accent\"><strong>No tienes que cambiar lo que sientes<br>para empezar a cuidarte</strong></div><p class=\"small\">Busca un lugar tranquilo, respira de forma natural y dedica entre cinco y diez minutos a este primer encuentro. Si algo resulta demasiado intenso, puedes parar y volver a mirar a tu alrededor.</p><div class=\"footer\"><span>ANTES DE COMENZAR</span><span>02 / 06</span></div></article>\n<article class=\"page\"><div class=\"brand\">VIDA MODO OHM</div><p class=\"eyebrow\">MÉTODO RAIN</p><h2>Reconocer y aceptar</h2><section><h3>R · RECONOCER</h3><p>Detente y observa qué está pasando dentro de ti. Tal vez notes tristeza, preocupación, rabia, cansancio o una mezcla de emociones. Ponle un nombre sin juzgarte.</p><div class=\"accent\">Pregúntate:<div class=\"quote\">«¿Qué estoy sintiendo ahora mismo?»</div></div></section><section><h3>A · ACEPTAR</h3><p>Permite que esa emoción esté presente durante unos instantes. Aceptar no significa que te guste lo que sucede ni que tengas que resignarte. Significa reconocer: esto es lo que siento ahora.</p><div class=\"accent\">Puedes decirte:<div class=\"quote\">«Puedo darme permiso para sentir esto».</div></div></section><div class=\"footer\"><span>LOS DOS PRIMEROS PASOS</span><span>03 / 06</span></div></article>\n<article class=\"page\"><div class=\"brand\">VIDA MODO OHM</div><p class=\"eyebrow\">MÉTODO RAIN</p><h2>Investigar y nutrir</h2><section><h3>I · INVESTIGAR</h3><p>Explora con suavidad cómo se manifiesta la emoción en tu cuerpo. ¿Hay tensión en los hombros, un nudo en el estómago o presión en el pecho? No necesitas buscar una explicación.</p><div class=\"accent\">Pregúntate:<div class=\"quote\">«¿Dónde lo noto? ¿Qué necesito ahora?»</div></div></section><section><h3>N · NUTRIR</h3><p>Ofrece a esa parte de ti comprensión y cuidado. Puedes apoyar una mano sobre el pecho si te resulta agradable, respirar despacio o decirte unas palabras amables.</p><div class=\"accent\">Prueba con esta frase:<div class=\"quote\">«Estoy aquí para mí. Puedo acompañarme».</div></div></section><div class=\"footer\"><span>LOS DOS SIGUIENTES PASOS</span><span>04 / 06</span></div></article>\n<article class=\"page\"><div class=\"brand\">VIDA MODO OHM</div><p class=\"eyebrow\">EJERCICIO GUIADO</p><h2>Tu primer encuentro</h2><p>Regálate unos minutos. Lee cada paso con calma y haz una pausa antes de continuar.</p><section><div class=\"step\"><b>01 · PAUSA</b><p>Apoya los pies en el suelo. Observa el espacio que te rodea y respira con naturalidad.</p></div><div class=\"step\"><b>02 · RECONOCE</b><p>Nombra en silencio la emoción que está más presente.</p></div><div class=\"step\"><b>03 · ACEPTA</b><p>Date permiso para sentirla sin exigirte que desaparezca.</p></div><div class=\"step\"><b>04 · INVESTIGA</b><p>Observa dónde la notas y pregúntate qué necesitas.</p></div><div class=\"step\"><b>05 · NUTRE</b><p>Háblate como lo harías con alguien a quien quieres.</p></div></section><h3>¿Qué me llevo de este momento?</h3><div class=\"footer\"><span>TU PRÁCTICA</span><span>05 / 06</span></div></article>\n<article class=\"page\"><div class=\"brand\">VIDA MODO OHM</div><p class=\"eyebrow\">TU CAMINO CONTINÚA</p><h2>Este es solo el comienzo</h2><p>Acabas de regalarte algo valioso: un momento para escucharte. Tal vez no hayas encontrado todas las respuestas, y está bien. La práctica no consiste en hacerlo perfecto, sino en aprender a acompañarte un poco mejor cada día.</p><section class=\"accent\"><h3>¿Quieres seguir profundizando?</h3><p>En Vida Modo Ohm encontrarás diferentes e-books y cuadernos prácticos con ejercicios y herramientas de bienestar emocional, reflexión y crecimiento personal para integrar en tu día a día.</p></section><h3>DESCUBRE NUESTROS RECURSOS</h3><div class=\"resource\"><strong>Volver a Mí:</strong> un recorrido para reconectar contigo, observar tus pensamientos y cultivar la presencia.</div><div class=\"resource\"><strong>50 afirmaciones para sanar tu vida:</strong> palabras y propuestas para trabajar tu diálogo interior con más amabilidad.</div><p class=\"last\">Explora los e-books en nuestra web<br><a class=\"link\" href=\"https://vidamodoohm.es\">vidamodoohm.es</a></p><div class=\"footer\"><span>VIDA MODO OHM</span><span>06 / 06</span></div></article>\n</body></html>", { status: 200, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
    }

    if (url.pathname === "/api/interesadas") {
      return handleLead(request, env, url, ctx);
    }

    if (url.pathname === "/interesadas" || url.pathname === "/interesadas/") {
      if (!isAuthorized(request, env)) return unauthorized();
      if (!env.INTERESADAS) return configurationError("Falta conectar el registro privado.");
      const primaryLeads = await readLeads(env.INTERESADAS);
      const backupLeads = env.INTERESADAS_BACKUP ? await readLeads(env.INTERESADAS_BACKUP) : [];
      const leads = mergeLeads(primaryLeads, backupLeads);
      const welcomeStatus = await env.INTERESADAS.get("welcome:last", "json");
      return new Response(renderDashboard(leads, { primaryCount: primaryLeads.length, backupCount: backupLeads.length, backupConfigured: Boolean(env.INTERESADAS_BACKUP), welcomeStatus, resendConfigured: Boolean(env.RESEND_API_KEY || env.RESEN_API_KEY) }), { headers: PRIVATE_HEADERS });
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

  const resendKey = env.RESEND_API_KEY || env.RESEN_API_KEY;
  if (resendKey && !welcomeSent) {
    ctx.waitUntil(sendWelcomeEmail(resendKey, email, name).then(async (result) => {
      const at = new Date().toISOString();
      await env.INTERESADAS.put("welcome:last", JSON.stringify({ at, ...result }));
      if (result.accepted) await env.INTERESADAS.put(welcomeKey, at);
    }));
  } else if (!resendKey && !welcomeSent) {
    console.error("RESEND_API_KEY no está configurada; registro guardado sin correo de bienvenida");
    await env.INTERESADAS.put("welcome:last", JSON.stringify({
      at: new Date().toISOString(), accepted: false, status: 0,
      detail: "Falta configurar RESEND_API_KEY en Cloudflare Pages",
    }));
  }

  return json({ ok: true, backupSaved, welcomeQueued: Boolean(resendKey && !welcomeSent) }, 201);
}

async function sendWelcomeEmail(apiKey, recipient, name) {
  // Each retry must be a new delivery attempt. The successful-send marker in KV
  // prevents later registrations from receiving duplicate welcome emails.
  const idempotencyKey = `vmo-welcome-v2/${crypto.randomUUID()}`;
  const text = `Hola, ${name}:

Gracias por formar parte de Vida Modo Ohm, un espacio creado para parar, respirar y volver a ti.

Aquí encontrarás herramientas, recursos y pequeños momentos pensados para acompañarte en tu bienestar interior.

Como regalo de bienvenida, hemos preparado «Mi primer encuentro contigo», un mini e-book con el método RAIN para hacer una pausa y escucharte.

🎁 ABRIR MI REGALO
https://vidamodoohm.es/regalo/

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
<p>Como regalo de bienvenida, hemos preparado <strong>«Mi primer encuentro contigo»</strong>, un mini e-book con el método RAIN para hacer una pausa y escucharte.</p>
<p style="margin-top:26px;margin-bottom:26px;text-align:center"><a href="https://vidamodoohm.es/regalo/" style="display:inline-block;padding:14px 22px;border-radius:8px;background:#7f9d87;color:#ffffff;text-decoration:none;font-weight:700">🎁 ABRIR MI REGALO</a></p>
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
      return { accepted: false, status: response.status, detail: "Resend rechazó la solicitud" };
    }
    return { accepted: true, status: response.status, detail: "Resend aceptó el envío" };
  } catch (error) {
    console.error("No se pudo enviar el correo de bienvenida", error);
    return { accepted: false, status: 0, detail: "No se pudo conectar con Resend" };
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
      <div class="storage"><strong>Correo de bienvenida:</strong> ${storage.resendConfigured ? "clave configurada" : "falta la clave"} · ${storage.welcomeStatus ? `${storage.welcomeStatus.accepted ? "Resend aceptó el último envío" : "último intento fallido"} (HTTP ${Number(storage.welcomeStatus.status) || 0}, ${escapeHtml(formatDate(storage.welcomeStatus.at))})` : "sin intentos registrados desde esta actualización"}</div>
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
