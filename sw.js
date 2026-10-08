// Service worker: reassembles index.wasm from parts (GitHub API file-size limits).
const WASM_PARTS = [
	'wasm.part.aa',
	'wasm.part.ab',
	'wasm.part.ac',
	'wasm.part.ad',
];

self.addEventListener('install', (event) => {
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
	const url = new URL(event.request.url);
	if (url.pathname.endsWith('/index.wasm')) {
		event.respondWith((async () => {
			const buffers = await Promise.all(
				WASM_PARTS.map((p) =>
					fetch(new URL(p, url).toString()).then((r) => {
						if (!r.ok) throw new Error('part fetch failed: ' + p);
						return r.arrayBuffer();
					})
				)
			);
			const total = buffers.reduce((a, b) => a + b.byteLength, 0);
			const out = new Uint8Array(total);
			let off = 0;
			for (const b of buffers) {
				out.set(new Uint8Array(b), off);
				off += b.byteLength;
			}
			return new Response(out, {
				headers: { 'Content-Type': 'application/wasm' },
			});
		})());
	}
});
