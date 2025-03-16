
const formBTN = getID("formBTN").addEventListener("click", (event) => {
    event.preventDefault();

    const inputName = getID("inputName").value;
    const inputPassword = getID("inputPassword").value;

    if (inputName && inputPassword) {
        if (parseInt(inputPassword) === 123456) {
            removeClass(getID("nav"), "inactive");
            removeClass(getID("learnContainer"), "inactive");
            removeClass(getID("faqContainer"), "inactive");
        }
        else {
            alert("Password is incorrect");
        }
    }
    else {
        alert("Please fill in the form");
    }

});

const logoutBTN = getID("logoutBTN").addEventListener("click", (event) => {
    event.preventDefault();

    addClass(getID("nav"), "inactive");
    addClass(getID("learnContainer"), "inactive");
    addClass(getID("faqContainer"), "inactive");
});

const logOutBTN = () => {

    addClass(getID("nav"), "inactive");
    addClass(getID("learnContainer"), "inactive");
    addClass(getID("faqContainer"), "inactive");
};

const loadCategories = () => {

    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(data => displayCategories(data.data));

};

const displayCategories = (categories) => {

    const lessonsContainer = getID("lessonsContainer");

    for (const category of categories) {

        const btn = createElement("button");
        btn.setAttribute("id", `btn-${category.id}`);
        btn.onclick = () => loadLevels(category.level_no);
        btn.classList.add("category-btn", "btn", "btn-sm", "bg-white", "text-[#422AD5]", "border-[#422AD5]", "hover:bg-[#422AD5]", "hover:text-white");
        btn.innerHTML = `<i class="fa-solid fa-book-open text-lg"></i> Lesson - ${category.level_no} `;
        lessonsContainer.appendChild(btn);



    }

};


const loadLevels = (level) => {
    url = `https://openapi.programming-hero.com/api/level/${level}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayLevels(data.data));

}

const displayLevels = (object) => {
    const lessonCard = getID("lessonCard");
    lessonCard.innerHTML = ""

    // There is no lesson Section
    if (object.length == 0) {
        lessonCard.innerHTML = `
        <div class="col-span-full">
            <div class="space-y-3 p-2 text-center">
              <div class="flex justify-center">
                <img src="./images/alert-error.png" alt="alert-error">
              </div>
              <p class="hind-siliguri text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
              <h2 class="hind-siliguri text-3xl font-medium">নেক্সট Lesson এ যান</h2>
            </div>
          </div>
        `;
        return;
    };
    for (const element of object) {

        const div = createElement("div");
        div.innerHTML = `
        <div class="card bg-[#FFFFFF] rounded-3xl shadow-sm py-7 px-7">

            <div class="text-center space-y-4">
              <h3 class="text-2xl font-bold">${element.word}</h3>
              <p class="text-base font-medium">Meaning /Pronounciation</p>
              <h3 class="hind-siliguri text-2xl font-semibold">${element.meaning}</h3>
            </div>

            <div class="flex justify-between items-center">
              <button onclick="lessonDetails()" class="btn btn-sm bg-[#1a91ff1a]">
                <i class="fa-solid fa-circle-info"></i>
              </button>
              <button onclick="" class="btn btn-sm bg-[#1a91ff1a]">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>

        `;

        lessonCard.append(div);

        const lessonDetails = () =>{

            
        };
    }
};

loadCategories();
