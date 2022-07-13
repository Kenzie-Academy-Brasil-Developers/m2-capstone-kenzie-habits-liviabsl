export default class HabitRequest {
  static url_base = "https://habits-kenzie.herokuapp.com/api/habits";

  static token = JSON.parse(localStorage.getItem("@kenzie-habit:token"));

  static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  };

  static async createHabit(habitData) {
    return await fetch(this.url_base, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(habitData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  static async readAllHabits() {
    return await fetch(this.url_base, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  static async readHabitsByCategory(habitCategory) {
    return await fetch(`${this.url_base}/category/${habitCategory}`, {
      method: "GET",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  static async updateHabit(habit_id, updateHabitData) {
    return await fetch(`${this.url_base}/${habit_id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(updateHabitData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  static async completeHabit(habit_id, completeHabitData) {
    return await fetch(`${this.url_base}/complete/${habit_id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(completeHabitData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  static async deleteHabit(habit_id) {
    return await fetch(`${this.url_base}/${habit_id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}
