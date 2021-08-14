self.addEventListener("install", e=>{
    e.waitUntil(
        caches.open("static").then(cache =>{
            console.log("Installed")
            return cache.addAll(["./", "/images/logo192.png"]);
           
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