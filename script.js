"use strict";

const resultDiv = document.querySelector(".wrapper__list"); //empty div
const btnSearch = document.getElementById("go");
// console.log(btnSearch);
const nameValue = document.querySelector(".name__input"); //value of input
const formRadioBtn = document.querySelector("form");
const radioBtn = document.querySelectorAll(".status");
const selectedDivs = document.querySelectorAll(".selected__info");
const pictureDiv = document.querySelector(".picture");
const btnClose = document.querySelector("btn__close");
const outsideSpace = document.getElementsByTagName("body");

const valueRadioBtn = {
  value: "",
  name: "",
  picture: "",
};

radioBtn.forEach((item) => {
  item.addEventListener("click", () => {
    valueRadioBtn.value = item.value;
    valueRadioBtn.name = item.name;
    valueRadioBtn.picture = item.image;
  });
});

async function getData() {
  const url = `https://rickandmortyapi.com/api/character/?name=${nameValue.value}&status=${valueRadioBtn.value}`;
  let response = await fetch(url);
  let data = await response.json();
  // console.log(data);
  data.results.forEach((el) => {
    resultDiv.innerHTML += `<div class="selected__info" div-picture = "${el.image}" p-name = "${el.name}" div-name = "selected__div"><p div-picture = "${el.image}" p-name = "${el.name}"> name - ${el.name}</p><p div-picture = "${el.image}" > status -  ${el.status}</p></div>`;
  });
}

btnSearch.addEventListener("click", () => {
  getData();
});

let currentSelection = undefined;

resultDiv.addEventListener("click", (e) => {
  valueRadioBtn.name = e.target.getAttribute("p-name");
  valueRadioBtn.picture = e.target.getAttribute("div-picture");
  pictureDiv.classList.add("picture__premium");

  pictureDiv.innerHTML = `<p class="info__picture"> Info </p>
<img class = "img__person" src="${valueRadioBtn.picture}" alt="img__person">
<p class="name__person"> ${valueRadioBtn.name} </p>
<button class="btn__close" onClick="handlerCloseModal(event)">Close</button>`;

  e.stopPropagation();
});

pictureDiv.addEventListener("click", (e) => {
  e.stopPropagation();
});

const handlerCloseModal = (event) => {
  console.log(event);
  pictureDiv.classList.remove("picture__premium");
};

outsideSpace[0].addEventListener("click", (event) => {
  event.stopPropagation();
  pictureDiv.classList.remove("picture__premium");
});
