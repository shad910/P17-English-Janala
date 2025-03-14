const formBTN = getID("formBTN").addEventListener("click", (event) => {
event.preventDefault();

const inputName = getID("inputName").value;
const inputPassword = getID("inputPassword").value;

console.log(typeof inputName, inputName);
console.log(typeof inputPassword, inputPassword);

if(inputName && inputPassword){
    if(parseInt(inputPassword) === 123456){
        console.log("you can login");
       getID("nav").classList.remove("inactive");
       getID("learnContainer").classList.remove("inactive");
       getID("faqContainer").classList.remove("inactive");
    
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

    getID("nav").classList.add("inactive");
    getID("learnContainer").classList.add("inactive");
    getID("faqContainer").classList.add("inactive");

});