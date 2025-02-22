"use strict"

const taskInput = document.querySelector(".taskInput");
const addButton = document.querySelector(".add");
const searchInput = document.querySelector(".searchInput");
const clearButton = document.querySelector(".clear");
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
    
    liElement.appendChild(buttonElement);
    liContainer.appendChild(liElement);

    taskInput.value = "";
}