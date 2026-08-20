/* =========================================================
   BOOKCRAFT — MASTER JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("active");

        menuBtn.textContent =
            navMenu.classList.contains("active") ? "✕" : "☰";
    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        observer.observe(element);
    });

} else {

    revealElements.forEach(function (element) {
        element.classList.add("visible");
    });

}


/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key, fallback = null) {

    try {

        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : fallback;

    } catch (error) {

        return fallback;

    }

}


/* =========================================================
   BOOK PROGRESS
   ========================================================= */

function updateBookProgress() {

    let completed = 0;

    const idea = loadData("bookcraftIdea");
    const character = loadData("bookcraftCharacter");
    const world = loadData("bookcraftWorld");
    const plot = loadData("bookcraftPlot");
    const writing = loadData("bookcraftWriting");
    const editing = loadData("bookcraftEditing");
    const cover = loadData("bookcraftCover");
    const quiz = loadData("bookcraftQuiz");

    if (idea) completed++;
    if (character) completed++;
    if (world) completed++;
    if (plot) completed++;
    if (writing && writing.text && writing.text.trim()) completed++;
    if (editing && editing > 0) completed++;
    if (cover) completed++;
    if (quiz && quiz.completed) completed++;

    const percentage = Math.round((completed / 8) * 100);

    const progressText = document.getElementById("progressText");
    const progressNumber = document.getElementById("progressNumber");
    const progressCircle = document.querySelector(".progress-circle");

    if (progressText) {
        progressText.textContent = percentage + "% Complete";
    }

    if (progressNumber) {
        progressNumber.textContent = percentage + "%";
    }

    if (progressCircle) {
        progressCircle.style.background =
            `conic-gradient(#6c63ff ${percentage * 3.6}deg, #ededf5 0deg)`;
    }

    const finalProgress = document.getElementById("finalProgress");

    if (finalProgress) {
        finalProgress.textContent = percentage + "%";
    }

}


/* =========================================================
   IDEA GENERATOR
   ========================================================= */

const generateIdea = document.getElementById("generateIdea");

if (generateIdea) {

    const ideas = [

        {
            title: "The Door That Appeared at Midnight",
            text: "Every night, a mysterious door appears in an ordinary bedroom. One night, someone decides to open it.",
            genre: "Mystery",
            mood: "Mysterious"
        },

        {
            title: "The Last Student on Mars",
            text: "A school field trip to Mars goes wrong, leaving one student to solve a problem no teacher prepared for.",
            genre: "Sci-Fi",
            mood: "Adventurous"
        },

        {
            title: "The Library of Lost Memories",
            text: "A child discovers a hidden library where every book contains a memory someone has forgotten.",
            genre: "Fantasy",
            mood: "Magical"
        },

        {
            title: "The Robot Who Wanted to Dream",
            text: "A curious robot begins experiencing strange dreams and searches for the reason behind them.",
            genre: "Sci-Fi",
            mood: "Emotional"
        },

        {
            title: "Seven Minutes Before Tomorrow",
            text: "A mysterious clock gives its owner exactly seven minutes to change one event from the future.",
            genre: "Adventure",
            mood: "Suspenseful"
        },

        {
            title: "The Village Above the Clouds",
            text: "A hidden village floats above the clouds, but it is slowly falling toward the world below.",
            genre: "Fantasy",
            mood: "Epic"
        },

        {
            title: "The Pencil That Changed Reality",
            text: "Anything drawn with a strange pencil becomes real—but every drawing has an unexpected consequence.",
            genre: "Fantasy",
            mood: "Fun"
        },

        {
            title: "The Secret Under Classroom 6B",
            text: "Students discover a locked room beneath their classroom that has not appeared on any school map.",
            genre: "Mystery",
            mood: "Suspenseful"
        }

    ];

    generateIdea.addEventListener("click", function () {

        const random =
            ideas[Math.floor(Math.random() * ideas.length)];

        const title = document.getElementById("ideaTitle");
        const text = document.getElementById("ideaText");
        const genre = document.getElementById("ideaGenre");
        const mood = document.getElementById("ideaMood");

        if (title) title.textContent = random.title;
        if (text) text.textContent = random.text;
        if (genre) genre.textContent = random.genre;
        if (mood) mood.textContent = random.mood;

        saveData("bookcraftIdea", random);

        updateBookProgress();

    });

}


/* =========================================================
   CHARACTER CREATOR
   ========================================================= */

const saveCharacter =
    document.getElementById("saveCharacter");

if (saveCharacter) {

    saveCharacter.addEventListener("click", function () {

        const name =
            document.getElementById("charName").value.trim();

        const role =
            document.getElementById("charRole").value;

        const personality =
            document.getElementById("charPersonality").value.trim();

        const goal =
            document.getElementById("charGoal").value.trim();

        const secret =
            document.getElementById("charSecret").value.trim();

        if (!name) {

            alert("Give your character a name first!");

            document.getElementById("charName").focus();

            return;

        }

        const character = {
            name,
            role,
            personality,
            goal,
            secret
        };

        saveData("bookcraftCharacter", character);

        document.getElementById("createdRole").textContent =
            role.toUpperCase();

        document.getElementById("createdName").textContent =
            name;

        document.getElementById("createdPersonality").textContent =
            personality || "A mysterious personality.";

        document.getElementById("createdGoal").textContent =
            goal || "Unknown";

        document.getElementById("createdSecret").textContent =
            secret || "Still a secret...";

        document
            .getElementById("characterResult")
            .classList.remove("hidden");

        updateBookProgress();

    });

}


/* =========================================================
   WORLD BUILDER
   ========================================================= */

const saveWorld =
    document.getElementById("saveWorld");

if (saveWorld) {

    saveWorld.addEventListener("click", function () {

        const world = {

            place:
                document.getElementById("worldPlace").value.trim(),

            time:
                document.getElementById("worldTime").value.trim(),

            mood:
                document.getElementById("worldMood").value,

            rule:
                document.getElementById("worldRule").value.trim()

        };

        if (!world.place) {

            alert("Give your story world a place!");

            return;

        }

        saveData("bookcraftWorld", world);

        const result =
            document.getElementById("worldResult");

        result.innerHTML = `
            <div>
                <strong>🌎 ${escapeHTML(world.place)}</strong>
                <p>
                    ${escapeHTML(world.time || "An unknown time")}
                    • ${escapeHTML(world.mood)}
                </p>
                <p>
                    <strong>Special Rule:</strong>
                    ${escapeHTML(world.rule || "Your world is still mysterious.")}
                </p>
            </div>
        `;

        result.classList.remove("hidden");

        updateBookProgress();

    });

}


/* =========================================================
   PLOT PLANNER
   ========================================================= */

const savePlot =
    document.getElementById("savePlot");

if (savePlot) {

    savePlot.addEventListener("click", function () {

        const plot = {

            beginning:
                document.getElementById("plotBeginning").value,

            problem:
                document.getElementById("plotProblem").value,

            rising:
                document.getElementById("plotRising").value,

            climax:
                document.getElementById("plotClimax").value,

            ending:
                document.getElementById("plotEnding").value

        };

        saveData("bookcraftPlot", plot);

        alert("Plot saved! 🗺️");

        updateBookProgress();

    });

}


/* =========================================================
   WRITING DESK
   ========================================================= */

const writingArea =
    document.getElementById("writingArea");

const bookTitle =
    document.getElementById("bookTitle");

function updateWritingStats() {

    if (!writingArea) return;

    const text = writingArea.value;

    const words =
        text.trim() === ""
            ? 0
            : text.trim().split(/\s+/).length;

    const characters =
        text.length;

    const reading =
        words === 0
            ? 0
            : Math.max(1, Math.ceil(words / 200));

    const wordCount =
        document.getElementById("wordCount");

    const characterCount =
        document.getElementById("characterCount");

    const readingTime =
        document.getElementById("readingTime");

    if (wordCount) {
        wordCount.textContent = words;
    }

    if (characterCount) {
        characterCount.textContent = characters;
    }

    if (readingTime) {
        readingTime.textContent =
            reading + " min";
    }

    saveData("bookcraftWriting", {
        title: bookTitle ? bookTitle.value : "",
        text
    });

    updateBookProgress();

}

if (writingArea) {

    writingArea.addEventListener(
        "input",
        updateWritingStats
    );

}

if (bookTitle) {

    bookTitle.addEventListener(
        "input",
        updateWritingStats
    );

}


/* =========================================================
   CLEAR WRITING
   ========================================================= */

const clearWriting =
    document.getElementById("clearWriting");

if (clearWriting) {

    clearWriting.addEventListener("click", function () {

        if (!writingArea) return;

        if (
            confirm(
                "Clear your entire manuscript?"
            )
        ) {

            writingArea.value = "";

            if (bookTitle) {
                bookTitle.value = "";
            }

            updateWritingStats();

        }

    });

}


/* =========================================================
   EDITING CHECKLIST
   ========================================================= */

const editChecks =
    document.querySelectorAll(".edit-check");

function updateEditing() {

    if (!editChecks.length) return;

    let checked = 0;

    editChecks.forEach(function (check) {

        if (check.checked) {
            checked++;
        }

    });

    const percentage =
        Math.round(
            (checked / editChecks.length) * 100
        );

    const editPercentage =
        document.getElementById("editPercentage");

    const editProgress =
        document.getElementById("editProgress");

    if (editPercentage) {
        editPercentage.textContent =
            percentage + "%";
    }

    if (editProgress) {
        editProgress.style.width =
            percentage + "%";
    }

    saveData(
        "bookcraftEditing",
        percentage
    );

    updateBookProgress();

}

editChecks.forEach(function (check) {

    check.addEventListener(
        "change",
        updateEditing
    );

});


/* =========================================================
   COVER MAKER
   ========================================================= */

const updateCover =
    document.getElementById("updateCover");

if (updateCover) {

    updateCover.addEventListener("click", function () {

        const title =
            document.getElementById("coverTitle").value.trim()
            || "YOUR BOOK";

        const author =
            document.getElementById("coverAuthor").value.trim()
            || "Your Name";

        const style =
            document.getElementById("coverStyle").value;

        const cover =
            document.getElementById("coverPreview");

        document.getElementById("previewTitle")
            .textContent = title;

        document.getElementById("previewAuthor")
            .textContent = author;

        cover.className =
            "generated-cover " + style;

        saveData("bookcraftCover", {
            title,
            author,
            style
        });

        updateBookProgress();

    });

}


/* =========================================================
   LOAD SAVED STUDIO DATA
   ========================================================= */

function loadStudioData() {

    const character =
        loadData("bookcraftCharacter");

    if (character && document.getElementById("charName")) {

        document.getElementById("charName").value =
            character.name || "";

        document.getElementById("charRole").value =
            character.role || "Hero";

        document.getElementById("charPersonality").value =
            character.personality || "";

        document.getElementById("charGoal").value =
            character.goal || "";

        document.getElementById("charSecret").value =
            character.secret || "";

    }


    const world =
        loadData("bookcraftWorld");

    if (world && document.getElementById("worldPlace")) {

        document.getElementById("worldPlace").value =
            world.place || "";

        document.getElementById("worldTime").value =
            world.time || "";

        document.getElementById("worldMood").value =
            world.mood || "Mysterious";

        document.getElementById("worldRule").value =
            world.rule || "";

    }


    const plot =
        loadData("bookcraftPlot");

    if (plot && document.getElementById("plotBeginning")) {

        document.getElementById("plotBeginning").value =
            plot.beginning || "";

        document.getElementById("plotProblem").value =
            plot.problem || "";

        document.getElementById("plotRising").value =
            plot.rising || "";

        document.getElementById("plotClimax").value =
            plot.climax || "";

        document.getElementById("plotEnding").value =
            plot.ending || "";

    }


    const writing =
        loadData("bookcraftWriting");

    if (writing && document.getElementById("writingArea")) {

        document.getElementById("writingArea").value =
            writing.text || "";

        if (document.getElementById("bookTitle")) {

            document.getElementById("bookTitle").value =
                writing.title || "";

        }

        updateWritingStats();

    }


    const cover =
        loadData("bookcraftCover");

    if (cover && document.getElementById("coverPreview")) {

        document.getElementById("coverTitle").value =
            cover.title || "";

        document.getElementById("coverAuthor").value =
            cover.author || "";

        document.getElementById("coverStyle").value =
            cover.style || "magic";

        document.getElementById("previewTitle").textContent =
            cover.title || "YOUR BOOK";

        document.getElementById("previewAuthor").textContent =
            cover.author || "Your Name";

        document.getElementById("coverPreview").className =
            "generated-cover " + (cover.style || "magic");

    }


    const editing =
        loadData("bookcraftEditing");

    if (
        editing !== null &&
        editChecks.length
    ) {

        const count =
            Math.round(
                (editing / 100) *
                editChecks.length
            );

        editChecks.forEach(function (check, index) {

            check.checked =
                index < count;

        });

        updateEditing();

    }

}

loadStudioData();
updateBookProgress();


/* =========================================================
   QUIZ
   ========================================================= */

const quizQuestions = [

    {
        question:
            "What should usually come first when creating a story?",

        answers: [
            "The publishing contract",
            "A story idea",
            "The final cover",
            "The last chapter"
        ],

        correct: 1,

        explanation:
            "Most stories begin with an idea or question that sparks the writer's imagination."
    },

    {
        question:
            "What makes a character more interesting?",

        answers: [
            "Giving them no problems",
            "Giving them a goal and obstacles",
            "Making them perfect",
            "Never describing them"
        ],

        correct: 1,

        explanation:
            "Goals and obstacles create conflict and give characters something to overcome."
    },

    {
        question:
            "What is the setting of a story?",

        answers: [
            "The place and time where it happens",
            "The book's price",
            "The author's name",
            "The final sentence"
        ],

        correct: 0,

        explanation:
            "Setting tells readers where and when the story takes place."
    },

    {
        question:
            "Which event is usually the most intense moment of a story?",

        answers: [
            "The title",
            "The introduction",
            "The climax",
            "The dedication"
        ],

        correct: 2,

        explanation:
            "The climax is usually the major turning point or most intense moment."
    },

    {
        question:
            "What is a first draft?",

        answers: [
            
