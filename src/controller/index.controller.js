import LoginResquest from "./teste.js";

export default class LoginDOM {
  static getLogin() {
    const botaoEntrar = document.querySelector(".btn_entrar");

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
        window.location.href = "./src/views/modalEditarPerfil.temp.html";
      }
    });
  }
}

LoginDOM.getLogin();
