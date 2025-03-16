const getID = (id) => document.getElementById(id);
const getCLASS = (className) => document.getElementsByClassName(className);
const createElement = (element) => document.createElement(element);

const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);


const hide = (id) => {
    document.getElementById(id).style.display ="none"; 
}

const show = (id) => {
    document.getElementById(id).style.display ="block"; 
}