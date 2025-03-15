const formBTN = getID("formBTN").addEventListener("click", (event) => {
event.preventDefault();

const inputName = getID("inputName").value;
const inputPassword = getID("inputPassword").value;

if(inputName && inputPassword){
    if(parseInt(inputPassword) === 123456){
        removeClass(getID("nav"), "inactive");
        removeClass(getID("learnContainer"), "inactive");
        removeClass(getID("faqContainer"), "inactive");
    }
    else{
        alert("Password is incorrect");
    }
}
else{
    alert("Please fill in the form");
}

});

const logoutBTN = getID("logoutBTN").addEventListener("click", (event) => {
    event.preventDefault();

    addClass(getID("nav"), "inactive");
    addClass(getID("learnContainer"), "inactive");
    addClass(getID("faqContainer"), "inactive");
});

const  logOutBTN = () => {

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
    console.log(category);
    const btn = createElement("button");
    btn.setAttribute("id", `btn-${category.id}`);
    btn.classList.add("category-btn", "btn", "btn-sm", "bg-white", "text-[#422AD5]","border-[#422AD5]", "hover:bg-[#422AD5]", "hover:text-white");
    btn.innerHTML = `<i class="fa-solid fa-book-open text-lg"></i> Lesson - ${category.level_no} `;
    lessonsContainer.appendChild(btn);
   } 
};


loadCategories();
