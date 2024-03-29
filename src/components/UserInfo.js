export class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.name);
    this._profileDescription = document.querySelector(data.description);
    this._profileAvatar = document.querySelector(data.avatar);
    this._profileId = data.id;
  }

  getUserInfo = function() {
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent
    };
    return userInfo;
  }

  setUserInfo = function(data) {
    if(data.name)
      this._profileName.textContent = data.name;
    if(data.description)
      this._profileDescription.textContent = data.description;
    if(data.id)
      this._profileId = data.id;
    if(data.avatar)
      this._profileAvatar.src = data.avatar;
  }

  getUserId = function() {
    return this._profileId;
  }
}
