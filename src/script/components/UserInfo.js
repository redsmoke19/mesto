export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.userName);
    this._profileJob = document.querySelector(data.userJob);
    this._profileAvatar = document.querySelector(data.userAvatar);
  }

  getUserInfo() {
    return {userName: this._profileName.textContent, userJob: this._profileJob.textContent, userID: this._userID};
  }

  setUserInfo(userData) {
    this._userID = userData._id;
    this._profileAvatar.src = userData.avatar;
    this._profileName.textContent = userData.name;
    this._profileJob.textContent = userData.about;
  }
}
