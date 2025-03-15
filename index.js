"use strict"

const taskInput = document.querySelector(".taskInput");
const addButton = document.querySelector(".add");
const searchInput = document.querySelector(".searchInput");
const clearButton = document.querySelector(".clear");
const popUp = document.querySelector(".popUp");
const popUpYesButton = document.querySelector(".popUpContainer").childNodes[3];
const popUpNoButton = document.querySelector(".popUpContainer").childNodes[5];
const ulContainer = document.querySelector(".liContainer");

addButton.addEventListener("click",addTask);

taskInput.addEventListener("keydown",(event) => {if(event.key === "Enter"){addTask()}});

function addTask()
{
    let taskText = taskInput.value;

    console.log(taskText);

    createLi(taskText);
    storeLi(taskText);

    taskInput.value = "";
}

function createLi(taskText)
{
    if(taskText === "")
    {
        return;
    }

    let liElement = document.createElement("li");
    liElement.innerHTML  = taskText;

    let buttonElement = document.createElement("button");
    buttonElement.innerHTML = "X";
    buttonElement.addEventListener("click",removeLi);
    
    liElement.appendChild(buttonElement);
    ulContainer.appendChild(liElement);
}

function removeLi(xButton)
{
    xButton.target.parentElement.remove();

    let taskText = xButton.target.parentElement.firstChild.textContent;
    let allTasks = JSON.parse(localStorage.getItem("item"));

    allTasks = allTasks.filter(task => task !== taskText);
    localStorage.setItem("item", JSON.stringify(allTasks));
}

clearButton.addEventListener("click",()=>{revealPopUp("block");});

popUpNoButton.addEventListener("click",()=>{revealPopUp("none");});

popUpYesButton.addEventListener("click",removeAllLi);

function revealPopUp(state)
{
    popUp.style.display = state;
}

function removeAllLi()
{
    ulContainer.innerHTML = "";
    revealPopUp("none");
    clearStorage();
}

searchInput.addEventListener("input",searchForWord);

function searchForWord()
{
    ulContainer.childNodes.forEach(childLi =>
    {
        let searchValue = searchInput.value;
        let liValue = childLi.firstChild.textContent;

        if(liValue.toLowerCase().includes(searchValue.toLowerCase()))
        {
            childLi.style.display = "flex";
        }
        else
        {
            childLi.style.display = "none";
        }
    }
    );
}

function storeLi(task)
{
    let allTasks

    if(localStorage.key("item") === null)
    {
        allTasks = [];
    }
    else
    {
        allTasks = JSON.parse(localStorage.getItem("item"));
    }

    allTasks.push(task);

    localStorage.setItem("item",JSON.stringify(allTasks));
}

function clearStorage()
{
    localStorage.setItem("item","[]");
}

function initiateTaskList()
{
    if(localStorage.key("item") !== null)
    {
        let StoredTasks = JSON.parse(localStorage.getItem("item"));

        StoredTasks.forEach(item => {createLi(item)});
    }
    else
    {
        return;
    }
}

initiateTaskList();