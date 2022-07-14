export default class LoginResquest {
  static url_base = "https://habits-kenzie.herokuapp.com/api/userLogin";
  static headers = { "Content-Type": "application/json" };
  static async loginUser(loginUserData) {
    return await fetch(this.url_base, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(loginUserData),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((res) => {
        localStorage.setItem(
          "@kenzie-habit:response",
          JSON.stringify(res.response)
        );
        localStorage.setItem("@kenzie-habit:token", JSON.stringify(res.token));
        return res;
      })
      .catch((err) => console.log(err));
  }
}
