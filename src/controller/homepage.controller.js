import HabitRequest from "./habit.controller.js";
import UserRequest from "./user.controller.js";
export default class HomepageDOM {
  static createHabit() {
    const buttonInsert = document.querySelector(".buttonInsert");
    const spans = document.querySelectorAll(".spanError");
    const modal = document.querySelector(".containerModalCreateHabit");

    buttonInsert.addEventListener("click", async (e) => {
      e.preventDefault();
      const inputs = [...e.srcElement.form];

      const data = {};

      if (
        inputs[0].value != "" &&
        inputs[1].value != "" &&
        inputs[2].value != "Selecione Categoria"
      ) {
        data[inputs[0].name] = inputs[0].value;
        data[inputs[1].name] = inputs[1].value;
        data[inputs[2].name] = inputs[2].value.split(" ")[1];
      }
      await HabitRequest.createHabit(data);

      if (
        inputs[0].value != "" &&
        inputs[1].value != "" &&
        inputs[2].value != "Selecione Categoria"
      ) {
        modal.classList.add("none");
      } else {
        if (inputs[0].value == "") {
          inputs[0].classList.add("inputError");
          spans[0].classList.remove("none");
        } else {
          inputs[0].classList.remove("inputError");
          spans[0].classList.add("none");
        }
        if (inputs[1].value == "") {
          inputs[1].classList.add("inputError");
          spans[1].classList.remove("none");
        } else {
          inputs[1].classList.remove("inputError");
          spans[1].classList.add("none");
        }
        if (inputs[2].value == "Selecione Categoria") {
          inputs[2].classList.add("inputError");
          spans[2].classList.remove("none");
        } else {
          inputs[2].classList.remove("inputError");
          spans[2].classList.add("none");
        }
      }
    });
  }
  static modalClose() {
    const buttonClose = document.querySelector(".close");
    const modal = document.querySelector(".containerModalCreateHabit");
    buttonClose.addEventListener("click", () => {
      modal.classList.add("none");
    });
  }

  static modalIconProfile() {
    const buttonIcon = document.querySelectorAll(".btn_iconProfile");
    const container = document.querySelectorAll(".container_editProfile");
    buttonIcon[0].addEventListener(() => {
      container[0].classList.add("none");
      container[1].classList.remove("none");
    });
    buttonIcon[1].addEventListener(() => {
      localStorage.removeItem("@kenzie-habit:token");
      localStorage.removeItem("@kenzie-habit:response");
      window.location.href = ".../index.html";
    });
  }

  static updateProfile() {
    const buttonEdit = document.querySelector(".btn_editProfile");
    const container = document.querySelectorAll(".container_editProfile")[1];
    const spans = document.querySelectorAll(".spanError");

    buttonEdit.addEventListener(async (e) => {
      e.preventDefault();
      const data = {};
      const inputs = [...e.srcElement.form];
      inputs.forEach((input) => {
        if (input.value !== "") {
          data[input.name] = input.value;
        }
      });

      await UserRequest.updateProfile(data);

      if (inputs[0].value !== "" && inputs[1].value !== "") {
        container.classList.add("none");
      } else {
        spans.forEach((span) => {
          span.classList.remove("none");
        });
        inputs[0].classList.add("inputError");
        inputs[1].classList.add("inputError");
      }
    });
  }

  static modalCloseProfile() {
    const btn = document.querySelector(".closeEditProfile");
    const container = document.querySelectorAll(".container_editProfile")[1];

    btn.addEventListener("click", () => {
      container.classList.add("none");
    });
  }
}
