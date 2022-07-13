import LoginResquest from "./login.controller.js";

export default class LoginDOM {
  static getLogin() {
    const botaoEntrar = document.querySelector(".btn_getIn");
    const inputsLogin = document.querySelectorAll(".inputLogin");
    const spansLogin = document.querySelectorAll(".spanError");

    botaoEntrar.addEventListener("click", async (e) => {
      e.preventDefault();
      const data = {};
      const inputs = [...e.srcElement.form];
      inputs.forEach((input) => {
        if (input.value !== "") {
          data[input.name] = input.value;
        }
      });
      await LoginResquest.loginUser(data);

      const userToken = JSON.parse(localStorage.getItem("@kenzie-habit:token"));
      if (userToken !== null) {
        window.location.href = "./src/views/homepage.index.html";
      } else {
        if (inputs[0].value == "") {
          inputsLogin[0].classList.add("inputError");
          spansLogin[0].classList.remove("none");
        } else {
          inputsLogin[0].classList.remove("inputError");
          spansLogin[0].classList.add("none");
        }
        if (inputs[1].value == "") {
          inputsLogin[1].classList.add("inputError");
          spansLogin[1].classList.remove("none");
        } else {
          inputsLogin[1].classList.remove("inputError");
          spansLogin[1].classList.add("none");
        }
      }
    });
  }
}
