// service-worker.js
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("danny-hub-cache").then(cache => {
            return cache.addAll([
                "/",
                "/index.html",
                "/css_folder/style.css",
                "/javascript/script.js",
                ...[
                    "songs/[iSongs.info] 03 - Chuttamalle.mp3",
                    "songs/[iSongs.info] 02 - Fear Song.mp3",
                    "songs/[iSongs.info] 06 - Ayudha Pooja.mp3",
                    "songs/[iSongs.info] 07 - Devara Thandavam.mp3",
                    "songs/[iSongs.info] 04 - Peelings.mp3",
                    "songs/[iSongs.info] 07 - Konda Devara.mp3",
                    "songs/[iSongs.info] 02 - Bujji Thalli.mp3",
                    "songs/[iSongs.info] 01 - Pushpa Pushpaa (1).mp3",
                    "songs/[iSongs.info] 02 - Raa Macha Macha.mp3",
                    "songs/[iSongs.info] 01 - Jaragandi.mp3",
                    "songs/[iSongs.info] 01 - Mirchi.mp3",
                    "songs/[iSongs.info] 03 - Kissik.mp3",
                    "songs/[iSongs.info] 03 - Neeve.mp3",
                    "songs/[iSongs.info] 04 - Hilesso Hilessa.mp3",
                    "songs/[iSongs.info] 04 - Daavudi.mp3",
                    "songs/[iSongs.info] 04 - NaaNaa Hyraanaa.mp3",
                    "songs/[iSongs.info] 06 - Dammunte Pattukora.mp3",
                    "songs/[iSongs.info] 05 - Red Sea.mp3",
                    "songs/[iSongs.info] 09 - Master the Blaster.mp3",
                    "songs/[iSongs.info] 01 - Ammayi.mp3",
                    "songs/[iSongs.info] 01 - Halamithi Habibo (Telugu).mp3",
                    "songs/[iSongs.info] 01 - Massu Maranam.mp3",
                    "songs/[iSongs.info] 01 - Master Coming.mp3",
                    "songs/[iSongs.info] 01 - Mr. Perfect.mp3",
                    "songs/[iSongs.info] 01 - Nee Kannu Neeli Samudram.mp3",
                    "songs/[iSongs.info] 01 - Panja.mp3",
                    "songs/[iSongs.info] 01 - Salaam Rocky Bhai (1).mp3",
                    "songs/[iSongs.info] 01 - Toofan.mp3",
                    "songs/[iSongs.info] 01 - Ee Raathale.mp3",
                    "songs/[iSongs.info] 02 - My Heart Is Beating.mp3",
                    "songs/[iSongs.info] 01 - Manasilaayo (1).mp3",
                    "songs/[iSongs.info] 02 - Uppenantha.mp3",
                    "songs/[iSongs.info] 02 - Yadagara Yadagara.mp3",
                    "songs/[iSongs.info] 03 - Baby He Loves You.mp3",
                    "songs/[iSongs.info] 03 - Beast Mode.mp3",
                    "songs/[iSongs.info] 03 - Chitti Story.mp3",
                    "songs/[iSongs.info] 03 - Don u Don u Don u.mp3",
                    "songs/[iSongs.info] 03 - Kaavaali.mp3",
                    "songs/[iSongs.info] 02 - Ye Chota Nuvvunna.mp3",
                    "songs/[iSongs.info] 03 - Sulthana.mp3",
                    "songs/[iSongs.info] 03 - Idhedho Bagundhe.mp3",
                    "songs/[iSongs.info] 04 - ButtaBomma.mp3",
                    "songs/[iSongs.info] 04 - Dosti.mp3",
                    "songs/[iSongs.info] 04 - Hukum.mp3",
                    "songs/[iSongs.info] 04 - Mehabooba.mp3",
                    "songs/[iSongs.info] 04 - Ringa Ringa.mp3",
                    "songs/[iSongs.info] 05 - Dheera Dheera.mp3",
                    "songs/[iSongs.info] 05 - Evarevaro.mp3",
                    "songs/[iSongs.info] 04 - Baby Won't You Tell Me.mp3",
                    "songs/[iSongs.info] 06 - My Love Is Gone.mp3",
                    "songs/[iSongs.info] 06 - Ney Ready.mp3",
                ],
                ...[
                    "images/Chuttamalle-From-Devara-Part-1-Telugu-2024-20240805181008-500x500.jpg",
                    "images/Fear-Song-From-Devara-Part-1-Telugu-Telugu-2024-20240519131003-500x500.jpg",
                    "images/Devara-Part-1-Telugu-Telugu-2024-20240926171010-500x500.jpg",
                    "images/kissik.jpg",
                    "images/Game-Changer-Telugu-Telugu-2025-20250204083253-500x500 (1).jpg",
                    "images/Thandel bujjithalli-Telugu-2024-20250225125810-500x500.jpg",
                    "images/pushpapushapa.jpg",
                    "images/Raa-Macha-Macha-From-Game-Changer-Tamil-Tamil-2024-20240930073933-500x500.jpg",
                    "images/Jaragandi-From-Game-Changer-Telugu-Telugu-2024-20250130073120-500x500.jpg",
                    "images/mirchi.jpg",
                    "images/kissikk.jpg",
                    "images/darling.jpg",
                    "images/Thandel hillesa-Telugu-2024-20250124164708-500x500.jpg",
                    "images/davudi.jpg",
                    "images/NaaNaa-Hyraanaa-From-Game-Changer-Telugu-Telugu-2024-20241128104109-500x500.jpg",
                    "images/Dammunte-Pattukora-From-Pushpa-2-The-Rule-Telugu-2024-20241224141003-500x500.jpg",
                    "images/redsea.jpg",
                    "images/Master-the-Blaster-From-Master--English-2021-20210115102601-500x500.jpg",
                    "images/Ammayi-From-ANIMAL-Telugu-Telugu-2023-20231011081003-500x500.jpg",
                    "images/Beast-Telugu-2022-20220504193318-500x500.jpg",
                    "images/masumaranam.jpg",
                    "images/Master-Tamil-2020-20200316084627-500x500.jpg",
                    "images/Aarya-2-Telugu-2009-20190822135933-500x500.jpg",
                    "images/nee kannu nellli.jpg",
                    "images/Panjaa-2011-500x500.jpg",
                    "images/KGF toofan-Chapter-2-Hindi-2022-20220522091045-500x500.jpg",
                    "images/eeratale.jpg",
                    "images/myheart.jpg",
                    "images/manasilayo.jpg",
                    "images/donudonu.jpg",
                    "images/Jailer-Tamil-2023-20230728081443-500x500.jpg",
                    "images/baby wont.jpg",
                    "images/sultan.jpg",
                    "images/buttabomma.jpg",
                    "images/dosti.jpg",
                    "images/Jailer hukum-Telugu-2023-20230810132954-500x500.jpg",
                    "images/mehabooba.jpg",
                    "images/dheera.jpg",
                    "images/evarevaro.jpg",
                    "images/naready.jpg",
                    "images/default-cover.jpg"
                ]
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                if (event.request.method === "GET") {
                    caches.open("danny-hub-cache").then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                }
                return networkResponse;
            });
        }).catch(() => {
            return caches.match("/index.html");
        })
    );
});

self.addEventListener("message", (event) => {
    if (event.data.type === "UPDATE_CACHE") {
        caches.open("danny-hub-cache").then(cache => {
            cache.addAll(event.data.assets);
        });
    }
});