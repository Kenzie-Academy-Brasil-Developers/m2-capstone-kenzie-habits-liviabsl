import LoginResquest from "./login.controller.js";

console.log(
  await LoginResquest.loginUser({
    email: "grupo4Mia@mail.com",
    password: "44d4465130a1c5e563057c3c4c8b88da",
  })
);
