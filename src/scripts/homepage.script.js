import HomepageDOM from "../controller/homepage.controller.js";

console.log(await HomepageDOM.listHabits());
HomepageDOM.createHabit();
HomepageDOM.modalCreateHabit();
HomepageDOM.modalIconProfile();
HomepageDOM.updateProfile();
HomepageDOM.modalCloseProfile();
