'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "ac321e37cf7c8366a33f32dbc8027505",
"index.html": "a07e256713beca59a9a8e3d13a3660dd",
"/": "a07e256713beca59a9a8e3d13a3660dd",
"main.dart.js": "9c4aff00c7151baceaaec99bc0f3ff64",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"favicon.png": "3d8233deff8e0ba23a7b63d4b0a7b823",
"icons/Icon-192.png": "8e08c1bc646e22740d47eda4dac1cc2a",
"icons/Icon-maskable-192.png": "8e08c1bc646e22740d47eda4dac1cc2a",
"icons/Icon-maskable-512.png": "d6cfa8bd005b2e36cd9e170820343d80",
"icons/Icon-512.png": "d6cfa8bd005b2e36cd9e170820343d80",
"manifest.json": "0a22e0770d1277cd5d0ddc4775dcbc5e",
"assets/AssetManifest.json": "7345e43e93538efca89fc17c40f8ced5",
"assets/NOTICES": "44006e3aabcdd14b9eedf30d44cc0273",
"assets/FontManifest.json": "240e364e3e4a429749a384e6acdab964",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/iconly/fonts/IconlyBold.ttf": "128714c5bf5b14842f735ecf709ca0d1",
"assets/packages/iconly/fonts/IconlyLight.ttf": "5f376412227e6f8450fe79aec1c2a800",
"assets/packages/iconly/fonts/IconlyBroken.ttf": "6fbd555150d4f77e91c345e125c4ecb6",
"assets/packages/remixicon/fonts/Remix.ttf": "469037fcfd6abf02c1369102b84981ef",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/update.png": "915f5b406a87f2ff91e048189981d996",
"assets/assets/images/bg-splash.png": "a5b0fd0bf57b91374991c9471becf9c0",
"assets/assets/images/shopee.png": "68740934624756ca8a8c3874722b86a0",
"assets/assets/images/bg-icon.png": "69656805728a798902544168cc83d154",
"assets/assets/images/x.png": "b7aff84e8261d2bb3777fec848e0d345",
"assets/assets/images/illus-no-auth.png": "d57a06bf7e17e04762874dce3172283a",
"assets/assets/images/logout.png": "c78370eb009f17adaa6f7a80a8547b3a",
"assets/assets/images/bg-term.png": "73f34691ad84bfd2838cd7bdbabe95d2",
"assets/assets/images/fav1.png": "80135ca42f36d7862b5450f8cbcb98d8",
"assets/assets/images/ig.png": "7ca54bb0cd85121bcfdcb719f144f9ab",
"assets/assets/images/tiktok.png": "6a19e4cfaf9a1e3adb4f497fd3ba4240",
"assets/assets/images/error.png": "50857462fe48cd16bb962f95102a6f63",
"assets/assets/images/logo.png": "c4fdfea9416f3d2a69b96e66c27373db",
"assets/assets/images/globe.png": "515bf753930b329577ec690b8b0f4bc0",
"assets/assets/images/linkedin.png": "222dddf04b738cc24d228abe84e909b4",
"assets/assets/images/mico.png": "c1ad583a312ff2daa9ec0184439d8b31",
"assets/assets/images/tokped.png": "1de71cd8762629bf0b823eee1c81d8b4",
"assets/assets/images/illus-no-data.png": "1a0272285b8bf1416a7b342ba85e8878",
"assets/assets/images/wa.png": "1912021e79a7cdeba51a126d213d3fa8",
"assets/assets/images/icon-splash.png": "734fc9263bdb1f858d8effb5316731ac",
"assets/assets/images/fav.png": "9da41d3199a8ef714cd0aa8e200ae15f",
"assets/assets/images/fav-android.png": "b3e00a50d9e7f133267700c3387e30ea",
"assets/assets/icons/call.zip": "3bbea67d57140c975c8d04c228b340d0",
"assets/assets/lottie/confetti.json": "2bb59d88b2388a6a6b964faec2c2e9b8",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
