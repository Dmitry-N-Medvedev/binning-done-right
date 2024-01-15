const PUBLIC_WS_PROTO = "wss";
const PUBLIC_WS_HOST = "wss-enercon.denebkaitos.tech";
const PUBLIC_WS_PORT = "443";
const PUBLIC_WEB_PROTO = "https";
const PUBLIC_WEB_HOST = "enercon.denebkaitos.tech";
const PUBLIC_WEB_PORT = '"443"%';
const PUBLIC_WEB_DEBUG_PORT = "5173";
console.log({ PUBLIC_WEB_HOST });
const quotableStatements = Object.freeze(["none", "self", "unsafe-inline"]);
const quote = (statement) => {
  return quotableStatements.includes(statement) ? `'${statement}'` : statement;
};
const cspDirectives = {
  "default-src": ["none"],
  "img-src": ["self"],
  "font-src": ["self"],
  "manifest-src": ["self"],
  "style-src": ["self", "unsafe-inline"],
  "script-src": ["self", "unsafe-inline"],
  "connect-src": [
    "self",
    // svelte front-end
    `${PUBLIC_WEB_PROTO}://${PUBLIC_WEB_HOST}:${PUBLIC_WEB_PORT}`,
    // svelte dev server's port
    `${PUBLIC_WS_PROTO}://${PUBLIC_WEB_HOST}:${PUBLIC_WEB_DEBUG_PORT}`,
    // API port
    `${PUBLIC_WS_PROTO}://${PUBLIC_WS_HOST}:${PUBLIC_WS_PORT}`
  ],
  "report-to": [`${PUBLIC_WEB_PROTO}://${PUBLIC_WS_HOST}:${PUBLIC_WS_PORT}/csp-violation-report`]
};
const DIRECTIVES = Object.entries(cspDirectives).map(([key, values]) => `${key} ${values.map((value) => `${quote(value)}`).join(" ")}`).join(";");
async function handle({ event, resolve }) {
  const response = await resolve(event);
  response.headers.set("Content-Security-Policy-Report-Only", DIRECTIVES);
  return response;
}

export { handle };
//# sourceMappingURL=hooks.server-j4vP0_-v.js.map
