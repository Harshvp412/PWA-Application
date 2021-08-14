self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open("static").then(cache =>{
            console.log("Install")
            return cache.addAll(["./","/manifest.json", "/images/logo192.png", "/css/mycss.css",  "/css/error.css",  "/css/recorder.css",  "/js/recorder.js",  "/js/app.js"]);
        })
    );
});

self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(respond =>{
            return respond || fetch(e.request);
        })
    )
})