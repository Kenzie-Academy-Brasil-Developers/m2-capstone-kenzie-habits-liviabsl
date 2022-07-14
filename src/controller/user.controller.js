export default class UserRequest {
  static url_base = "https://habits-kenzie.herokuapp.com/api/user/profile";

  static token = JSON.parse(localStorage.getItem("@kenzie-habit:token"));

  static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  };

  static async updateProfile(updateProfileData) {
    return await fetch(this.url_base, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(updateProfileData),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}
