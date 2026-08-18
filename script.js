/* =========================================================
   BOOKCRAFT — MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        menuBtn.textContent =
            navMenu.classList.contains("open")
                ? "✕"
                : "☰";

    });

}


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   LOCAL STORAGE HELPERS
   ========================================================= */

function saveData(key, value) {

    localStorage.setItem(
        "bookcraft_" + key,
        JSON.stringify(value)
    );

}


function getData(key, fallback = "") {

    const value =
        localStorage.getItem("bookcraft_" + key);

    if (!value) return fallback;

    try {

        return JSON.parse(value);

    } catch {

        return value;

    }

}


/* =========================================================
   IDEA GENERATOR
   ========================================================= */

const generateIdea =
    document.getElementById("generateIdea");


const ideaTitles = [

    "The Door That Wasn't There",

    "The Last Lightkeeper",

    "The Boy Who Remembered Tomorrow",

    "The Library Under the City",

    "Five Minutes Before Midnight",

    "The Map of Impossible Places",

    "The Clock That Stopped Time",

    "The Secret Inside Room 27",

    "The Girl Who Found a Star",

    "The Train to Nowhere"

];


const ideaStories = [

    "A young student discovers a mysterious door in a familiar place. Every time it opens, the world on the other side has changed.",

    "A lonely lighthouse keeper notices that the light predicts events before they happen.",

    "A teenager wakes up remembering an entire day that hasn't happened yet.",

    "A hidden library contains books that describe events from the future.",

    "At exactly midnight, every clock in the city stops except one.",

    "A strange map leads its owner to places that should not exist.",

    "An ordinary clock can freeze time, but only for five minutes.",

    "Room 27 appears on no school map, yet someone keeps leaving messages inside it.",

    "A girl finds a fallen star that can answer exactly three questions.",

    "A mysterious train arrives at a station that has never existed."
];


const genres = [

    "Fantasy",
    "Mystery",
    "Adventure",
    "Science Fiction",
    "Thriller",
    "Magical Realism"
];


const moods = [

    "Mysterious",
    "Exciting",
    "Magical",
    "Suspenseful",
    "Emotional",
    "Adventurous"
];


if (generateIdea) {

    generateIdea.addEventListener("click", () => {

        const index =
            Math.floor(
                Math.random() *
                ideaTitles.length
            );

        const title =
            document.getElementById("ideaTitle");

        const text =
            document.getElementById("ideaText");

        const genre =
            document.getElementById("ideaGenre");

        const mood =
            document.getElementById("ideaMood");


        if (title) {

            title.textContent =
                ideaTitles[index];

        }

        if (text) {

            text.textContent =
                ideaStories[index];

        }

        if (genre) {

            genre.textContent =
                genres[
                    Math.floor(
                        Math.random() *
                        genres.length
                    )
                ];

        }

        if (mood) {

            mood.textContent =
                moods[
                    Math.floor(
                        Math.random() *
                        moods.length
                    )
                ];

        }


        saveData(
            "idea",
            {
                title: ideaTitles[index],
                story: ideaStories[index]
            }
        );


        updateProgress();

    });

}


/* =========================================================
   CHARACTER BUILDER
   ========================================================= */

const saveCharacter =
    document.getElementById("saveCharacter");


if (saveCharacter) {

    const savedCharacter =
        getData("character", null);


    if (savedCharacter) {

        displayCharacter(savedCharacter);

    }


    saveCharacter.addEventListener("click", () => {

        const character = {

            name:
                document.getElementById("charName").value
                || "Unnamed Character",

            role:
                document.getElementById("charRole").value,

            personality:
                document.getElementById("charPersonality").value
                || "Mysterious",

            goal:
                document.getElementById("charGoal").value
                || "Find their purpose",

            secret:
                document.getElementById("charSecret").value
                || "They have a secret..."

        };


        saveData("character", character);

        displayCharacter(character);

        updateProgress();

    });

}


function displayCharacter(character) {

    const result =
        document.getElementById("characterResult");

    if (!result) return;


    document.getElementById("createdRole")
        .textContent =
        character.role.toUpperCase();

    document.getElementById("createdName")
        .textContent =
        character.name;

    document.getElementById("createdPersonality")
        .textContent =
        character.personality;

    document.getElementById("createdGoal")
        .textContent =
        character.goal;

    document.getElementById("createdSecret")
        .textContent =
        character.secret;


    result.classList.remove("hidden");

}


/* =========================================================
   WORLD BUILDER
   ========================================================= */

const saveWorld =
    document.getElementById("saveWorld");


if (saveWorld) {

    const savedWorld =
        getData("world", null);


    if (savedWorld) {

        displayWorld(savedWorld);

    }


    saveWorld.addEventListener("click", () => {

        const world = {

            place:
                document.getElementById("worldPlace").value
                || "An unknown place",

            time:
                document.getElementById("worldTime").value
                || "An unknown time",

            mood:
                document.getElementById("worldMood").value,

            rule:
                document.getElementById("worldRule").value
                || "The world has a secret."

        };


        saveData("world", world);

        displayWorld(world);

        updateProgress();

    });

}


function displayWorld(world) {

    const result =
        document.getElementById("worldResult");

    if (!result) return;


    result.innerHTML = `

        <strong>🌎 ${escapeHTML(world.place)}</strong>

        <p>
            <b>Time:</b>
            ${escapeHTML(world.time)}
            <br>

            <b>Atmosphere:</b>
            ${escapeHTML(world.mood)}
            <br>

            <b>Special Rule:</b>
            ${escapeHTML(world.rule)}
        </p>

    `;


    result.classList.remove("hidden");

}


/* =========================================================
   PLOT
   ========================================================= */

const savePlot =
    document.getElementById("savePlot");


if (savePlot) {

    const savedPlot =
        getData("plot", null);


    if (savedPlot) {

        Object.keys(savedPlot).forEach(key => {

            const field =
                document.getElementById(key);

            if (field) {

                field.value =
                    savedPlot[key];

            }

        });

    }


    savePlot.addEventListener("click", () => {

        const plot = {

            plotBeginning:
                document.getElementById("plotBeginning").value,

            plotProblem:
                document.getElementById("plotProblem").value,

            plotRising:
                document.getElementById("plotRising").value,

            plotClimax:
                document.getElementById("plotClimax").value,

            plotEnding:
                document.getElementById("plotEnding").value

        };


        saveData("plot", plot);

        updateProgress();

        showToast("Story plan saved!");

    });

}


/* =========================================================
   WRITING DESK
   ========================================================= */

const writingArea =
    document.getElementById("writingArea");

const bookTitle =
    document.getElementById("bookTitle");


if (writingArea) {

    const savedWriting =
        getData("writing", "");

    writingArea.value =
        savedWriting;


    updateWritingStats();


    writingArea.addEventListener(
        "input",
        () => {

            saveData(
                "writing",
                writingArea.value
            );

            updateWritingStats();

            updateProgress();

        }
    );

}


if (bookTitle) {

    bookTitle.value =
        getData("bookTitle", "");


    bookTitle.addEventListener(
        "input",
        () => {

            saveData(
                "bookTitle",
                bookTitle.value
            );

            updateProgress();

        }
    );

}


function updateWritingStats() {

    if (!writingArea) return;


    const text =
        writingArea.value.trim();


    const words =
        text
            ? text.split(/\s+/).length
            : 0;


    const characters =
        writingArea.value.length;


    const reading =
        words
            ? Math.max(
                1,
                Math.ceil(words / 200)
            )
            : 0;


    const wordCount =
        document.getElementById("wordCount");

    const characterCount =
        document.getElementById("characterCount");

    const readingTime =
        document.getElementById("readingTime");


    if (wordCount)
        wordCount.textContent = words;

    if (characterCount)
        characterCount.textContent = characters;

    if (readingTime)
        readingTime.textContent =
            reading + " min";

}


/* CLEAR WRITING */

const clearWriting =
    document.getElementById("clearWriting");


if (clearWriting) {

    clearWriting.addEventListener("click", () => {

        if (
            confirm(
                "Clear your writing?"
            )
        ) {

            writingArea.value = "";

            saveData("writing", "");

            updateWritingStats();

            updateProgress();

        }

    });

}


/* =========================================================
   EDITING CHECKLIST
   ========================================================= */

const editChecks =
    document.querySelectorAll(".edit-check");


if (editChecks.length) {

    const saved =
        getData(
            "editing",
            []
        );


    editChecks.forEach(
        (checkbox, index) => {

            checkbox.checked =
                saved[index] || false;


            checkbox.addEventListener(
                "change",
                () => {

                    const states =
                        [...editChecks]
                            .map(
                                item =>
                                    item.checked
                            );


                    saveData(
                        "editing",
                        states
                    );


                    updateEditingProgress();

                    updateProgress();

                }
            );

        }
    );


    updateEditingProgress();

}


function updateEditingProgress() {

    const checks =
        document.querySelectorAll(
            ".edit-check"
        );


    if (!checks.length) return;


    const complete =
        [...checks]
            .filter(
                checkbox =>
                    checkbox.checked
            )
            .length;


    const percentage =
        Math.round(
            (complete / checks.length) *
            100
        );


    const progress =
        document.getElementById(
            "editProgress"
        );

    const label =
        document.getElementById(
            "editPercentage"
        );


    if (progress)
        progress.style.width =
            percentage + "%";

    if (label)
        label.textContent =
            percentage + "%";

}


/* =========================================================
   COVER MAKER
   ========================================================= */

const updateCover =
    document.getElementById("updateCover");


if (updateCover) {

    const savedCover =
        getData("cover", null);


    if (savedCover) {

        document.getElementById("coverTitle")
            .value =
            savedCover.title;

        document.getElementById("coverAuthor")
            .value =
            savedCover.author;

        document.getElementById("coverStyle")
            .value =
            savedCover.style;

        renderCover(savedCover);

    }


    updateCover.addEventListener(
        "click",
        () => {

            const cover = {

                title:
                    document.getElementById("coverTitle").value
                    || "YOUR BOOK",

                author:
                    document.getElementById("coverAuthor").value
                    || "Your Name",

                style:
                    document.getElementById("coverStyle").value

            };


            saveData(
                "cover",
                cover
            );

            renderCover(cover);

            updateProgress();

        }
    );

}


function renderCover(cover) {

    const preview =
        document.getElementById(
            "coverPreview"
        );


    if (!preview) return;


    preview.className =
        "generated-cover " +
        cover.style;


    document.getElementById(
        "previewTitle"
    ).textContent =
        cover.title;


    document.getElementById(
        "previewAuthor"
    ).textContent =
        cover.author;

}


/* =========================================================
   PROGRESS
   ========================================================= */

function updateProgress() {

    let completed = 0;

    const total = 8;


    if (getData("idea", null))
        completed++;

    if (getData("character", null))
        completed++;

    if (getData("world", null))
        completed++;

    if (getData("plot", null))
        completed++;

    if (
        getData("writing", "")
            .trim()
            .length > 20
    )
        completed++;

    const editing =
        getData(
            "editing",
            []
        );

    if (
        editing.length &&
        editing.every(Boolean)
    )
        completed++;

    if (getData("cover", null))
        completed++;

    if (getData("published", false))
        completed++;


    const percentage =
        Math.round(
            (completed / total) * 100
        );


    const number =
        document.getElementById(
            "progressNumber"
        );

    const text =
        document.getElementById(
            "progressText"
        );


    if (number)
        number.textContent =
            percentage + "%";


    if (text)
        text.textContent =
            percentage +
            "% Complete";


    const circle =
        document.querySelector(
            ".progress-circle"
        );


    if (circle) {

        circle.style.background =
            `conic-gradient(
                var(--primary)
                ${percentage * 3.6}deg,
                rgba(115,87,255,.1)
                0deg
            )`;

    }

}


updateProgress();


/* =========================================================
   QUIZ
   ========================================================= */

const quizQuestions = [

    {
        question:
            "What usually comes first when creating a book?",

        options: [
            "Designing the back cover",
            "Developing an idea",
            "Publishing the book",
            "Printing hundreds of copies"
        ],

        answer: 1,

        explanation:
            "A book normally begins with an idea that can then be developed."
    },

    {
        question:
            "What gives a character motivation?",

        options: [
            "Their goal",
            "The font of the book",
            "The page number",
            "The cover colour"
        ],

        answer: 0,

        explanation:
            "A character's goals and desires help drive the story."
    },

    {
        question:
            "What is the climax?",

        options: [
            "The title page",
            "The biggest turning point or peak of the story",
            "The author's name",
            "The table of contents"
        ],

        answer: 1,

        explanation:
            "The climax is usually the story's most intense or important turning point."
    },

    {
        question:
            "Why do authors edit their first draft?",

        options: [
            "To make it longer automatically",
            "To improve the story and correct problems",
            "To remove the title",
            "To change every character"
        ],

        answer: 1,

        explanation:
            "Editing helps improve clarity, structure, language and storytelling."
    },

    {
        question:
            "What is one important job of a book cover?",

        options: [
            "Hide the story",
            "Give readers an idea of the book",
            "Replace the ending",
            "Make every book look identical"
        ],

        answer: 1,

        explanation:
            "A cover gives readers an early impression of the book's subject and mood."
    }

];


let currentQuestion = 0;
let quizScore = 0;


const quizOptions =
    document.getElementById(
        "quizOptions"
    );


if (quizOptions) {

    loadQuestion();


    quizOptions.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "button"
                );


            if (!button) return;


            answerQuestion(
                Number(
                    button.dataset.answer
                )
            );

        }
    );

}


function loadQuestion() {

    const question =
        quizQuestions[
            currentQuestion
        ];


    document.getElementById(
        "quizNumber"
    ).textContent =
        `QUESTION ${currentQuestion + 1} / ${quizQuestions.length}`;


    document.getElementById(
        "quizQuestion"
    ).textContent =
        question.question;


    const progress =
        document.getElementById(
            "quizProgress"
        );


    progress.style.width =
        `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;


    quizOptions.innerHTML =
        question.options
            .map(
                (option,index) => `
                    <button data-answer="${index}">
                        ${escapeHTML(option)}
                    </button>
                `
            )
            .join("");


    document.getElementById(
        "quizFeedback"
    ).textContent = "";


    document.getElementById(
        "nextQuestion"
    ).classList.add("hidden");


    document.getElementById(
        "quizScore"
    ).textContent =
        quizScore;

}


function answerQuestion(answer) {

    const question =
        quizQuestions[
            currentQuestion
        ];


    const buttons =
        quizOptions.querySelectorAll(
            "button"
        );


    buttons.forEach(
        button => {

            button.disabled = true;

        }
    );


    buttons[
        question.answer
    ].classList.add(
        "correct"
    );


    if (answer === question.answer) {

        quizScore++;

        document.getElementById(
            "quizScore"
        ).textContent =
            quizScore;


        document.getElementById(
            "quizFeedback"
        ).textContent =
            "✓ Correct! " +
            question.explanation;

    } else {

        buttons[
            answer
        ].classList.add(
            "wrong"
        );


        document.getElementById(
            "quizFeedback"
        ).textContent =
            "Not quite. " +
            question.explanation;

    }


    document.getElementById(
        "nextQuestion"
    ).classList.remove(
        "hidden"
    );

}


const nextQuestion =
    document.getElementById(
        "nextQuestion"
    );


if (nextQuestion) {

    nextQuestion.addEventListener(
        "click",
        () => {

            currentQuestion++;


            if (
                currentQuestion >=
                quizQuestions.length
            ) {

                showQuizFinal();

            } else {

                loadQuestion();

            }

        }
    );

}


function showQuizFinal() {

    document.getElementById(
        "quizContent"
    ).classList.add(
        "hidden"
    );


    document.querySelector(
        ".quiz-final"
    ).classList.remove(
        "hidden"
    );


    document.getElementById(
        "finalScore"
    ).textContent =
        `${quizScore} / ${quizQuestions.length}`;


    let message;


    if (quizScore === 5) {

        message =
            "🏆 Outstanding! You're thinking like an author.";

    } else if (quizScore >= 3) {

        message =
            "✨ Great job! Your author skills are growing.";

    } else {

        message =
            "📖 Keep exploring — every writer is always learning.";

    }


    document.getElementById(
        "finalMessage"
    ).textContent =
        message;

}


const restartQuiz =
    document.getElementById(
        "restartQuiz"
    );


if (restartQuiz) {

    restartQuiz.addEventListener(
        "click",
        () => {

            currentQuestion = 0;

            quizScore = 0;


            document.getElementById(
                "quizContent"
            ).classList.remove(
                "hidden"
            );


            document.querySelector(
                ".quiz-final"
            ).classList.add(
                "hidden"
            );


            loadQuestion();

        }
    );

}


/* =========================================================
   BOOK PREVIEW
   ========================================================= */

if (
    document.getElementById(
        "finalTitle"
    )
) {

    const title =
        getData(
            "bookTitle",
            "YOUR BOOK"
        );


    const cover =
        getData(
            "cover",
            null
        );


    const character =
        getData(
            "character",
            null
        );


    const world =
        getData(
            "world",
            null
        );


    const writing =
        getData(
            "writing",
            ""
        );


    document.getElementById(
        "finalTitle"
    ).textContent =
        cover
            ? cover.title
            : title || "YOUR BOOK";


    document.getElementById(
        "finalAuthor"
    ).textContent =
        cover
            ? cover.author
            : "Your Name";


    document.getElementById(
        "storyHeading"
    ).textContent =
        title || "Your Story";


    document.getElementById(
        "storyText"
    ).textContent =
        writing
            ? writing.slice(0,300) +
              (writing.length > 300
                ? "..."
                : "")
            : "Your writing will appear here once you start writing in the Book Studio.";


    document.getElementById(
        "bookCharacter"
    ).textContent =
        character
            ? character.name
            : "Not created yet";


    document.getElementById(
        "bookWorld"
    ).textContent =
        world
            ? world.place
            : "Not created yet";


    const words =
        writing.trim()
            ? writing.trim()
                .split(/\s+/)
                .length
            : 0;


    document.getElementById(
        "bookWords"
    ).textContent =
        words;


    const chapter =
        document.getElementById(
            "chapterText"
        );


    if (chapter) {

        chapter.innerHTML =
            writing
                ? writing
                    .split(/\n+/)
                    .map(
                        paragraph =>
                            `<p>${escapeHTML(paragraph)}</p>`
                    )
                    .join("")
                : `<p>Your first chapter is waiting to be written.</p>`;

    }

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "bookcraftToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "bookcraftToast";


        toast.style.position =
            "fixed";

        toast.style.bottom =
            "25px";

        toast.style.left =
            "50%";

        toast.style.transform =
            "translateX(-50%) translateY(20px)";

        toast.style.padding =
            "12px 18px";

        toast.style.background =
            "#18162b";

        toast.style.color =
            "white";

        toast.style.borderRadius =
            "50px";

        toast.style.fontSize =
            "11px";

        toast.style.fontWeight =
            "700";

        toast.style.zIndex =
            "9999";

        toast.style.opacity =
            "0";

        toast.style.transition =
            ".3s";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        "✓ " + message;


    requestAnimationFrame(() => {

        toast.style.opacity =
            "1";

        toast.style.transform =
            "translateX(-50%) translateY(0)";

    });


    setTimeout(() => {

        toast.style.opacity =
            "0";

        toast.style.transform =
            "translateX(-50%) translateY(20px)";

    }, 2200);

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}
