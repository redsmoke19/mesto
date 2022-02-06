let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
let nameInput = document.querySelector('[name=youName]');
let jobInput = document.querySelector('[name=youJob]');
let formElement = document.querySelector('.popup__form');

nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;

function getOpenPopup() {
  popup.classList.add('popup_opened');
}

function getClosePopup() {
  popup.classList.remove('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  getClosePopup();
}

editButton.addEventListener('click', getOpenPopup);
closeButton.addEventListener('click', getClosePopup);
formElement.addEventListener('submit', formSubmitHandler);
