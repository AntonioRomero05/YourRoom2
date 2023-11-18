// Esta sección cachea todos los archivos de la app shell.

const cacheName = 'app-shell';
const resourcesToCache = [
  './pages/Templates/Navbar',
  './pages/Templates/Footer',
  './pages/Templates/Navegacion',
  './pages/Templates/Breadcrumb'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(resourcesToCache);
    })
  );
});

// Esta sección intercepta todas las solicitudes de navegación y las cumple
// con el archivo index.html de la app shell, si está disponible en la caché.

self.addEventListener('fetch', (event) => {
  // Si la solicitud no es una solicitud de navegación, la ignoramos.
  if (event.request.mode !== 'navigate') {
    return;
  }

  // Si la solicitud tiene una ruta que comienza con /_, la ignoramos.
  if (event.request.url.pathname.startsWith('/_')) {
    return;
  }

  // Si la solicitud tiene una extensión de archivo, la ignoramos.
  if (event.request.url.pathname.match(/\.[^/]+$/)) {
    return;
  }

  // Si la app shell está disponible en la caché, la cumplimos.
  event.respondWith(
    caches.match(cacheName).then((cache) => {
      if (cache) {
        return cache;
      }

      // Si la app shell no está disponible en la caché, la descargamos
      // de la red.
      return fetch(event.request);
    })
  );
});