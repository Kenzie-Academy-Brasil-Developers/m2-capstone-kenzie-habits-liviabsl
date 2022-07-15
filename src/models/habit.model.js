export default class Habit {
  constructor(
    habit_id,
    habit_title,
    habit_description,
    habit_category,
    habit_status
  ) {
    this.habit_id = habit_id;
    this.habit_title = habit_title;
    this.habit_description = habit_description;
    this.habit_category = habit_category;
    this.habit_status = habit_status;
    this.ul_header = document.querySelector(".habits-container");
  }

  createCard() {
    const li_habit = document.createElement("li");
    const checkbox_container = document.createElement("div");
    const input = document.createElement("input");
    const title_div = document.createElement("div");
    const habit_title = document.createElement("p");
    const description_div = document.createElement("div");
    const habit_description = document.createElement("p");
    const category_div = document.createElement("div");
    const habit_category = document.createElement("span");
    const edit_div = document.createElement("div");
    const habit_edit = document.createElement("span");
    const img = document.createElement("img");

    li_habit.classList.add("list-habit");
    checkbox_container.classList.add("checkbox-container");

    input.type = "checkbox";
    input.classList.add("habit-status");

    title_div.classList.add("title-div");

    habit_title.classList.add("habit-title");
    habit_title.innerText = this.habit_title;

    description_div.classList.add("description-div");

    habit_description.classList.add("habit-description");
    habit_description.innerText = this.habit_description;

    category_div.classList.add("category-div");

    habit_category.classList.add("habit-category");
    habit_category.innerText = this.habit_category;

    edit_div.classList.add("edit-div");
    habit_edit.classList.add("habit-edit");
    habit_edit.id = this.habit_id;

    img.src = "../assets/img/edit-option.png";
    img.alt = this.habit_title;

    if (this.habit_status) {
      input.checked = true;
      li_habit.classList.add("list-habit-checked");
    } else {
      input.checked = false;
      li_habit.classList.remove("list-habit-checked");
    }

    checkbox_container.append(input);
    title_div.append(habit_title);
    description_div.append(habit_description);
    category_div.append(habit_category);
    habit_edit.append(img);
    edit_div.append(habit_edit);
    li_habit.append(
      checkbox_container,
      title_div,
      description_div,
      category_div,
      edit_div
    );

    this.ul_header.append(li_habit);
    return this.ul_header;
  }
}
