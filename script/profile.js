const name = window.sessionStorage.getItem("name");

const exit = document.querySelector(".main_btn-exit");
const header = document.querySelector(".main_header");

header.innerHTML += `Добро пожаловать ${name}`;

exit.addEventListener("click", (e) => {
  window.sessionStorage.clear();
  location.href = "http://127.0.0.1:5500/docs/";
});
