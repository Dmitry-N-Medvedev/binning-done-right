const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","global.css","manifest.webmanifest","themes/corp/theme.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css",".webmanifest":"application/manifest+json"},
	_: {
		client: {"start":"_app/immutable/entry/start.lfAMGZ4P.js","app":"_app/immutable/entry/app.eYndOuqg.js","imports":["_app/immutable/entry/start.lfAMGZ4P.js","_app/immutable/chunks/entry.8ycqkeK7.js","_app/immutable/chunks/runtime.Dc78sQt3.js","_app/immutable/entry/app.eYndOuqg.js","_app/immutable/chunks/runtime.Dc78sQt3.js","_app/immutable/chunks/disclose-version.5akP6bE9.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-O-Nairqr.js')),
			__memo(() => import('./chunks/1--oPWeZAc.js')),
			__memo(() => import('./chunks/2-aBbD3U-L.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
