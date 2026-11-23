const CACHE = "meu-financeiro-v1";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARQUIVOS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(chaves =>
      Promise.all(
        chaves
          .filter(chave => chave.startsWith("meu-financeiro-") && chave !== CACHE)
          .map(chave => caches.delete(chave))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(arquivo => {
      return arquivo || fetch(event.request);
    })
  );
});
