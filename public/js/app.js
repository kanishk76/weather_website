console.log("Client side javascript file is loaded!");

/*fetch("https://puzzle.mead.io/puzzle")
  .then((response) => response.json())
  .then((data) => console.log(data));*/

async function getData(location) {
  try {
    const response = await fetch(
      "http://localhost:3000/weather?address=" + `${location}`
    );
    const data = await response.text();
    messageOne.textContent = data;
    //console.log(data);
  } catch (err) {
    messageOne.textContent = "address not found";
  }
}

const form = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
//const messageTwo = document.querySelector("#message-2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  //messageTwo.textContent = "";
  const location = input.value;
  getData(location);
});
