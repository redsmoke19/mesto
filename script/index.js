import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const popups = document.querySelectorAll('.popup')

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_edit');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileEditNameInput = profileEditPopup.querySelector('[name=youName]');
const profileEditJobInput = profileEditPopup.querySelector('[name=youJob]');

const photosAddOpenButton = document.querySelector('.profile__add-button');
const photosAddPopup = document.querySelector('.popup_add-photos');
const photosAddForm = photosAddPopup.querySelector('.popup__form');
const photosAddNameInput = photosAddPopup.querySelector('[name=pictureName]');
const photosAddLinkInput = photosAddPopup.querySelector('[name=pictureLink]');
const photosAddButton = photosAddPopup.querySelector('.popup__submit');

const photosList = document.querySelector('.photos__list');

const initialPhotos = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
};

const closeEscPopup = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const openEditPopup = () => {
  openPopup(profileEditPopup);
  profileEditNameInput.value = nameProfile.textContent;
  profileEditJobInput.value = jobProfile.textContent;
};

const handleEditFormSubmit = (evt) => {
  evt.preventDefault();

  nameProfile.textContent = profileEditNameInput.value;
  jobProfile.textContent = profileEditJobInput.value;
  closePopup(profileEditPopup);
};

const handleAddPhotosFormSubmit = (evt) => {
  evt.preventDefault();

  const photosData = {
    name: photosAddNameInput.value || 'Placeholder',
    link: photosAddLinkInput.value || 'https://sbis.perm.ru/wp-content/uploads/2019/09/placeholder.png',
  }

  const cardElement = new Card(photosData, '.user-template');
  photosList.prepend(cardElement.createCard());
  photosAddNameInput.value = '';
  photosAddLinkInput.value = '';
  photosAddButton.classList.add('popup__submit_disabled');
  photosAddButton.setAttribute('disabled', 'true');
  closePopup(photosAddPopup);
};

const getUploadPhotosCards = (arr) => {
  arr.forEach(item => {
    const cardElement = new Card(item, '.user-template');
    photosList.prepend(cardElement.createCard());
  })
};

profileEditButton.addEventListener('click', openEditPopup);
profileEditForm.addEventListener('submit', handleEditFormSubmit);

photosAddForm.addEventListener('submit', handleAddPhotosFormSubmit);
photosAddOpenButton.addEventListener('click', () => {
  openPopup(photosAddPopup);
});

const getClosePopups = (evt) => {
  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup)
      }
    })
  });
};
getClosePopups();

getUploadPhotosCards(initialPhotos);


const formData = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
};

const popupForms = Array.from(document.querySelectorAll('.popup__form'));
popupForms.forEach((item) => {
  const formValidate = new FormValidator(formData, item);
  formValidate.enableValidation();
})

export {openPopup};
