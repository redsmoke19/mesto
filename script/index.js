const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const nameInput = document.querySelector('[name=youName]');
const jobInput = document.querySelector('[name=youJob]');
const formElement = document.querySelector('.popup__form');



function openProfilePopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closeProfilePopup() {
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closeProfilePopup();
}

editButton.addEventListener('click', openProfilePopup);
closeButton.addEventListener('click', closeProfilePopup);
formElement.addEventListener('submit', handleProfileFormSubmit);
