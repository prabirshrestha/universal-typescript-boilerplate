workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.routing.registerRoute(
  '/',
  new workbox.strategies.NetworkFirst()
)
