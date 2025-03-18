// DOM Elements
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const seekBar = document.getElementById("seekbar");
const volumeControl = document.getElementById("volume");
const volumeIcon = document.getElementById("volume-icon");
const songTitle = document.getElementById("song-title");
const albumCover = document.getElementById("album-cover");
const miniCover = document.getElementById("mini-cover");
const sidebar = document.getElementById("sidebar");
const sidebarLinks = document.querySelectorAll('#sidebar a, .sidebar-btn, #voice-cmd-toggle, #category-filter, .sleep-timer-container');
const menuBtn = document.getElementById("menu-btn");
const closeSidebar = document.getElementById("close-sidebar");
const randomBtn = document.getElementById("random-btn");
const repeatBtn = document.getElementById("repeat-btn");
const likeBtn = document.getElementById("like-btn");
const libraryBtn = document.getElementById("library-btn");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");
const searchInput = document.getElementById("search-input");
const songList = document.getElementById("song-list");
const playlistBtn = document.getElementById("playlist-btn");
const playlistContainer = document.getElementById("playlist-container");
const categoryFilter = document.getElementById("category-filter");
const speedControl = document.getElementById("speed");
const sleepTimer = document.getElementById("sleep-timer");
const sleepTimerDisplay = document.getElementById("sleep-timer-display");
const sleepTimerRemaining = document.getElementById("sleep-timer-remaining");
const miniToggle = document.getElementById("mini-toggle");
const player = document.getElementById("player");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalClose = document.getElementById("modal-close");
const themeToggle = document.getElementById("theme-toggle");
const homeLink = document.getElementById("home-link");
const homePage = document.getElementById("home");
const backToPlayer = document.getElementById("back-to-player");
const shortcutBtn = document.getElementById("shortcut-btn");
const shortcutModal = document.getElementById("shortcut-modal");
const shortcutClose = document.getElementById("shortcut-close");
const equalizer = document.querySelector(".equalizer");
const toast = document.getElementById("now-playing-toast");
const toastSong = document.getElementById("toast-song");
const voiceBtn = document.getElementById("voice-btn");
const voiceCmdToggle = document.getElementById("voice-cmd-toggle");
const resetPositionBtn = document.getElementById("reset-position");

// Album Color Map
const albumColorMap = {
    "images/Chuttamalle-From-Devara-Part-1-Telugu-2024-20240805181008-500x500.jpg": ["#ff6f61", "#ff9b71"],
    "images/Fear-Song-From-Devara-Part-1-Telugu-Telugu-2024-20240519131003-500x500.jpg": ["#4a90e2", "#50e3c2"],
    "images/default-cover.jpg": ["#00c6ff", "#0072ff"],
    "images/Devara-Part-1-Telugu-Telugu-2024-20240926171010-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/kissik.jpg": ["#ff69b4", "#ff1493"],
    "images/Game-Changer-Telugu-Telugu-2025-20250204083253-500x500 (1).jpg": ["#00ff7f", "#00ced1"],
    "images/Thandel bujjithalli-Telugu-2024-20250225125810-500x500.jpg": ["#dda0dd", "#ee82ee"],
    "images/pushpapushapa.jpg": ["#ff6347", "#ff4500"],
    "images/Raa-Macha-Macha-From-Game-Changer-Tamil-Tamil-2024-20240930073933-500x500.jpg": ["#ff00ff", "#ff69b4"],
    "images/Jaragandi-From-Game-Changer-Telugu-Telugu-2024-20250130073120-500x500.jpg": ["#00ff00", "#32cd32"],
    "images/mirchi.jpg": ["#ff0000", "#ff4500"],
    "images/kissikk.jpg": ["#ff1493", "#ff69b4"],
    "images/darling.jpg": ["#ff69b4", "#ffb6c1"],
    "images/Thandel hillesa-Telugu-2024-20250124164708-500x500.jpg": ["#dda0dd", "#ee82ee"],
    "images/davudi.jpg": ["#ff4500", "#ff8c00"],
    "images/NaaNaa-Hyraanaa-From-Game-Changer-Telugu-Telugu-2024-20241128104109-500x500.jpg": ["#00ced1", "#00ff7f"],
    "images/Dammunte-Pattukora-From-Pushpa-2-The-Rule-Telugu-2024-20241224141003-500x500.jpg": ["#ff6347", "#ff4500"],
    "images/redsea.jpg": ["#ff0000", "#dc143c"],
    "images/Master-the-Blaster-From-Master--English-2021-20210115102601-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/Ammayi-From-ANIMAL-Telugu-Telugu-2023-20231011081003-500x500.jpg": ["#ff69b4", "#ff1493"],
    "images/Beast-Telugu-2022-20220504193318-500x500.jpg": ["#ff0000", "#ff4500"],
    "images/masumaranam.jpg": ["#ff4500", "#ff8c00"],
    "images/Master-Tamil-2020-20200316084627-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/Aarya-2-Telugu-2009-20190822135933-500x500.jpg": ["#ff69b4", "#ffb6c1"],
    "images/nee kannu nellli.jpg": ["#dda0dd", "#ee82ee"],
    "images/Panjaa-2011-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/KGF toofan-Chapter-2-Hindi-2022-20220522091045-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/eeratale.jpg": ["#ff69b4", "#ffb6c1"],
    "images/myheart.jpg": ["#ff69b4", "#ffb6c1"],
    "images/manasilayo.jpg": ["#ff69b4", "#ffb6c1"],
    "images/donudonu.jpg": ["#ff4500", "#ff8c00"],
    "images/Jailer-Tamil-2023-20230728081443-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/baby wont.jpg": ["#ff69b4", "#ffb6c1"],
    "images/sultan.jpg": ["#ff4500", "#ff8c00"],
    "images/buttabomma.jpg": ["#ff69b4", "#ffb6c1"],
    "images/dosti.jpg": ["#ff69b4", "#ffb6c1"],
    "images/Jailer hukum-Telugu-2023-20230810132954-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/mehabooba.jpg": ["#ff69b4", "#ffb6c1"],
    "images/dheera.jpg": ["#ff4500", "#ff8c00"],
    "images/evarevaro.jpg": ["#ff69b4", "#ffb6c1"],
    "images/naready.jpg": ["#ff4500", "#ff8c00"],
    "images/Srivalli-From-Pushpa-The-Rise-Telugu-2021-20211013161003-500x500.jpg": ["#ff69b4", "#ffb6c1"],
    "images/Saami-Saami-From-Pushpa-The-Rise-Telugu-2021-20211028161003-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/Naatu-Naatu-From-RRR-Telugu-2021-20211110161003-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/The-Warrior-Telugu-2022-20220615161003-500x500.jpg": ["#ff4500", "#ff8c00"],
    "images/Ala-Vaikunthapurramuloo-Telugu-2019-20191026161003-500x500.jpg": ["#ff4500", "#ff8c00"]
};

// State Variables
let originalSongs = [
    { title: "Chuttamalle", file: "songs/[iSongs.info] 03 - Chuttamalle.mp3", cover: "images/Chuttamalle-From-Devara-Part-1-Telugu-2024-20240805181008-500x500.jpg", liked: false, category: "Pop" },
    { title: "Fear song", file: "songs/[iSongs.info] 02 - Fear Song.mp3", cover: "images/Fear-Song-From-Devara-Part-1-Telugu-Telugu-2024-20240519131003-500x500.jpg", liked: false, category: "Rock" },
    { title: "Ayudha Pooja", file: "songs/[iSongs.info] 06 - Ayudha Pooja.mp3", cover: "images/Devara-Part-1-Telugu-Telugu-2024-20240926171010-500x500.jpg", liked: false, category: "Dance" },
    { title: "Devara Thandavam", file: "songs/[iSongs.info] 07 - Devara Thandavam.mp3", cover: "images/Devara-Part-1-Telugu-Telugu-2024-20240926171010-500x500.jpg", liked: false, category: "Dance" },
    { title: "Peelings", file: "songs/[iSongs.info] 04 - Peelings.mp3", cover: "images/kissik.jpg", liked: false, category: "Pop" },
    { title: "Konda Devara", file: "songs/[iSongs.info] 07 - Konda Devara.mp3", cover: "images/Game-Changer-Telugu-Telugu-2025-20250204083253-500x500 (1).jpg", liked: false, category: "Rock" },
    { title: "Bujji Thalli", file: "songs/[iSongs.info] 02 - Bujji Thalli.mp3", cover: "images/Thandel bujjithalli-Telugu-2024-20250225125810-500x500.jpg", liked: false, category: "Pop" },
    { title: "Pushpa Pushpaa", file: "songs/[iSongs.info] 01 - Pushpa Pushpaa (1).mp3", cover: "images/pushpapushapa.jpg", liked: false, category: "Dance" },
    { title: "Raa Macha Macha", file: "songs/[iSongs.info] 02 - Raa Macha Macha.mp3", cover: "images/Raa-Macha-Macha-From-Game-Changer-Tamil-Tamil-2024-20240930073933-500x500.jpg", liked: false, category: "Rock" },
    { title: "Jaragandi", file: "songs/[iSongs.info] 01 - Jaragandi.mp3", cover: "images/Jaragandi-From-Game-Changer-Telugu-Telugu-2024-20250130073120-500x500.jpg", liked: false, category: "Dance" },
    { title: "Mirchi", file: "songs/[iSongs.info] 01 - Mirchi.mp3", cover: "images/mirchi.jpg", liked: false, category: "Pop" },
    { title: "Kissik", file: "songs/[iSongs.info] 03 - Kissik.mp3", cover: "images/kissikk.jpg", liked: false, category: "Pop" },
    { title: "Neeve", file: "songs/[iSongs.info] 03 - Neeve.mp3", cover: "images/darling.jpg", liked: false, category: "Pop" },
    { title: "Hilesso Hilessa", file: "songs/[iSongs.info] 04 - Hilesso Hilessa.mp3", cover: "images/Thandel hillesa-Telugu-2024-20250124164708-500x500.jpg", liked: false, category: "Pop" },
    { title: "Daavudi", file: "songs/[iSongs.info] 04 - Daavudi.mp3", cover: "images/davudi.jpg", liked: false, category: "Dance" },
    { title: "NaaNaa Hyraanaa", file: "songs/[iSongs.info] 04 - NaaNaa Hyraanaa.mp3", cover: "images/NaaNaa-Hyraanaa-From-Game-Changer-Telugu-Telugu-2024-20241128104109-500x500.jpg", liked: false, category: "Pop" },
    { title: "Dammunte Pattukora", file: "songs/[iSongs.info] 06 - Dammunte Pattukora.mp3", cover: "images/Dammunte-Pattukora-From-Pushpa-2-The-Rule-Telugu-2024-20241224141003-500x500.jpg", liked: false, category: "Dance" },
    { title: "Red Sea", file: "songs/[iSongs.info] 05 - Red Sea.mp3", cover: "images/redsea.jpg", liked: false, category: "Rock" },
    { title: "Master the Blaster", file: "songs/[iSongs.info] 09 - Master the Blaster.mp3", cover: "images/Master-the-Blaster-From-Master--English-2021-20210115102601-500x500.jpg", liked: false, category: "Rock" },
    { title: "Ammayi", file: "songs/[iSongs.info] 01 - Ammayi.mp3", cover: "images/Ammayi-From-ANIMAL-Telugu-Telugu-2023-20231011081003-500x500.jpg", liked: false, category: "Pop" },
    { title: "Halamithi Habibo", file: "songs/[iSongs.info] 01 - Halamithi Habibo (Telugu).mp3", cover: "images/Beast-Telugu-2022-20220504193318-500x500.jpg", liked: false, category: "Dance" },
    { title: "Massu Maranam", file: "songs/[iSongs.info] 01 - Massu Maranam.mp3", cover: "images/masumaranam.jpg", liked: false, category: "Rock" },
    { title: "Master Coming", file: "songs/[iSongs.info] 01 - Master Coming.mp3", cover: "images/Master-Tamil-2020-20200316084627-500x500.jpg", liked: false, category: "Rock" },
    { title: "Mr. Perfect", file: "songs/[iSongs.info] 01 - Mr. Perfect.mp3", cover: "images/Aarya-2-Telugu-2009-20190822135933-500x500.jpg", liked: false, category: "Pop" },
    { title: "Nee Kannu Neeli Samudram", file: "songs/[iSongs.info] 01 - Nee Kannu Neeli Samudram.mp3", cover: "images/nee kannu nellli.jpg", liked: false, category: "Pop" },
    { title: "Panja", file: "songs/[iSongs.info] 01 - Panja.mp3", cover: "images/Panjaa-2011-500x500.jpg", liked: false, category: "Rock" },
    { title: "Salaam Rocky Bhai", file: "songs/[iSongs.info] 01 - Salaam Rocky Bhai (1).mp3", cover: "images/KGF toofan-Chapter-2-Hindi-2022-20220522091045-500x500.jpg", liked: false, category: "Rock" },
    { title: "Toofan", file: "songs/[iSongs.info] 01 - Toofan.mp3", cover: "images/KGF toofan-Chapter-2-Hindi-2022-20220522091045-500x500.jpg", liked: false, category: "Rock" },
    { title: "Ee Raathale", file: "songs/[iSongs.info] 01 - Ee Raathale.mp3", cover: "images/eeratale.jpg", liked: false, category: "Pop" },
    { title: "My Heart Is Beating", file: "songs/[iSongs.info] 02 - My Heart Is Beating.mp3", cover: "images/myheart.jpg", liked: false, category: "Pop" },
    { title: "Manasilaayo", file: "songs/[iSongs.info] 01 - Manasilaayo (1).mp3", cover: "images/manasilayo.jpg", liked: false, category: "Pop" },
    { title: "Uppenantha", file: "songs/[iSongs.info] 02 - Uppenantha.mp3", cover: "images/Aarya-2-Telugu-2009-20190822135933-500x500.jpg", liked: false, category: "Pop" },
    { title: "Yadagara Yadagara", file: "songs/[iSongs.info] 02 - Yadagara Yadagara.mp3", cover: "images/KGF toofan-Chapter-2-Hindi-2022-20220522091045-500x500.jpg", liked: false, category: "Rock" },
    { title: "Baby He Loves You", file: "songs/[iSongs.info] 03 - Baby He Loves You.mp3", cover: "images/Aarya-2-Telugu-2009-20190822135933-500x500.jpg", liked: false, category: "Pop" },
    { title: "Beast Mode", file: "songs/[iSongs.info] 03 - Beast Mode.mp3", cover: "images/Beast-Telugu-2022-20220504193318-500x500.jpg", liked: false, category: "Rock" },
    { title: "Chitti Story", file: "songs/[iSongs.info] 03 - Chitti Story.mp3", cover: "images/Master-Telugu--Telugu-2021-20210324170733-500x500.jpg", liked: false, category: "Pop" },
    { title: "Don u Don u", file: "songs/[iSongs.info] 03 - Don u Don u Don u.mp3", cover: "images/donudonu.jpg", liked: false, category: "Dance" },
    { title: "Kaavaali", file: "songs/[iSongs.info] 03 - Kaavaali.mp3", cover: "images/Jailer-Tamil-2023-20230728081443-500x500.jpg", liked: false, category: "Rock" },
    { title: "Ye Chota Nuvvunna", file: "songs/[iSongs.info] 02 - Ye Chota Nuvvunna.mp3", cover: "images/baby wont.jpg", liked: false, category: "Pop" },
    { title: "Sulthana", file: "songs/[iSongs.info] 03 - Sulthana.mp3", cover: "images/sultan.jpg", liked: false, category: "Rock" },
    { title: "Idhedho Bagundhe", file: "songs/[iSongs.info] 03 - Idhedho Bagundhe.mp3", cover: "images/mirchi.jpg", liked: false, category: "Pop" },
    { title: "ButtaBomma", file: "songs/[iSongs.info] 04 - ButtaBomma.mp3", cover: "images/buttabomma.jpg", liked: false, category: "Pop" },
    { title: "Dosti", file: "songs/[iSongs.info] 04 - Dosti.mp3", cover: "images/dosti.jpg", liked: false, category: "Pop" },
    { title: "Hukum", file: "songs/[iSongs.info] 04 - Hukum.mp3", cover: "images/Jailer hukum-Telugu-2023-20230810132954-500x500.jpg", liked: false, category: "Rock" },
    { title: "Mehabooba", file: "songs/[iSongs.info] 04 - Mehabooba.mp3", cover: "images/mehabooba.jpg", liked: false, category: "Pop" },
    { title: "Ringa Ringa", file: "songs/[iSongs.info] 04 - Ringa Ringa.mp3", cover: "images/Aarya-2-Telugu-2009-20190822135933-500x500.jpg", liked: false, category: "Dance" },
    { title: "Dheera Dheera", file: "songs/[iSongs.info] 05 - Dheera Dheera.mp3", cover: "images/dheera.jpg", liked: false, category: "Rock" },
    { title: "Evarevaro", file: "songs/[iSongs.info] 05 - Evarevaro.mp3", cover: "images/evarevaro.jpg", liked: false, category: "Pop" },
    { title: "Baby Won't You Tell Me", file: "songs/[iSongs.info] 04 - Baby Won't You Tell Me.mp3", cover: "images/baby wont.jpg", liked: false, category: "Pop" },
    { title: "My Love Is Gone", file: "songs/[iSongs.info] 06 - My Love Is Gone.mp3", cover: "images/Aarya-2-Telugu-2009-20190822135933-500x500.jpg", liked: false, category: "Pop" },
    { title: "Ney Ready", file: "songs/[iSongs.info] 06 - Ney Ready.mp3", cover: "images/naready.jpg", liked: false, category: "Rock" },
    { title: "Srivalli", file: "songs/[iSongs.info] 02 - Srivalli.mp3", cover: "images/Srivalli-From-Pushpa-The-Rise-Telugu-2021-20211013161003-500x500.jpg", liked: false, category: "Pop" },
    { title: "Saami Saami", file: "songs/[iSongs.info] 03 - Saami Saami.mp3", cover: "images/Saami-Saami-From-Pushpa-The-Rise-Telugu-2021-20211028161003-500x500.jpg", liked: false, category: "Dance" },
    { title: "Naatu Naatu", file: "songs/[iSongs.info] 01 - Naatu Naatu.mp3", cover: "images/Naatu-Naatu-From-RRR-Telugu-2021-20211110161003-500x500.jpg", liked: false, category: "Dance" },
    { title: "Bullet Song", file: "songs/[iSongs.info] 04 - Bullet Song.mp3", cover: "images/The-Warrior-Telugu-2022-20220615161003-500x500.jpg", liked: false, category: "Rock" },
    { title: "Ramuloo Ramulaa", file: "songs/[iSongs.info] 05 - Ramuloo Ramulaa.mp3", cover: "images/Ala-Vaikunthapurramuloo-Telugu-2019-20191026161003-500x500.jpg", liked: false, category: "Dance" }
];

// Service Worker Registration
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js", { scope: "/" })
            .then(registration => {
                console.log("Service Worker registered:", registration);
                navigator.serviceWorker.ready.then(reg => {
                    if (reg.active) {
                        const assetsToCache = [
                            ...originalSongs.map(song => song.file),
                            ...originalSongs.map(song => song.cover || "images/default-cover.jpg"),
                            "/", "/index.html", "/css_folder/style.css", "/javascript/script.js"
                        ];
                        reg.active.postMessage({
                            type: "UPDATE_CACHE",
                            assets: assetsToCache
                        });
                    }
                });
            })
            .catch(error => {
                console.error("Service Worker registration failed:", error);
                showToast("Service Worker failed to register");
            });
    });
}

let songs = [...originalSongs];
let queue = [];
let currentSong = 0;
let isRandomMode = false;
let repeatMode = 0; // 0 = off, 1 = repeat one, 2 = repeat all
let activeSidebarBtn = null;
let isVoiceFeedbackEnabled = false;
let isVoiceActive = false;
let isFirstLoad = true;
let isLoading = false;
let skipCount = 0;
const maxSkips = 10;
let toastTimeout = null;
let sleepTimerInterval = null;
let remainingSeconds = 0;
let isSleepTimerPaused = false;
let playbackSpeed = 1.0;
let isMiniPlayer = false;
let isDragging = false;
let currentX = 0, currentY = 0, initialX = 0, initialY = 0;
let hasBeenDragged = false;
const defaultMiniPosition = { bottom: "20px", right: "20px", left: "auto", top: "auto" };
let originalPosition = { ...defaultMiniPosition };
let wakeRecognition = null;

// Utility Functions
function showToast(message) {
    if (!toast || !toastSong) return;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastSong.textContent = message;
    toast.classList.add("show");
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
        toastTimeout = null;
    }, 3000);
}

function speak(text, force = false) {
    if (!window.speechSynthesis) return null;
    window.speechSynthesis.cancel();
    
    if (force || isVoiceFeedbackEnabled) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.volume = 1;
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.onend = () => showToast(text); // Provide visual feedback after speaking
        window.speechSynthesis.speak(utterance);
        return utterance;
    }
    return null;
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

function safePlay() {
    console.log("safePlay called for:", songs[currentSong]?.title || "unknown song");
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            updatePlayPauseUI(true);
            if ("mediaSession" in navigator) {
                navigator.mediaSession.playbackState = "playing";
            }
            console.log("Playback started successfully");
        }).catch(e => {
            console.error("Playback blocked:", e);
            showToast("Tap to resume playback");
            document.addEventListener("touchstart", function resume() {
                audio.play().then(() => {
                    updatePlayPauseUI(true);
                    if ("mediaSession" in navigator) {
                        navigator.mediaSession.playbackState = "playing";
                    }
                    console.log("Playback resumed after user interaction");
                }).catch(err => console.error("Resume failed:", err));
                document.removeEventListener("touchstart", resume);
            }, { once: true });
        });
    }
}

function startSleepTimer(minutes) {
    if (sleepTimerInterval) clearInterval(sleepTimerInterval);
    remainingSeconds = minutes * 60;
    sleepTimerDisplay.style.display = "flex";
    sleepTimerRemaining.textContent = formatTime(remainingSeconds);

    sleepTimerInterval = setInterval(() => {
        if (!isSleepTimerPaused && remainingSeconds > 0) {
            remainingSeconds--;
            sleepTimerRemaining.textContent = formatTime(remainingSeconds);
            if (remainingSeconds <= 0) {
                clearInterval(sleepTimerInterval);
                sleepTimerInterval = null;
                sleepTimerDisplay.style.display = "none";
                audio.pause();
                updatePlayPauseUI(false);
                sleepTimer.value = "0";
                showToast("Sleep Timer Ended");
                if (isVoiceFeedbackEnabled) speak("Sleep Timer Ended");
            }
        }
    }, 1000);
}

function loadLikedSongs() {
    try {
        const storedLikedSongs = localStorage.getItem("likedSongs");
        if (storedLikedSongs) {
            const likedTitles = JSON.parse(storedLikedSongs);
            originalSongs.forEach(song => song.liked = likedTitles.includes(song.title));
            songs = [...originalSongs];
        }
    } catch (e) {
        console.error("Error loading liked songs:", e);
        showToast("Error loading liked songs, resetting preferences");
        localStorage.removeItem("likedSongs"); // Reset on error to prevent corruption
    }
}

async function loadSong(index) {
    if (index < 0 || index >= songs.length || isLoading) return Promise.reject("Invalid index or loading");
    isLoading = true;
    try {
        const response = await fetch(songs[index].file, { method: "HEAD" });
        if (!response.ok) throw new Error("File not found");

        currentSong = index;
        audio.src = songs[index].file;
        songTitle.textContent = songs[index].title;

        const coverSrc = songs[index].cover || "images/default-cover.jpg";
        // Update and show only the appropriate cover based on player state
        if (!isMiniPlayer) {
            albumCover.src = coverSrc;
            albumCover.style.display = "block";
            miniCover.style.display = "none";
        } else {
            miniCover.src = coverSrc;
            miniCover.style.display = "inline-block";
            albumCover.style.display = "none";
        }
        albumCover.onerror = () => { albumCover.src = "images/default-cover.jpg"; };
        miniCover.onerror = () => { miniCover.src = "images/default-cover.jpg"; };

        // Media Session for Lock Screen
        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: songs[index].title,
                artist: "Danny Hub Artist",
                album: "Danny Hub Playlist",
                artwork: [{ src: coverSrc, sizes: "500x500", type: "image/jpeg" }]
            });
            navigator.mediaSession.setActionHandler("play", () => safePlay());
            navigator.mediaSession.setActionHandler("pause", () => {
                audio.pause();
                updatePlayPauseUI(false);
                navigator.mediaSession.playbackState = "paused";
            });
            navigator.mediaSession.setActionHandler("nexttrack", () => nextBtn.click());
            navigator.mediaSession.setActionHandler("previoustrack", () => prevBtn.click());
            navigator.mediaSession.setActionHandler("seekbackward", (details) => {
                audio.currentTime = Math.max(0, audio.currentTime - (details.seekOffset || 10));
            });
            navigator.mediaSession.setActionHandler("seekforward", (details) => {
                audio.currentTime = Math.min(audio.duration, audio.currentTime + (details.seekOffset || 10));
            });
            navigator.mediaSession.setActionHandler("seekto", (details) => {
                if (details.seekTime >= 0 && details.seekTime <= audio.duration) {
                    audio.currentTime = details.seekTime;
                }
            });
            navigator.mediaSession.playbackState = audio.paused ? "paused" : "playing";
        }

        seekBar.value = 0;
        document.documentElement.style.setProperty("--progress", "0%");
        likeBtn.textContent = songs[index].liked ? "♥" : "♡";
        likeBtn.classList.toggle("liked", songs[index].liked);
        songTitle.style.animation = "fadeIn 0.3s";
        currentTimeDisplay.textContent = "0:00";

        return new Promise((resolve, reject) => {
            audio.onloadedmetadata = () => {
                durationDisplay.textContent = formatTime(audio.duration);
                seekBar.max = audio.duration;
                audio.playbackRate = playbackSpeed;
                initializePlayer();
                updatePlaylistHighlight();
                const colors = albumColorMap[songs[index].cover] || ["#00c6ff", "#0072ff"];
                document.documentElement.style.setProperty("--bg-start", colors[0]);
                document.documentElement.style.setProperty("--bg-end", colors[1]);
                skipCount = 0;

                // Preload next song
                const nextIndex = repeatMode === 1 ? index : (index + 1) % songs.length;
                if (nextIndex !== index && nextIndex < songs.length) {
                    const nextAudio = new Audio(songs[nextIndex].file);
                    nextAudio.preload = "auto";
                    nextAudio.volume = 0;
                    nextAudio.onloadedmetadata = () => console.log("Preloaded metadata for:", songs[nextIndex].title);
                    nextAudio.onerror = () => console.error("Preload error for:", songs[nextIndex].title);
                    const nextImg = new Image();
                    nextImg.src = songs[nextIndex].cover || "images/default-cover.jpg";
                }

                resolve();
            };
            audio.onerror = () => {
                console.error("Audio metadata error for:", songs[index].title);
                reject(new Error("Audio metadata error"));
            };
        });
    } catch (error) {
        console.error(`Error loading song: ${songs[index]?.title || "unknown"}`, error);
        showToast(`Error loading "${songs[index]?.title || "unknown"}". Skipping...`);
        if (songs.length > 1 && skipCount < maxSkips) {
            skipCount++;
            const nextIndex = (index + 1) % songs.length;
            return loadSong(nextIndex);
        } else {
            showToast("All songs failed to load.");
            updatePlayPauseUI(false);
            return Promise.reject(error);
        }
    } finally {
        isLoading = false;
    }
}

function initializePlayer() {
    if (!playBtn || !pauseBtn || !equalizer || !albumCover) return;
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
    equalizer.style.display = "none";
    albumCover.classList.remove("playing");
    audio.volume = volumeControl?.value || 1;
    volumeIcon.textContent = audio.volume === 0 ? "🔇" : "🔊";
    document.documentElement.style.setProperty("--volume-progress", `${audio.volume * 100}%`);
}

function updatePlayPauseUI(isPlaying) {
    if (!playBtn || !pauseBtn || !equalizer || !albumCover) return;
    playBtn.style.display = isPlaying ? "none" : "inline";
    pauseBtn.style.display = isPlaying ? "inline" : "none";
    equalizer.style.display = isPlaying ? "flex" : "none";
    albumCover.classList.toggle("playing", isPlaying);
}

function populatePlaylist() {
    if (!songList) return;
    const fragment = document.createDocumentFragment();
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.textContent = song.title;
        li.dataset.index = index;
        li.draggable = true;

        li.addEventListener("click", () => {
            loadSong(index).then(() => {
                safePlay();
            }).catch(err => {
                console.error("Playlist click error:", err);
                showToast("Failed to load song");
            });
        });

        li.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            queue.push(songs[index]);
            showToast(`Added to queue: ${song.title}`);
            if (isVoiceFeedbackEnabled) speak(`Added to queue: ${song.title}`);
        });

        li.addEventListener("dragstart", (e) => e.dataTransfer.setData("text/plain", index));
        li.addEventListener("dragover", (e) => e.preventDefault());
        li.addEventListener("drop", (e) => {
            e.preventDefault();
            const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
            const toIndex = index;
            [songs[fromIndex], songs[toIndex]] = [songs[toIndex], songs[fromIndex]];
            populatePlaylist();
            updatePlaylistHighlight();
        });

        fragment.appendChild(li);
    });
    songList.innerHTML = "";
    songList.appendChild(fragment);
    updatePlaylistHighlight();
}

function updatePlaylistHighlight() {
    if (!songList) return;
    const items = songList.querySelectorAll("li");
    items.forEach(item => item.classList.toggle("active", parseInt(item.dataset.index) === currentSong));
}

function setActiveSidebarButton(button) {
    if (activeSidebarBtn) activeSidebarBtn.style.background = "rgb(0, 183, 255)";
    if (button) button.style.background = "#ff6f61";
    activeSidebarBtn = button;
}

// Voice Activation Functions
function startVoiceActivation() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showToast("Voice recognition not supported");
        return;
    }

    if (wakeRecognition) {
        wakeRecognition.stop();
        wakeRecognition = null;
    }

    wakeRecognition = new SpeechRecognition();
    wakeRecognition.continuous = true;
    wakeRecognition.interimResults = false;
    wakeRecognition.lang = "en-US";

    wakeRecognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        if (transcript.includes("danny") || transcript.includes("hey danny") || transcript.includes("danny wakeup") || transcript.includes("danny active") || transcript.includes("danny start")) {
            wakeRecognition.stop();
            listenForCommand();
        }
    };

    wakeRecognition.onerror = (e) => {
        console.error("Wake word recognition error:", e.error);
        if (e.error !== "aborted" && !isVoiceActive) {
            setTimeout(() => {
                if (!isVoiceActive && !wakeRecognition?.started) {
                    startVoiceActivation();
                }
            }, 1000);
        }
    };

    wakeRecognition.onend = () => {
        if (!isVoiceActive && !wakeRecognition?.aborted) {
            setTimeout(() => {
                if (!isVoiceActive && !wakeRecognition?.started) {
                    startVoiceActivation();
                }
            }, 500);
        }
    };

    try {
        wakeRecognition.start();
        wakeRecognition.started = true;
        console.log("Voice activation started");
        showToast("Voice activation started. Say 'Danny' to give a command.");
    } catch (e) {
        console.error("Failed to start wake recognition:", e);
        showToast("Failed to start voice activation");
        wakeRecognition = null;
        setTimeout(() => {
            if (!isVoiceActive) startVoiceActivation();
        }, 1000);
    }
}

function listenForCommand() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        showToast("Voice recognition not supported");
        startVoiceActivation();
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    let wasPlaying = !audio.paused;

    recognition.onstart = () => {
        audio.pause();
        updatePlayPauseUI(false);
        isVoiceActive = true;
        voiceBtn.style.backgroundColor = "rgba(0, 230, 204, 0.3)";
        voiceBtn.style.color = "#00e6cc";
        voiceBtn.disabled = true;
        showToast("Listening for command...");
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase().trim();
        handleVoiceCommand(command);
    };

    recognition.onerror = (e) => {
        showToast(`Voice recognition error: ${e.error}`);
        console.error("Command recognition error:", e.error);
        voiceBtn.style.backgroundColor = "";
        voiceBtn.style.color = "";
        voiceBtn.disabled = false;
        isVoiceActive = false;
        if (wasPlaying) {
            setTimeout(() => {
                safePlay();
            }, 1000);
        }
        startVoiceActivation();
    };

    recognition.onend = () => {
        voiceBtn.style.backgroundColor = "";
        voiceBtn.style.color = "";
        voiceBtn.disabled = false;
        isVoiceActive = false;
        if (wasPlaying) {
            setTimeout(() => {
                safePlay();
            }, 1000);
        }
        startVoiceActivation();
    };

    try {
        recognition.start();
    } catch (e) {
        console.error("Failed to start command recognition:", e);
        showToast("Failed to listen for command");
        isVoiceActive = false;
        voiceBtn.style.backgroundColor = "";
        voiceBtn.style.color = "";
        voiceBtn.disabled = false;
        startVoiceActivation();
    }
}

// Event Listeners
menuBtn?.addEventListener("click", () => {
    if (sidebar) sidebar.style.transform = "translateX(0)";
    if (closeSidebar) closeSidebar.style.display = "block";
});

closeSidebar?.addEventListener("click", () => {
    if (sidebar) sidebar.style.transform = "translateX(-100%)";
    if (closeSidebar) closeSidebar.style.display = "none";
    if (playlistContainer) playlistContainer.style.display = "none";
});

playBtn?.addEventListener("click", () => {
    safePlay();
    isSleepTimerPaused = false;
});

pauseBtn?.addEventListener("click", () => {
    audio.pause();
    updatePlayPauseUI(false);
    if (isVoiceFeedbackEnabled) speak("Paused");
});

nextBtn?.addEventListener("click", () => {
    if (skipCount >= maxSkips) {
        showToast("No more songs to skip to");
        return;
    }
    if (queue.length > 0) {
        const nextSong = queue.shift();
        currentSong = songs.findIndex(song => song.title === nextSong.title);
    } else if (isRandomMode) {
        currentSong = Math.floor(Math.random() * songs.length);
    } else {
        currentSong = (currentSong + 1) % songs.length;
    }
    loadSong(currentSong).then(() => {
        safePlay();
        skipCount = 0;
    }).catch(() => skipCount++);
});

prevBtn?.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong).then(() => {
        safePlay();
    });
});

audio?.addEventListener("timeupdate", () => {
    seekBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    const progress = (audio.currentTime / audio.duration) * 100 || 0;
    document.documentElement.style.setProperty("--progress", `${progress}%`);
});

audio?.addEventListener("ended", () => {
    console.log("Song ended:", { currentSong, repeatMode, songsLength: songs.length, queueLength: queue.length, isRandomMode });

    const playNext = () => {
        loadSong(currentSong).then(() => {
            safePlay();
            showToast(`Now Playing: ${songs[currentSong]?.title || "unknown"}`);
            if (isVoiceFeedbackEnabled) speak(`Playing ${songs[currentSong]?.title || "unknown"}`);
        }).catch(() => {
            if (songs.length > 1 && skipCount < maxSkips) {
                skipCount++;
                currentSong = (currentSong + 1) % songs.length;
                playNext();
            }
        });
    };

    if (repeatMode === 1) {
        audio.currentTime = 0;
        safePlay();
    } else if (repeatMode === 2) {
        currentSong = (currentSong + 1) % songs.length;
        playNext();
    } else if (queue.length > 0) {
        const nextSong = queue.shift();
        currentSong = songs.findIndex(song => song.title === nextSong.title);
        playNext();
    } else if (isRandomMode) {
        currentSong = Math.floor(Math.random() * songs.length);
        playNext();
    } else if ((currentSong + 1) < songs.length) {
        currentSong++;
        playNext();
    } else {
        updatePlayPauseUI(false);
        showToast("Playlist ended");
        if (isVoiceFeedbackEnabled) speak("Playlist ended");
    }

    if ("mediaSession" in navigator) {
        navigator.mediaSession.playbackState = audio.paused ? "paused" : "playing";
    }
});

audio?.addEventListener("error", () => {
    const failedSong = songs[currentSong]?.title || "unknown";
    showToast(`Error loading "${failedSong}". Skipping...`);
    console.error("Audio error:", audio.error);
    if (songs.length > 1 && skipCount < maxSkips) {
        skipCount++;
        nextBtn.click();
    }
});

seekBar?.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});

volumeControl?.addEventListener("input", debounce(() => {
    audio.volume = volumeControl.value;
    volumeIcon.textContent = audio.volume === 0 ? "🔇" : "🔊";
    document.documentElement.style.setProperty("--volume-progress", `${audio.volume * 100}%`);
}, 100));

volumeIcon?.addEventListener("click", () => {
    audio.volume = audio.volume === 0 ? 1 : 0;
    volumeControl.value = audio.volume;
    volumeIcon.textContent = audio.volume === 0 ? "🔇" : "🔊";
    document.documentElement.style.setProperty("--volume-progress", `${audio.volume * 100}%`);
});

randomBtn?.addEventListener("click", () => {
    isRandomMode = !isRandomMode;
    randomBtn.classList.toggle("active", isRandomMode);
    randomBtn.style.background = isRandomMode ? "#00e6cc" : "#2a2a2a";
    showToast(isRandomMode ? "Shuffle On" : "Shuffle Off");
    if (isVoiceFeedbackEnabled) speak(isRandomMode ? "Shuffle On" : "Shuffle Off");
});

repeatBtn?.addEventListener("click", () => {
    repeatMode = (repeatMode + 1) % 3;
    repeatBtn.classList.toggle("active", repeatMode > 0);
    const repeatText = repeatMode === 0 ? "Repeat Off" : repeatMode === 1 ? "Repeat One" : "Repeat All";
    repeatBtn.textContent = repeatMode === 0 ? "🔁" : repeatMode === 1 ? "🔂" : "🔀";
    showToast(repeatText);
    if (isVoiceFeedbackEnabled) speak(repeatText);
});

likeBtn?.addEventListener("click", () => {
    songs[currentSong].liked = !songs[currentSong].liked;
    likeBtn.textContent = songs[currentSong].liked ? "♥" : "♡";
    likeBtn.classList.toggle("liked", songs[currentSong].liked);
    localStorage.setItem("likedSongs", JSON.stringify(songs.filter(s => s.liked).map(s => s.title)));
    showToast(songs[currentSong].liked ? "Added to Liked Songs" : "Removed from Liked Songs");
    if (isVoiceFeedbackEnabled) speak(songs[currentSong].liked ? "Added to Liked Songs" : "Removed from Liked Songs");
});

libraryBtn?.addEventListener("click", () => {
    songs = originalSongs.filter(song => song.liked);
    currentSong = 0;
    if (playlistContainer) playlistContainer.style.display = "block";
    populatePlaylist();
    setActiveSidebarButton(libraryBtn);
    if (songs.length > 0) {
        loadSong(0);
    } else {
        showToast("No liked songs yet");
        if (isVoiceFeedbackEnabled) speak("No liked songs yet");
    }
});

playlistBtn?.addEventListener("click", () => {
    songs = [...originalSongs];
    if (playlistContainer) {
        playlistContainer.style.display = "block";
    }
    setActiveSidebarButton(playlistBtn);
    populatePlaylist();
});

categoryFilter?.addEventListener("change", () => {
    const category = categoryFilter.value;
    songs = category === "all" ? [...originalSongs] : originalSongs.filter(song => song.category === category);
    currentSong = 0;
    populatePlaylist();
    if (songs.length > 0) {
        loadSong(0);
        showToast(`Filtered by ${category}`);
        if (isVoiceFeedbackEnabled) speak(`Filtered by ${category}`);
    } else {
        showToast(`No songs in ${category} category`);
        if (isVoiceFeedbackEnabled) speak(`No songs in ${category} category`);
    }
});

searchInput?.addEventListener("input", debounce(() => {
    const query = searchInput.value.toLowerCase();
    songs = originalSongs.filter(song => song.title.toLowerCase().includes(query));
    currentSong = 0;
    populatePlaylist();
    if (songs.length > 0) {
        loadSong(0);
    } else {
        showToast("No songs found");
        if (isVoiceFeedbackEnabled) speak("No songs found");
    }
}, 300));

speedControl?.addEventListener("change", () => {
    playbackSpeed = parseFloat(speedControl.value);
    audio.playbackRate = playbackSpeed;
    showToast(`Speed set to ${speedControl.value}x`);
    if (isVoiceFeedbackEnabled) speak(`Speed set to ${speedControl.value}x`);
});

sleepTimer?.addEventListener("change", () => {
    const minutes = parseInt(sleepTimer.value);
    if (minutes > 0) {
        startSleepTimer(minutes);
        showToast(`Sleep Timer set for ${minutes} minutes`);
        if (isVoiceFeedbackEnabled) speak(`Sleep Timer set for ${minutes} minutes`);
    } else {
        if (sleepTimerInterval) clearInterval(sleepTimerInterval);
        sleepTimerInterval = null;
        sleepTimerDisplay.style.display = "none";
        remainingSeconds = 0;
        showToast("Sleep Timer Off");
        if (isVoiceFeedbackEnabled) speak("Sleep Timer Off");
    }
});

miniToggle?.addEventListener("click", () => {
    isMiniPlayer = !isMiniPlayer;
    player.classList.toggle("mini-player", isMiniPlayer);
    miniToggle.textContent = isMiniPlayer ? "⬆" : "⬇";
    miniCover.style.display = isMiniPlayer ? "inline-block" : "none";
    albumCover.style.display = isMiniPlayer ? "none" : "block";
    resetPositionBtn.style.display = isMiniPlayer ? "inline-block" : "none";
    document.body.classList.toggle("mini-player-active", isMiniPlayer);

    if (isMiniPlayer) {
        originalPosition = {
            bottom: player.style.bottom || "20px",
            right: player.style.right || "20px",
            left: player.style.left || "auto",
            top: player.style.top || "auto"
        };
        if (!hasBeenDragged) {
            Object.assign(player.style, defaultMiniPosition);
            currentX = window.innerWidth - player.offsetWidth - 20;
            currentY = window.innerHeight - player.offsetHeight - 20;
        }
    } else {
        Object.assign(player.style, originalPosition);
        player.classList.remove("dragged");
        hasBeenDragged = false;
    }

    loadSong(currentSong).then(() => {
        showToast(isMiniPlayer ? "Mini Player On" : "Mini Player Off");
        if (isVoiceFeedbackEnabled) speak(isMiniPlayer ? "Mini Player On" : "Mini Player Off");
    }).catch(err => {
        console.error("Mini toggle load error:", err);
        showToast("Failed to update player mode");
    });
});

player?.addEventListener("mousedown", startDragging);
player?.addEventListener("touchstart", startDragging, { passive: false });
document.addEventListener("mousemove", drag);
document.addEventListener("touchmove", drag, { passive: false });
document.addEventListener("mouseup", stopDragging);
document.addEventListener("touchend", stopDragging);

function startDragging(e) {
    if (!isMiniPlayer || !player) return;

    isDragging = true;
    player.classList.add("dragged");

    currentX = parseInt(player.style.left) || (window.innerWidth - player.offsetWidth - 20);
    currentY = parseInt(player.style.top) || (window.innerHeight - player.offsetHeight - 20);

    if (e.type === "mousedown") {
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;
    } else if (e.type === "touchstart") {
        const touch = e.touches[0];
        initialX = touch.clientX - currentX;
        initialY = touch.clientY - currentY;
        e.preventDefault();
    }

    hasBeenDragged = true;
}

function drag(e) {
    if (!isDragging || !player) return;

    e.preventDefault();

    if (e.type === "mousemove") {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
    } else if (e.type === "touchmove") {
        const touch = e.touches[0];
        currentX = touch.clientX - initialX;
        currentY = touch.clientY - initialY;
    }

    const playerWidth = player.offsetWidth;
    const playerHeight = player.offsetHeight;
    const maxX = window.innerWidth - playerWidth;
    const maxY = window.innerHeight - playerHeight;
    currentX = Math.max(0, Math.min(currentX, maxX));
    currentY = Math.max(0, Math.min(currentY, maxY));

    player.style.left = `${currentX}px`;
    player.style.top = `${currentY}px`;
    player.style.bottom = "auto";
    player.style.right = "auto";
}

function stopDragging() {
    if (isDragging) {
        isDragging = false;
        player.classList.add("dragged");
    }
}

resetPositionBtn?.addEventListener("click", () => {
    hasBeenDragged = false;
    Object.assign(player.style, defaultMiniPosition);
    player.classList.remove("dragged");
    currentX = window.innerWidth - player.offsetWidth - 20;
    currentY = window.innerHeight - player.offsetHeight - 20;
    showToast("Mini Player Position Reset");
    if (isVoiceFeedbackEnabled) speak("Mini Player Position Reset");
});

window.addEventListener("resize", () => {
    if (isMiniPlayer && hasBeenDragged && player) {
        const playerWidth = player.offsetWidth;
        const playerHeight = player.offsetHeight;
        const maxX = window.innerWidth - playerWidth;
        const maxY = window.innerHeight - playerHeight;
        currentX = Math.max(0, Math.min(currentX, maxX));
        currentY = Math.max(0, Math.min(currentY, maxY));
        player.style.left = `${currentX}px`;
        player.style.top = `${currentY}px`;
    }
});

albumCover?.addEventListener("click", () => {
    if (modal && modalImg) {
        modalImg.src = albumCover.src;
        modal.style.display = "block";
    }
});

modalClose?.addEventListener("click", () => {
    if (modal) modal.style.display = "none";
});

modal?.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    themeToggle.textContent = document.body.classList.contains("light-theme") ? "🌞" : "🌙";
    showToast(document.body.classList.contains("light-theme") ? "Light Theme" : "Dark Theme");
    if (isVoiceFeedbackEnabled) speak(document.body.classList.contains("light-theme") ? "Light Theme" : "Dark Theme");
});

homeLink?.addEventListener("click", () => {
    if (homePage && player) {
        homePage.style.display = "block";
        player.style.display = "none";
        setActiveSidebarButton(homeLink);
        showToast("Home Page");
        if (isVoiceFeedbackEnabled) speak("Home Page");
    }
});

backToPlayer?.addEventListener("click", () => {
    if (homePage && player) {
        homePage.style.display = "none";
        player.style.display = "block";
        setActiveSidebarButton(null);
        showToast("Back to Player");
        if (isVoiceFeedbackEnabled) speak("Back to Player");
    }
});

shortcutBtn?.addEventListener("click", () => {
    if (shortcutModal) {
        shortcutModal.style.display = "block";
        showToast("Shortcuts Displayed");
        if (isVoiceFeedbackEnabled) speak("Shortcuts Displayed");
    }
});

shortcutClose?.addEventListener("click", () => {
    if (shortcutModal) shortcutModal.style.display = "none";
});

shortcutModal?.addEventListener("click", (e) => {
    if (e.target === shortcutModal) shortcutModal.style.display = "none";
});

voiceCmdToggle?.addEventListener("click", () => {
    isVoiceFeedbackEnabled = !isVoiceFeedbackEnabled;
    const toggleState = voiceCmdToggle.querySelector(".toggle-state");
    if (toggleState) {
        toggleState.textContent = isVoiceFeedbackEnabled ? "On" : "Off";
    }
    voiceCmdToggle.classList.toggle("on", isVoiceFeedbackEnabled);
    voiceCmdToggle.classList.toggle("off", !isVoiceFeedbackEnabled);
    showToast(`Voice Feedback ${isVoiceFeedbackEnabled ? "On" : "Off"}`);
    if (isVoiceFeedbackEnabled) speak(`Voice Feedback ${isVoiceFeedbackEnabled ? "On" : "Off"}`);
});

voiceBtn?.addEventListener("click", () => {
    if (isVoiceActive) {
        if (wakeRecognition) {
            wakeRecognition.aborted = true;
            wakeRecognition.stop();
            wakeRecognition = null;
        }
        isVoiceActive = false;
        showToast("Voice activation stopped");
        if (isVoiceFeedbackEnabled) speak("Voice activation stopped");
        voiceBtn.style.backgroundColor = "";
        voiceBtn.style.color = "";
    } else {
        if (wakeRecognition) {
            wakeRecognition.aborted = true;
            wakeRecognition.stop();
            wakeRecognition = null;
        }
        listenForCommand();
    }
});

// Enhanced Voice Command Handler
function handleVoiceCommand(command) {
    if (!command.toLowerCase().startsWith("danny")) {
        const utterance = speak("Please start with 'Danny'", true);
        if (utterance) utterance.onend = () => showToast("Please start with 'Danny'");
        return;
    }

    const action = command.replace("danny", "").trim().toLowerCase();
    const commands = {
        play: ["play", "start", "resume"],
        pause: ["pause", "halt"],
        next: ["next", "skip", "forward"],
        previous: ["previous", "back"],
        shuffle: ["shuffle", "random"],
        repeat: ["repeat", "loop"],
        like: ["like", "favorite", "heart"],
        mini: ["mini", "mini player"],
        theme: ["theme", "mode"],
        volumeUp: ["volume up", "louder"],
        volumeDown: ["volume down", "quieter"],
        mute: ["mute", "silent"],
        unmute: ["unmute", "sound on"],
        home: ["home", "main"],
        player: ["player", "back to player"],
        search: ["search", "find"],
        help: ["help", "commands", "shortcuts"],
        hideShortcuts: ["hide shortcuts", "close shortcuts"],
        library: ["library", "liked songs"],
        sidebar: ["sidebar", "menu"],
        reset: ["reset", "reset mini"],
        queue: ["queue", "add to queue"],
        clearQueue: ["clear queue", "empty queue"],
        restart: ["restart", "replay"],
        sleepTimer: ["set sleep timer", "sleep timer", "sleep"],
        fastForward: ["fast forward", "skip ahead"],
        rewind: ["rewind", "go back"],
        voiceOff: ["off voice feedback", "disable voice", "voice off"],
        voiceOn: ["on voice feedback", "enable voice", "voice on"],
        setVolume: ["set volume", "volume to"],
        whatIsPlaying: ["what is playing", "now playing", "current song"],
        timeLeft: ["how much time is left", "time remaining", "time left"],
        duration: ["what’s the duration", "song length", "duration"],
        listQueue: ["list queue", "what’s in queue", "queue list"],
        setSpeed: ["set speed", "speed to"],
        filter: ["filter", "category"],
        cancelSleep: ["cancel sleep timer", "cancel sleep", "cancel"]
    };

    let matchedKey = null;
    for (const [key, keywords] of Object.entries(commands)) {
        if (keywords.some(kw => action === kw || action.startsWith(kw + " "))) {
            matchedKey = key;
            break;
        }
    }

    if (matchedKey) {
        const respond = (message, speakMessage = message) => {
            showToast(message);
            if (isVoiceFeedbackEnabled) speak(speakMessage);
        };

        switch (matchedKey) {
            case "play":
                if (action.split(" ").length > 1) {
                    handlePlaySongCommand(action);
                } else {
                    playBtn?.click();
                    respond("Playing");
                }
                break;
            case "pause":
                pauseBtn?.click();
                break;
            case "next":
                nextBtn?.click();
                break;
            case "previous":
                prevBtn?.click();
                break;
            case "shuffle":
                randomBtn?.click();
                break;
            case "repeat":
                repeatBtn?.click();
                break;
            case "like":
                likeBtn?.click();
                break;
            case "mini":
                miniToggle?.click();
                break;
            case "theme":
                themeToggle?.click();
                break;
            case "volumeUp":
                audio.volume = Math.min(1, audio.volume + 0.1);
                volumeControl.value = audio.volume;
                volumeIcon.textContent = audio.volume === 0 ? "🔇" : "🔊";
                document.documentElement.style.setProperty("--volume-progress", `${audio.volume * 100}%`);
                respond("Volume Up");
                break;
            case "volumeDown":
                audio.volume = Math.max(0, audio.volume - 0.1);
                volumeControl.value = audio.volume;
                volumeIcon.textContent = audio.volume === 0 ? "🔇" : "🔊";
                document.documentElement.style.setProperty("--volume-progress", `${audio.volume * 100}%`);
                respond("Volume Down");
                break;
            case "mute":
                audio.volume = 0;
                volumeControl.value = 0;
                volumeIcon.textContent = "🔇";
                document.documentElement.style.setProperty("--volume-progress", "0%");
                respond("Muted");
                break;
            case "unmute":
                audio.volume = 1;
                volumeControl.value = 1;
                volumeIcon.textContent = "🔊";
                document.documentElement.style.setProperty("--volume-progress", "100%");
                respond("Unmuted");
                break;
            case "home":
                homeLink?.click();
                break;
            case "player":
                backToPlayer?.click();
                break;
            case "search":
                searchInput?.focus();
                respond("Search activated");
                break;
            case "help":
                shortcutBtn?.click();
                break;
            case "hideShortcuts":
                shortcutClose?.click();
                respond("Shortcuts closed");
                break;
            case "library":
                libraryBtn?.click();
                break;
            case "sidebar":
                menuBtn?.click();
                break;
            case "reset":
                resetPositionBtn?.click();
                break;
            case "queue":
                const songName = action.replace(/add to queue|queue/i, "").trim();
                if (songName) {
                    const song = songs.find(s => s.title.toLowerCase().includes(songName));
                    if (song) {
                        queue.push(song);
                        respond(`Added to queue: ${song.title}`);
                    } else {
                        const originalSong = originalSongs.find(s => s.title.toLowerCase().includes(songName));
                        if (originalSong) {
                            queue.push(originalSong);
                            respond(`Added to queue: ${originalSong.title}`);
                        } else {
                            respond("Song not found");
                        }
                    }
                } else {
                    respond("Please specify a song to add to queue");
                }
                break;
            case "clearQueue":
                queue = [];
                respond("Queue cleared");
                break;
            case "restart":
                audio.currentTime = 0;
                safePlay();
                respond("Restarted");
                break;
            case "sleepTimer":
                const timeMatch = action.match(/(\d+)/);
                if (timeMatch) {
                    const minutes = parseInt(timeMatch[0]);
                    sleepTimer.value = minutes;
                    sleepTimer.dispatchEvent(new Event("change"));
                } else {
                    respond("Please specify a time in minutes");
                }
                break;
            case "fastForward":
                const ffSeconds = action.match(/(\d+)/) ? parseInt(action.match(/(\d+)/)[0]) : 10;
                audio.currentTime = Math.min(audio.duration, audio.currentTime + ffSeconds);
                respond(`Fast forwarded ${ffSeconds} seconds`);
                break;
            case "rewind":
                const rwSeconds = action.match(/(\d+)/) ? parseInt(action.match(/(\d+)/)[0]) : 10;
                audio.currentTime = Math.max(0, audio.currentTime - rwSeconds);
                respond(`Rewound ${rwSeconds} seconds`);
                break;
            case "voiceOff":
                if (isVoiceFeedbackEnabled) voiceCmdToggle?.click();
                break;
            case "voiceOn":
                if (!isVoiceFeedbackEnabled) voiceCmdToggle?.click();
                break;
            case "setVolume":
                const volMatch = action.match(/(\d+)/);
                if (volMatch) {
                    const volume = parseInt(volMatch[0]);
                    if (volume >= 0 && volume <= 100) {
                        audio.volume = volume / 100;
                        volumeControl.value = audio.volume;
                        volumeIcon.textContent = audio.volume === 0 ? "🔇" : "🔊";
                        document.documentElement.style.setProperty("--volume-progress", `${audio.volume * 100}%`);
                        respond(`Volume set to ${volume}%`);
                    } else {
                        respond("Please specify a volume between 0 and 100");
                    }
                } else {
                    respond("Please specify a volume percentage");
                }
                break;
            case "whatIsPlaying":
                respond(`Now playing: ${songs[currentSong]?.title || "nothing"}`);
                break;
            case "timeLeft":
                if (isNaN(audio.duration)) {
                    respond("No song loaded");
                } else {
                    const timeRemaining = audio.duration - audio.currentTime;
                    respond(`Time left: ${formatTime(timeRemaining)}`);
                }
                break;
            case "duration":
                if (isNaN(audio.duration)) {
                    respond("No song loaded");
                } else {
                    respond(`Duration: ${formatTime(audio.duration)}`);
                }
                break;
            case "listQueue":
                if (queue.length === 0) {
                    respond("Queue is empty");
                } else {
                    const queueList = queue.map((song, index) => `${index + 1}. ${song.title}`).join(", ");
                    respond(`Queue: ${queueList}`);
                }
                break;
            case "setSpeed":
                const speedMatch = action.match(/(\d*\.?\d+)/);
                if (speedMatch) {
                    const speed = parseFloat(speedMatch[0]);
                    if (speed >= 0.5 && speed <= 2) {
                        speedControl.value = speed;
                        speedControl.dispatchEvent(new Event("change"));
                    } else {
                        respond("Please specify a speed between 0.5 and 2");
                    }
                } else {
                    respond("Please specify a playback speed");
                }
                break;
            case "filter":
                const categoryMatch = action.match(/pop|rock|dance|all/i);
                if (categoryMatch) {
                    const category = categoryMatch[0].toLowerCase();
                    categoryFilter.value = category === "all" ? "all" : category.charAt(0).toUpperCase() + category.slice(1);
                    categoryFilter.dispatchEvent(new Event("change"));
                } else {
                    respond("Please specify a category: Pop, Rock, Dance, or All");
                }
                break;
            case "cancelSleep":
                if (sleepTimerInterval) {
                    clearInterval(sleepTimerInterval);
                    sleepTimerInterval = null;
                    sleepTimerDisplay.style.display = "none";
                    remainingSeconds = 0;
                    sleepTimer.value = "0";
                    respond("Sleep Timer Canceled");
                } else {
                    respond("No active sleep timer");
                }
                break;
        }
    } else {
        const utterance = speak("Command not recognized", true);
        if (utterance) utterance.onend = () => showToast("Command not recognized");
    }
}

// New function to handle "play song" voice commands with fuzzy matching
function handlePlaySongCommand(action) {
    const keywordsToRemove = ["danny", "play", "song", "the", "now", "please"];
    let songName = action.toLowerCase().trim();
    if (!songName) {
        showToast("Please specify a song name");
        if (isVoiceFeedbackEnabled) speak("Please specify a song name");
        return;
    }

    keywordsToRemove.forEach(keyword => {
        songName = songName.replace(new RegExp(`\\b${keyword}\\b`, "gi"), "").trim();
    });

    const levenshteinDistance = (a, b) => {
        const dp = Array(a.length + 1).fill(null).map(() => Array(b.length + 1).fill(null));
        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // deletion
                    dp[i][j - 1] + 1, // insertion
                    dp[i - 1][j - 1] + indicator // substitution
                );
            }
        }
        return dp[a.length][b.length];
    };

    const findSongIndex = (songList, query) => {
        if (!songList.length) return -1;

        const cleanQuery = query.replace(/[^a-z0-9\s]/g, "").trim();
        if (!cleanQuery) return -1;

        const queryWords = cleanQuery.split(/\s+/).filter(w => w.length > 1);

        let bestMatch = { index: -1, score: -1 };
        const titleCache = new Map();

        for (let i = 0; i < songList.length; i++) {
            const song = songList[i];
            const titleLower = song.title.toLowerCase();
            let cleanTitle = titleCache.get(titleLower);
            if (!cleanTitle) {
                cleanTitle = titleLower.replace(/[^a-z0-9\s]/g, "");
                titleCache.set(titleLower, cleanTitle);
            }

            if (cleanTitle === cleanQuery) return i;

            const titleWords = cleanTitle.split(/\s+/).filter(w => w.length > 1);
            let score = 0;

            const matchingWords = queryWords.filter(qw => titleWords.includes(qw)).length;
            score += matchingWords * 10;

            if (cleanTitle.includes(cleanQuery)) score += 5;

            const distance = levenshteinDistance(cleanQuery, cleanTitle);
            const maxLen = Math.max(cleanQuery.length, cleanTitle.length);
            const similarity = 1 - (distance / maxLen);
            score += similarity * 3;

            if (score > bestMatch.score) {
                bestMatch = { index: i, score };
            }
        }

        return bestMatch.score >= 5 ? bestMatch.index : -1;
    };

    let songIndex = findSongIndex(songs, songName);

    if (songIndex === -1) {
        songIndex = findSongIndex(originalSongs, songName);
        if (songIndex !== -1) {
            const songToAdd = originalSongs[songIndex];
            const existsInSongs = songs.some(s => s.title === songToAdd.title);
            if (!existsInSongs) {
                songs.push(songToAdd);
                songIndex = songs.length - 1;
                populatePlaylist();
            } else {
                songIndex = songs.findIndex(s => s.title === songToAdd.title);
            }
        }
    }

    if (songIndex !== -1) {
        loadSong(songIndex).then(() => {
            audio.play().then(() => {
                updatePlayPauseUI(true);
                showToast(`Now Playing: ${songs[songIndex].title}`);
                if (isVoiceFeedbackEnabled) speak(`Playing ${songs[songIndex].title}`);
            }).catch(e => {
                console.error("Play error:", e);
                showToast("Failed to play the song");
                if (isVoiceFeedbackEnabled) speak("Failed to play the song");
            });
        }).catch(e => {
            console.error("Load error:", e);
            showToast("Error loading song");
            if (isVoiceFeedbackEnabled) speak("Error loading song");
        });
    } else {
        const closeMatches = originalSongs
            .map(song => {
                const cleanTitle = song.title.toLowerCase().replace
                (/[^a-z0-9\s]/g, "");
                const distance = levenshteinDistance(cleanQuery, cleanTitle);
                const maxLen = Math.max(cleanQuery.length, cleanTitle.length);
                const similarity = 1 - (distance / maxLen);
                return { song: song.title, similarity };
            })
            .filter(item => item.similarity > 0.5)
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, 3);

        if (closeMatches.length > 0) {
            const suggestions = closeMatches.map(m => m.song).join(", ");
            showToast(`Song not found. Did you mean: ${suggestions}?`);
            if (isVoiceFeedbackEnabled) speak(`Song not found. Did you mean: ${suggestions}?`);
        } else {
            showToast("Song not found");
            if (isVoiceFeedbackEnabled) speak("Song not found");
        }
    }
}

// Accessibility Enhancements
function enhanceAccessibility() {
    // Add ARIA labels to interactive elements
    const interactiveElements = [
        { element: playBtn, label: "Play button" },
        { element: pauseBtn, label: "Pause button" },
        { element: nextBtn, label: "Next song button" },
        { element: prevBtn, label: "Previous song button" },
        { element: randomBtn, label: "Shuffle button" },
        { element: repeatBtn, label: "Repeat button" },
        { element: likeBtn, label: "Like button" },
        { element: libraryBtn, label: "Library button" },
        { element: playlistBtn, label: "Playlist button" },
        { element: voiceBtn, label: "Voice command button" },
        { element: miniToggle, label: "Toggle mini player button" },
        { element: themeToggle, label: "Toggle theme button" },
        { element: shortcutBtn, label: "Show shortcuts button" },
        { element: resetPositionBtn, label: "Reset mini player position button" },
        { element: menuBtn, label: "Open sidebar button" },
        { element: closeSidebar, label: "Close sidebar button" },
        { element: modalClose, label: "Close album cover modal button" },
        { element: volumeIcon, label: "Mute/Unmute button" }
    ];

    interactiveElements.forEach(({ element, label }) => {
        if (element) {
            element.setAttribute("aria-label", label);
            element.setAttribute("role", "button");
            element.setAttribute("tabindex", "0");
            element.addEventListener("keypress", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    element.click();
                }
            });
        }
    });

    // Enhance seek bar accessibility
    if (seekBar) {
        seekBar.setAttribute("aria-label", "Seek bar");
        seekBar.setAttribute("role", "slider");
        seekBar.setAttribute("aria-valuemin", "0");
        seekBar.setAttribute("aria-valuemax", audio.duration || 100);
        seekBar.setAttribute("aria-valuenow", audio.currentTime || 0);
        seekBar.setAttribute("aria-valuetext", formatTime(audio.currentTime || 0));
        seekBar.addEventListener("input", () => {
            seekBar.setAttribute("aria-valuenow", seekBar.value);
            seekBar.setAttribute("aria-valuetext", formatTime(seekBar.value));
        });
    }

    // Enhance volume control accessibility
    if (volumeControl) {
        volumeControl.setAttribute("aria-label", "Volume control");
        volumeControl.setAttribute("role", "slider");
        volumeControl.setAttribute("aria-valuemin", "0");
        volumeControl.setAttribute("aria-valuemax", "1");
        volumeControl.setAttribute("aria-valuenow", audio.volume);
        volumeControl.setAttribute("aria-valuetext", `${Math.round(audio.volume * 100)}%`);
        volumeControl.addEventListener("input", () => {
            volumeControl.setAttribute("aria-valuenow", volumeControl.value);
            volumeControl.setAttribute("aria-valuetext", `${Math.round(volumeControl.value * 100)}%`);
        });
    }

    // Enhance sidebar links accessibility
    sidebarLinks.forEach(link => {
        link.setAttribute("tabindex", "0");
        link.addEventListener("keypress", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Announce song changes to screen readers
    audio?.addEventListener("play", () => {
        announceToScreenReader(`Now playing: ${songs[currentSong]?.title || "unknown"}`);
    });
    audio?.addEventListener("pause", () => {
        announceToScreenReader("Playback paused");
    });
}

function announceToScreenReader(message) {
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("role", "status");
    liveRegion.style.position = "absolute";
    liveRegion.style.width = "1px";
    liveRegion.style.height = "1px";
    liveRegion.style.margin = "-1px";
    liveRegion.style.overflow = "hidden";
    liveRegion.style.clip = "rect(0,0,0,0)";
    liveRegion.textContent = message;
    document.body.appendChild(liveRegion);
    setTimeout(() => {
        document.body.removeChild(liveRegion);
    }, 1000);
}

// Debounce Utility
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Initialization
window.addEventListener("load", () => {
    loadLikedSongs();
    populatePlaylist();
    loadSong(currentSong).then(() => {
        if (!isFirstLoad) safePlay();
        isFirstLoad = false;
        enhanceAccessibility();
        startVoiceActivation();

        // Initialize theme based on user preference or system setting
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
            document.body.classList.add("light-theme");
            themeToggle.textContent = "🌞";
        } else {
            themeToggle.textContent = "🌙";
        }

        // Save theme preference on change
        themeToggle?.addEventListener("click", () => {
            localStorage.setItem("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
        });

        // Handle visibility changes for sleep timer
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden" && sleepTimerInterval) {
                isSleepTimerPaused = true;
            } else if (document.visibilityState === "visible") {
                isSleepTimerPaused = false;
            }
        });

        // Handle online/offline states
        window.addEventListener("online", () => {
            showToast("Back online");
            if (isVoiceFeedbackEnabled) speak("Back online");
        });
        window.addEventListener("offline", () => {
            showToast("You are offline");
            if (isVoiceFeedbackEnabled) speak("You are offline");
        });

        // Prevent accidental back navigation
        window.addEventListener("beforeunload", (e) => {
            if (!audio.paused) {
                e.preventDefault();
                e.returnValue = "Music is playing. Are you sure you want to leave?";
            }
        });

        // Keyboard shortcuts
        document.addEventListener("keydown", (e) => {
            if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
            switch (e.key) {
                case " ":
                    e.preventDefault();
                    audio.paused ? playBtn.click() : pauseBtn.click();
                    break;
                case "ArrowRight":
                    nextBtn.click();
                    break;
                case "ArrowLeft":
                    prevBtn.click();
                    break;
                case "m":
                    volumeIcon.click();
                    break;
                case "r":
                    repeatBtn.click();
                    break;
                case "s":
                    randomBtn.click();
                    break;
                case "l":
                    likeBtn.click();
                    break;
                case "ArrowUp":
                    volumeControl.value = Math.min(1, parseFloat(volumeControl.value) + 0.1);
                    volumeControl.dispatchEvent(new Event("input"));
                    break;
                case "ArrowDown":
                    volumeControl.value = Math.max(0, parseFloat(volumeControl.value) - 0.1);
                    volumeControl.dispatchEvent(new Event("input"));
                    break;
                case "h":
                    homeLink.click();
                    break;
                case "p":
                    backToPlayer.click();
                    break;
            }
        });

        // Lazy load images
        const images = document.querySelectorAll("img[data-src]");
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute("data-src");
                    obs.unobserve(img);
                }
            });
        });
        images.forEach(img => observer.observe(img));
    }).catch(err => {
        console.error("Initial load error:", err);
        showToast("Failed to load the first song");
    });
});

// Handle page visibility for background audio
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden" && !audio.paused) {
        console.log("Page hidden, audio playing in background");
    } else if (document.visibilityState === "visible" && !audio.paused) {
        console.log("Page visible, audio playing");
    }
});

// Error Boundary for Uncaught Errors
window.addEventListener("error", (e) => {
    console.error("Uncaught error:", e.message, e.filename, e.lineno);
    showToast("An unexpected error occurred. Please refresh the page.");
    if (isVoiceFeedbackEnabled) speak("An unexpected error occurred");
    return false;
});

window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason);
    showToast("An unexpected error occurred. Please refresh the page.");
    if (isVoiceFeedbackEnabled) speak("An unexpected error occurred");
});