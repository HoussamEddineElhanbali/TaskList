"use strict"

const taskInput = document.querySelector(".taskInput");
const addButton = document.querySelector(".add");
const searchInput = document.querySelector(".searchInput");
const clearButton = document.querySelector(".clear");
const popUp = document.querySelector(".popUp");
const popUpYesButton = document.querySelector(".popUpContainer").childNodes[3];
const popUpNoButton = document.querySelector(".popUpContainer").childNodes[5];
const liContainer = document.querySelector(".liContainer");

addButton.addEventListener("click",createLi);

function createLi()
{
    if(taskInput.value === "")
    {
        return;
    }

    let liElement = document.createElement("li");
    liElement.innerHTML  = taskInput.value;

    let buttonElement = document.createElement("button");
    buttonElement.innerHTML = "X";
    buttonElement.addEventListener("click",removeLi);
    
    liElement.appendChild(buttonElement);
    liContainer.appendChild(liElement);

    taskInput.value = "";
}

function removeLi(xButton)
{
    xButton.target.parentElement.remove();
}

clearButton.addEventListener("click",()=>{revealPopUp("block");});

popUpNoButton.addEventListener("click",()=>{revealPopUp("none");});

popUpYesButton.addEventListener("click",removeAllLi);

function removeAllLi()
{
    liContainer.innerHTML = "";
    revealPopUp("none");
}

function revealPopUp(state)
{
    popUp.style.display = state;
}

searchInput.addEventListener("input",searchForWord);

function searchForWord()
{
    liContainer.childNodes.forEach(childLi =>
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