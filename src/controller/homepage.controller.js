import Habit from "../models/habit.model.js";
import HabitRequest from "./habit.controller.js";
import UserRequest from "./user.controller.js";

export default class HomepageDOM {
  static profileData() {
    const headerContainer = document.querySelector(".header-container");
    const userSection = document.querySelector(".user-section");
    const editIconProfile = document.querySelector(
      ".container_editIconProfile"
    );
    const btnEditHabit = document.querySelectorAll(".habit-edit");
    const editHabit = document.querySelector("#container_editHabit");
    const userIconHeader = document.createElement("img");
    const userIconSection = document.createElement("img");
    const userNameSection = document.createElement("p");

    const userData = JSON.parse(localStorage.getItem("@kenzie-habit:response"));

    userIconHeader.src = `${userData.usr_image}`;
    userIconSection.src = `${userData.usr_image}`;
    userNameSection.innerText = `${userData.usr_name}`;

    userIconHeader.addEventListener("click", () => {
      editIconProfile.classList.toggle("none");
    });

    btnEditHabit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        editHabit.classList.remove("none");
        this.editHabit(btn.id);
        this.modalCloseEditHabit();
      });
    });

    headerContainer.append(userIconHeader);
    userSection.append(userIconSection, userNameSection);
  }

  static async listHabits() {
    const habits = await HabitRequest.readAllHabits();

    return habits.forEach((obj) => {
      const habit = new Habit(
        obj.habit_id,
        obj.habit_title,
        obj.habit_description,
        obj.habit_category,
        obj.habit_status
      );
      habit.createCard();
    });
  }

  static createHabit() {
    const buttonInsert = document.querySelector(".buttonInsert");
    const spans = document.querySelectorAll(".spanError");

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
        data[inputs[2].name] = inputs[2].value
          .split(" ")[1]
          .toLocaleLowerCase();
      }
      await HabitRequest.createHabit(data);

      if (
        inputs[0].value != "" &&
        inputs[1].value != "" &&
        inputs[2].value != "Selecione Categoria"
      ) {
        window.location.reload();
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
    this.modalCloseCreateHabit();
  }

  static modalCloseCreateHabit() {
    const buttonClose = document.querySelector(".closeCreateHabit");
    const modal = document.querySelector(".containerModalCreateHabit");
    const buttonCreate = document.querySelector("#button-createHabit");

    buttonCreate.addEventListener("click", () => {
      modal.classList.remove("none");
    });
    buttonClose.addEventListener("click", () => {
      modal.classList.add("none");
    });
  }

  static modalIconProfile() {
    const buttonIcon = document.querySelector("#btn_editIconProfile");
    const buttonLogout = document.querySelector("#btn_editProfile");
    const containerIconProfile = document.querySelector(
      ".container_editIconProfile"
    );
    const containerEditProfile = document.querySelector(
      ".container_editProfile"
    );
    buttonIcon.addEventListener("click", () => {
      containerIconProfile.classList.add("none");
      containerEditProfile.classList.remove("none");
    });
    buttonLogout.addEventListener("click", () => {
      localStorage.removeItem("@kenzie-habit:token");
      localStorage.removeItem("@kenzie-habit:response");
      window.location.href = "/index.html";
    });
  }

  static updateProfile() {
    const buttonEdit = document.querySelector(".btn_editProfile");
    const spans = document.querySelectorAll(".spanError");

    buttonEdit.addEventListener("click", async (e) => {
      e.preventDefault();
      const data = {};
      const inputs = [...e.srcElement.form];
      inputs.forEach((input) => {
        if (input.value !== "") {
          data[input.name] = input.value;
        }
      });
      const response = await UserRequest.updateProfile(data);

      localStorage.removeItem("@kenzie-habit:response");
      localStorage.setItem(
        "@kenzie-habit:response",
        JSON.stringify({ ...response })
      );

      if (inputs[0].value !== "" || inputs[1].value !== "") {
        window.location.reload();
      } else {
        spans.forEach((span) => {
          span.classList.remove("none");
        });
        inputs[0].classList.add("inputError");
        inputs[1].classList.add("inputError");
      }
    });
    this.modalCloseProfile();
  }

  static modalCloseProfile() {
    const btn = document.querySelector(".closeEditProfile");
    const container = document.querySelector(".container_editProfile");

    btn.addEventListener("click", () => {
      container.classList.add("none");
    });
  }

  static async editHabit(habit_id) {
    const habit = await HabitRequest.readAllHabits();
    const habitFind = habit.find(({ habit_id }) => habit_id);
    const buttonInsert = document.querySelector(".buttonEditProfileInsert");

    const inputTitle = document.querySelector(".titleInput");
    const inputDescription = document.querySelector(".descriptionInput");
    const inputCategory = document.querySelector(".habit_category");
    buttonInsert.addEventListener("click", (e) => e.preventDefault());
    this.deleteHabit(habit_id);
  }

  static modalCloseEditHabit() {
    const btnClose = document.querySelector("#closeEditHabit");
    const editHabit = document.querySelector("#container_editHabit");
    const btnDelete = document.querySelector(".buttonEditProfileDelete");
    const deleteHabit = document.querySelector(".container_deleteHabit");

    btnClose.addEventListener("click", () => {
      editHabit.classList.add("none");
    });

    btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      editHabit.classList.add("none");
      deleteHabit.classList.remove("none");
    });
  }

  static deleteHabit(habit_id) {
    const btnDelete = document.querySelector(".buttonDelete");
    const btnCancel = document.querySelector(".buttonCancel");
    const deleteHabit = document.querySelector(".container_deleteHabit");
    const editHabit = document.querySelector("#container_editHabit");

    btnDelete.addEventListener("click", async (e) => {
      e.preventDefault();
      await HabitRequest.deleteHabit(habit_id);
      window.location.reload();
    });

    btnCancel.addEventListener("click", (e) => {
      e.preventDefault();
      editHabit.classList.remove("none");
      deleteHabit.classList.add("none");
    });
    this.modalCoseDeleteHabit();
  }
  static modalCoseDeleteHabit() {
    const modalClose = document.querySelector(".modalCloseDelete");
    const deleteHabit = document.querySelector(".container_deleteHabit");

    modalClose.addEventListener("click", () => {
      deleteHabit.classList.add("none");
    });
  }
}
