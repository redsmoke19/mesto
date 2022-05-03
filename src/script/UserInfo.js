export default class UserInfo {
  constructor(data) {
    this._profileName = document.querySelector(data.userName);
    this._profileJob = document.querySelector(data.userJob);
  }
  getUserInfo() {
    return {userName: this._profileName.textContent, userJob: this._profileJob.textContent};
  }
  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.userName;
    this._profileJob.textContent = userInfo.userJob;
  }

}
