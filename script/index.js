const removeActiveClass = () => {
    const categoryBtns = getCLASS("active");
      for (const btn of categoryBtns) {
          btn.classList.remove("active");
      }
  };



const formBTN = getID("formBTN").addEventListener("click", (event) => {
    event.preventDefault();

    const inputName = getID("inputName").value;
    const inputPassword = getID("inputPassword").value;

    if (inputName && inputPassword) {
        if (parseInt(inputPassword) === 123456) {
            Swal.fire({
                title: "Login successful.",
                icon: "success",
              });
            removeClass(getID("nav"), "inactive");
            removeClass(getID("learnContainer"), "inactive");
            removeClass(getID("faqContainer"), "inactive");
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Warning!!!",
                text: "Invalid name or password. Please try again.",
              });
        }
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Warning!!!",
            text: "Please fill up the form correctly.",
          });
    }

});

const logoutBTN = getID("logoutBTN").addEventListener("click", (event) => {
    event.preventDefault();

    Swal.fire({
        title: "Are you sure?",
        text: "Please confirm your action.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Logout"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });

          addClass(getID("nav"), "inactive");
          addClass(getID("learnContainer"), "inactive");
          addClass(getID("faqContainer"), "inactive");

        }
      });

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
        btn.setAttribute("id", `${category.id}`);
        btn.onclick = () =>(loadLevels(category.level_no), loadWordDetails(category.level_no));
        btn.classList.add("category-btn", "btn", "btn-sm", "bg-white", "text-[#422AD5]", "border-[#422AD5]", "hover:bg-[#422AD5]", "hover:text-white");
        btn.innerHTML = `<i class="fa-solid fa-book-open text-lg"></i> Lesson - ${category.level_no} `;
        lessonsContainer.appendChild(btn);

        btn.addEventListener("click", ()=>{
            removeActiveClass();
            let clickedBtn = getID(`${category.id}`);
            clickedBtn.classList.add("active");
        })
    }
};

hide("spinner");

const loadLevels = (level) => {
    let urlLevel = `https://openapi.programming-hero.com/api/level/${level}`;

    fetch(urlLevel)
        .then(response => response.json())
        .then(data => displayLevels(data.data));

}


const loadWordDetails = async(word) =>{
    let urlWD = `https://openapi.programming-hero.com/api/word/${word}`;
    const response = await fetch(urlWD);
    const data = await response.json();
    return data.data;
}


const displayLevels = async(object) => {

    const lessonCard = getID("lessonCard");
    lessonCard.innerHTML = "";

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

        const add = await loadWordDetails(`${element.id}`);
        let Array = `${add.synonyms}`
        console.log(Array);
         
        

        // if (Array.length !== 3){
        //     console.log("yes")
        // }else{
        //     console.log("no");
            
        // }
        

        const div = createElement("div");
        div.innerHTML = `
        <div class="card bg-[#FFFFFF] rounded-3xl shadow-sm py-7 px-7">

            <div class="text-center space-y-4">
              <h3 class="text-2xl font-bold">${element.word}</h3>
              <p class="text-base font-medium">Meaning /Pronounciation</p>
              <h3 class="hind-siliguri text-2xl font-semibold">${element.meaning}</h3>
            </div>

            <div class="flex justify-between items-center">


        <section>

          <button class="btn bg-[#1a91ff1a]" onclick=my_modal_${element.id}.showModal()>
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <dialog id="my_modal_${element.id}" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">

              <p class="text-2xl font-semibold mb-5">
                ${element.word} (<i class="fa-solid fa-microphone-lines"></i> : ${element.pronunciation})
              </p>
              <div class="space-y-1 mb-5">
                <h3 class="font-semibold">Meaning</h3>
                <h3 class="font-medium">${element.meaning}</h3>
              </div>
              <div class="space-y-1 mb-5">
                <p class="font-semibold">Example</p>
                <p class="text-[#000000]">${add.sentence}</p>
              </div>

              <div class="space-y-2">
                <h3 class="font-medium">সমার্থক শব্দ গুলো</h3>
                <div class="flex gap-2">
                  <p class="px-2 py-1 rounded-md tex-xs bg-[#D7E4EF]">
                  ${add.synonyms[0]}
                  </p>
                  <p class="px-2 py-1 rounded-md tex-xs bg-[#D7E4EF]">
                  ${add.synonyms[1]}
                  </p>
                  <p class="px-2 py-1 rounded-md tex-xs bg-[#D7E4EF]">${add.synonyms[2]?add.synonyms[2]:undefined};
                  </p>
                </div>
              </div>

              <div class="modal-action flex justify-start">
                <form method="dialog">
                  <button class="btn bg-[#422AD5] text-white hover:bg-white hover:border-[#422AD5] hover:text-[#422AD5]">Complete Learning</button>
                </form>
              </div>

            </div>
          </dialog>
        </section>


              <button onclick="" class="btn btn-sm bg-[#1a91ff1a]">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>

        `;

        lessonCard.append(div);

    }
};



loadCategories();
