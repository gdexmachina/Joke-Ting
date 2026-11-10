
// ==========================================
// RANDOM JOKE GENERATOR
// API + FAVOURITES + COMPLETE COLOUR THEMES
// ==========================================

const API_URL =
"https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single,twopart";

let jokeCount = 0;
let currentJoke = "";
let currentJokeId = null;
let previousJokeId = null;
let liked = false;
let previousTheme = -1;

let favorites = loadFavorites();


// ==========================================
// COMPLETE COLOUR THEMES
// ==========================================

const colorThemes = [

    {
        name: "Purple Dream",

        colors: [
            "#667eea", "#764ba2", "#e056fd", "#23a6d5"
        ],

        primary: "#764ba2",
        accent: "#e056fd",

        container: "#ffffff",
        heading: "#333333",
        text: "#444444",
        muted: "#888888",

        jokeCard: "#f5f3ff",
        jokeBorder: "#764ba2",

        button: "#764ba2",
        buttonText: "#ffffff",

        secondaryBg: "#eeeaff",
        secondaryText: "#6846a0",

        favoriteBg: "#f5f3ff",
        favoriteBorder: "#764ba2",

        removeBg: "#ffe1e8",
        removeText: "#d6335c",

        labelBg: "#f2edff",
        labelText: "#764ba2",

        divider: "#eeeeee",
        emptyBg: "#faf9ff",
        shadow: "rgba(0,0,0,0.2)"
    },

    {
        name: "Sunset",

        colors: [
            "#ff6a88", "#ff99ac", "#ff758c", "#ff7eb3"
        ],

        primary: "#e84368",
        accent: "#ff758c",

        container: "#fffafa",
        heading: "#702d3d",
        text: "#653c48",
        muted: "#a47782",

        jokeCard: "#fff0f3",
        jokeBorder: "#ff6a88",

        button: "#e84368",
        buttonText: "#ffffff",

        secondaryBg: "#ffe3e9",
        secondaryText: "#b82e52",

        favoriteBg: "#fff0f3",
        favoriteBorder: "#ff6a88",

        removeBg: "#ffdce5",
        removeText: "#b4234a",

        labelBg: "#ffe6ed",
        labelText: "#c5365b",

        divider: "#f3dce2",
        emptyBg: "#fff5f7",
        shadow: "rgba(100,30,50,0.18)"
    },

    {
        name: "Ocean Breeze",

        colors: [
            "#11998e", "#38ef7d", "#0575e6", "#00c6ff"
        ],

        primary: "#087d78",
        accent: "#00a6a6",

        container: "#faffff",
        heading: "#164d50",
        text: "#31595b",
        muted: "#77999a",

        jokeCard: "#e7f9f7",
        jokeBorder: "#11998e",

        button: "#087d78",
        buttonText: "#ffffff",

        secondaryBg: "#d9f2ef",
        secondaryText: "#087d78",

        favoriteBg: "#e7f9f7",
        favoriteBorder: "#11998e",

        removeBg: "#d7f2ed",
        removeText: "#087d78",

        labelBg: "#dff7f3",
        labelText: "#087d78",

        divider: "#d8eeea",
        emptyBg: "#f1fbfa",
        shadow: "rgba(0,80,80,0.18)"
    },

    {
        name: "Golden Glow",

        colors: [
            "#f7971e", "#ffd200", "#ff512f", "#dd2476"
        ],

        primary: "#c66b12",
        accent: "#ff9b24",

        container: "#fffdf7",
        heading: "#593c1b",
        text: "#624c35",
        muted: "#a18c71",

        jokeCard: "#fff5dc",
        jokeBorder: "#e99a24",

        button: "#c66b12",
        buttonText: "#ffffff",

        secondaryBg: "#ffedc5",
        secondaryText: "#94520d",

        favoriteBg: "#fff5dc",
        favoriteBorder: "#e99a24",

        removeBg: "#ffe7d1",
        removeText: "#a94a18",

        labelBg: "#fff0cb",
        labelText: "#a56612",

        divider: "#f1e3c9",
        emptyBg: "#fffaed",
        shadow: "rgba(100,65,15,0.18)"
    },

    {
        name: "Dreamy Pink",

        colors: [
            "#654ea3", "#eaafc8", "#a18cd1", "#fbc2eb"
        ],

        primary: "#89559d",
        accent: "#c477bb",

        container: "#fffaff",
        heading: "#543a61",
        text: "#674f70",
        muted: "#a08ba5",

        jokeCard: "#f9eff9",
        jokeBorder: "#a66bb7",

        button: "#89559d",
        buttonText: "#ffffff",

        secondaryBg: "#f1e3f3",
        secondaryText: "#81518f",

        favoriteBg: "#f9eff9",
        favoriteBorder: "#a66bb7",

        removeBg: "#f6e0ee",
        removeText: "#a34379",

        labelBg: "#f3e6f5",
        labelText: "#89559d",

        divider: "#eddfed",
        emptyBg: "#fdf7fd",
        shadow: "rgba(80,40,90,0.18)"
    },

    {
        name: "Tropical",

        colors: [
            "#00c9ff", "#92fe9d", "#3a7bd5", "#00d2ff"
        ],

        primary: "#147c91",
        accent: "#00a9bd",

        container: "#f8ffff",
        heading: "#205461",
        text: "#355e68",
        muted: "#7c9da5",

        jokeCard: "#e5f9fa",
        jokeBorder: "#149bb0",

        button: "#147c91",
        buttonText: "#ffffff",

        secondaryBg: "#d9f3f4",
        secondaryText: "#147c91",

        favoriteBg: "#e5f9fa",
        favoriteBorder: "#149bb0",

        removeBg: "#d7f1ed",
        removeText: "#167c71",

        labelBg: "#dcf5f5",
        labelText: "#147c91",

        divider: "#d9eeee",
        emptyBg: "#f1fbfb",
        shadow: "rgba(0,80,100,0.18)"
    },

    {
        name: "Fire",

        colors: [
            "#ee0979", "#ff6a00", "#ff416c", "#ff4b2b"
        ],

        primary: "#d93642",
        accent: "#ff6a00",

        container: "#fffaf8",
        heading: "#652d29",
        text: "#69413a",
        muted: "#a17e75",

        jokeCard: "#fff0e9",
        jokeBorder: "#ed5539",

        button: "#d93642",
        buttonText: "#ffffff",

        secondaryBg: "#ffe5d9",
        secondaryText: "#bd422a",

        favoriteBg: "#fff0e9",
        favoriteBorder: "#ed5539",

        removeBg: "#ffe1dc",
        removeText: "#c13a32",

        labelBg: "#ffe8df",
        labelText: "#bd422a",

        divider: "#f2ded7",
        emptyBg: "#fff6f2",
        shadow: "rgba(100,35,20,0.18)"
    },

    {
        name: "Midnight",

        colors: [
            "#232526", "#414345", "#6a82fb", "#fc5c7d"
        ],

        primary: "#536bd0",
        accent: "#fc5c7d",

        container: "#f7f8ff",
        heading: "#252b46",
        text: "#414963",
        muted: "#828ba7",

        jokeCard: "#e9edff",
        jokeBorder: "#536bd0",

        button: "#3f54b7",
        buttonText: "#ffffff",

        secondaryBg: "#e0e5ff",
        secondaryText: "#3f54b7",

        favoriteBg: "#e9edff",
        favoriteBorder: "#536bd0",

        removeBg: "#ffe4eb",
        removeText: "#bd4567",

        labelBg: "#e6eaff",
        labelText: "#3f54b7",

        divider: "#dce1f2",
        emptyBg: "#f0f2ff",
        shadow: "rgba(20,25,60,0.22)"
    },

    {
        name: "Nature",

        colors: [
            "#56ab2f", "#a8e063", "#134e5e", "#71b280"
        ],

        primary: "#367c37",
        accent: "#71b280",

        container: "#fbfff8",
        heading: "#34532e",
        text: "#50654a",
        muted: "#8b9b82",

        jokeCard: "#eff8e8",
        jokeBorder: "#56ab2f",

        button: "#367c37",
        buttonText: "#ffffff",

        secondaryBg: "#e2f1d9",
        secondaryText: "#367c37",

        favoriteBg: "#eff8e8",
        favoriteBorder: "#56ab2f",

        removeBg: "#f1eadb",
        removeText: "#87602c",

        labelBg: "#e6f4df",
        labelText: "#367c37",

        divider: "#e0ebd8",
        emptyBg: "#f6fbf1",
        shadow: "rgba(35,75,25,0.18)"
    },

    {
        name: "Galaxy",

        colors: [
            "#8e2de2", "#4a00e0", "#da22ff", "#9733ee"
        ],

        primary: "#7130bd",
        accent: "#b34ee8",

        container: "#fcf9ff",
        heading: "#41245e",
        text: "#59416d",
        muted: "#9683a8",

        jokeCard: "#f2e9ff",
        jokeBorder: "#8e2de2",

        button: "#7130bd",
        buttonText: "#ffffff",

        secondaryBg: "#eaddfa",
        secondaryText: "#7130bd",

        favoriteBg: "#f2e9ff",
        favoriteBorder: "#8e2de2",

        removeBg: "#fce4f4",
        removeText: "#b1377e",

        labelBg: "#eee3ff",
        labelText: "#7130bd",

        divider: "#e9dcf3",
        emptyBg: "#faf6ff",
        shadow: "rgba(65,20,100,0.2)"
    }

];


// ==========================================
// APPLY COMPLETE COLOUR THEME
// ==========================================

function applyTheme(theme) {

    const root = document.documentElement;

    const variables = {

        "--bg-one": theme.colors[0],
        "--bg-two": theme.colors[1],
        "--bg-three": theme.colors[2],
        "--bg-four": theme.colors[3],

        "--primary": theme.primary,
        "--accent": theme.accent,

        "--container": theme.container,
        "--heading": theme.heading,
        "--text": theme.text,
        "--muted": theme.muted,

        "--joke-card": theme.jokeCard,
        "--joke-border": theme.jokeBorder,

        "--button-bg": theme.button,
        "--button-text": theme.buttonText,

        "--secondary-bg": theme.secondaryBg,
        "--secondary-text": theme.secondaryText,

        "--favorite-bg": theme.favoriteBg,
        "--favorite-border": theme.favoriteBorder,

        "--remove-bg": theme.removeBg,
        "--remove-text": theme.removeText,

        "--label-bg": theme.labelBg,
        "--label-text": theme.labelText,

        "--divider": theme.divider,
        "--empty-bg": theme.emptyBg,
        "--shadow": theme.shadow

    };

    // Update every CSS variable
    Object.entries(variables).forEach(([property, value]) => {

        root.style.setProperty(property, value);

    });

    // Update theme name
    document.getElementById("themeName").textContent =
        theme.name;

}


// ==========================================
// RANDOM THEME SELECTOR
// ==========================================

function changeColorTheme() {

    let randomIndex;

    do {

        randomIndex = Math.floor(
            Math.random() * colorThemes.length
        );

    } while (
        randomIndex === previousTheme &&
        colorThemes.length > 1
    );

    previousTheme = randomIndex;

    applyTheme(colorThemes[randomIndex]);

}


// ==========================================
// LOAD FAVOURITES FROM LOCAL STORAGE
// ==========================================

function loadFavorites() {

    try {

        const saved = localStorage.getItem("favoriteJokes");

        const parsed = saved ? JSON.parse(saved) : [];

        if (!Array.isArray(parsed)) return [];

        return parsed.filter(joke =>
            joke &&
            typeof joke.id === "string" &&
            typeof joke.text === "string"
        );

    } catch (error) {

        console.error("Loading favourites failed:", error);

        return [];

    }

}


// ==========================================
// SAVE FAVOURITES
// ==========================================

function saveFavorites() {

    try {

        localStorage.setItem(
            "favoriteJokes",
            JSON.stringify(favorites)
        );

        updateLikesCounter();

        renderFavorites();

        return true;

    } catch (error) {

        console.error("Saving favourites failed:", error);

        alert("Could not save favourites. Check browser storage.");

        return false;

    }

}


// ==========================================
// GENERATE RANDOM JOKE USING API
// ==========================================

async function generateJoke() {

    const jokeElement =
        document.getElementById("joke");

    const nextButton =
        document.getElementById("nextBtn");

    if (nextButton.disabled) return;

    jokeElement.textContent =
        "😂 Finding a funny joke...";

    nextButton.disabled = true;

    nextButton.textContent = "Loading...";

    try {

        let data = null;

        let attempts = 0;

        // Fetch a joke and avoid immediate repetition
        do {

            const response = await fetch(API_URL);

            if (!response.ok) {

                throw new Error("API connection failed");

            }

            data = await response.json();

            if (data.error || !data.id) {

                throw new Error("Invalid joke response");

            }

            attempts++;

        } while (
            String(data.id) === previousJokeId &&
            attempts < 5
        );

        // Handle single and two-part jokes
        let newJoke;

        if (data.type === "single") {

            newJoke = data.joke;

        } else if (data.type === "twopart") {

            newJoke =
                data.setup + "\n\n" + data.delivery;

        } else {

            throw new Error("Unknown joke type");

        }

        // Store current joke
        currentJoke = newJoke;

        currentJokeId = String(data.id);

        previousJokeId = currentJokeId;

        // Display joke
        jokeElement.textContent = currentJoke;

        // Update statistics
        jokeCount++;

        document.getElementById("count").textContent =
            jokeCount;

        // Check if joke is already liked
        liked = favorites.some(
            joke => joke.id === currentJokeId
        );

        updateLikeButton();

        // CHANGE THE ENTIRE COLOUR SCHEME
        changeColorTheme();

    } catch (error) {

        console.error("Joke API error:", error);

        jokeElement.textContent =
            "Oops! We couldn't fetch a joke. Please check your internet connection and try again. 😂";

    } finally {

        nextButton.disabled = false;

        nextButton.textContent = "🎲 Tell Me a Joke";

    }

}


// ==========================================
// LIKE AND UNLIKE JOKES
// ==========================================

function likeJoke() {

    if (!currentJoke || !currentJokeId) {

        alert("Please generate a joke first!");

        return;

    }

    const oldFavorites = [...favorites];

    if (liked) {

        favorites = favorites.filter(
            joke => joke.id !== currentJokeId
        );

        liked = false;

    } else {

        favorites.push({

            id: currentJokeId,

            text: currentJoke,

            dateSaved: new Date().toISOString()

        });

        liked = true;

    }

    if (!saveFavorites()) {

        favorites = oldFavorites;

        liked = favorites.some(
            joke => joke.id === currentJokeId
        );

        updateLikeButton();

        return;

    }

    updateLikeButton();

}


// ==========================================
// UPDATE LIKE BUTTON
// ==========================================

function updateLikeButton() {

    const likeBtn =
        document.getElementById("likeBtn");

    if (liked) {

        likeBtn.textContent = "❤️ Liked";

        likeBtn.classList.add("liked");

    } else {

        likeBtn.textContent = "🤍 Like";

        likeBtn.classList.remove("liked");

    }

}


// ==========================================
// UPDATE FAVOURITES COUNTER
// ==========================================

function updateLikesCounter() {

    document.getElementById("likes").textContent =
        favorites.length;

}


// ==========================================
// DISPLAY SAVED FAVOURITE JOKES
// ==========================================

function renderFavorites() {

    const favoritesList =
        document.getElementById("favoritesList");

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.className = "empty-message";

        emptyMessage.textContent =
            "You haven't saved any jokes yet. ❤️";

        favoritesList.appendChild(emptyMessage);

        return;

    }

    favorites.forEach(joke => {

        const item =
            document.createElement("div");

        item.className = "favorite-item";

        const jokeText =
            document.createElement("p");

        jokeText.className = "favorite-joke";

        jokeText.textContent = joke.text;

        const actions =
            document.createElement("div");

        actions.className = "favorite-actions";

        const viewButton =
            document.createElement("button");

        viewButton.className = "view-btn";

        viewButton.textContent = "👀 View Again";

        viewButton.dataset.action = "view";

        viewButton.dataset.id = joke.id;

        const removeButton =
            document.createElement("button");

        removeButton.className = "remove-btn";

        removeButton.textContent = "🗑️ Remove";

        removeButton.dataset.action = "remove";

        removeButton.dataset.id = joke.id;

        actions.appendChild(viewButton);

        actions.appendChild(removeButton);

        item.appendChild(jokeText);

        item.appendChild(actions);

        favoritesList.appendChild(item);

    });

}


// ==========================================
// VIEW OR REMOVE SAVED JOKES
// ==========================================

document.getElementById("favoritesList").addEventListener(
    "click",
    function(event) {

        const button = event.target.closest("button");

        if (!button) return;

        const jokeId = button.dataset.id;

        const action = button.dataset.action;

        if (action === "view") {

            const selectedJoke = favorites.find(
                joke => joke.id === jokeId
            );

            if (!selectedJoke) return;

            currentJoke = selectedJoke.text;

            currentJokeId = selectedJoke.id;

            liked = true;

            document.getElementById("joke").textContent =
                currentJoke;

            updateLikeButton();

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

        if (action === "remove") {

            const oldFavorites = [...favorites];

            favorites = favorites.filter(
                joke => joke.id !== jokeId
            );

            if (currentJokeId === jokeId) {

                liked = false;

                updateLikeButton();

            }

            if (!saveFavorites()) {

                favorites = oldFavorites;

                liked = favorites.some(
                    joke => joke.id === currentJokeId
                );

                renderFavorites();

                updateLikesCounter();

                updateLikeButton();

            }

        }

    }
);


// ==========================================
// COPY JOKE
// ==========================================

async function copyJoke() {

    if (!currentJoke) {

        alert("Generate a joke before copying!");

        return;

    }

    try {

        await navigator.clipboard.writeText(currentJoke);

        const copyButton =
            document.getElementById("copyBtn");

        copyButton.textContent = "✅ Copied!";

        setTimeout(() => {

            copyButton.textContent = "📋 Copy Joke";

        }, 2000);

    } catch (error) {

        console.error("Copy failed:", error);

        alert(
            "Unable to copy. Please use HTTPS or localhost."
        );

    }

}


// ==========================================
// INITIALISE APPLICATION
// ==========================================

function initializeApp() {

    // Set initial theme
    previousTheme = 0;

    applyTheme(colorThemes[0]);

    // Restore saved jokes
    renderFavorites();

    updateLikesCounter();

}

initializeApp();
