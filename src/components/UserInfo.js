export class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name);
    this._profileDescription = document.querySelector(data.description);
  }

  getUserInfo = function() {
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    };
    return userInfo;
  }

  setUserInfo = function(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.description;
  }
}
