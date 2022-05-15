export const initialPhotos = [
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

export const formData = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible',
  formSelector: '.popup__form',
};

export const userInfoData = {
  userName: '.profile__name',
  userJob: '.profile__job',
  userAvatar: '.profile__avatar',
};

export const apiData = {
  groupID: 'cohort-40',
  token: 'cc931293-60ec-41a1-b629-d68b756cf48a',
}
export const formValidators = {};
export const photosList = '.photos__list';
export const photosPopup = document.querySelector('.popup_photo');
export const photosAddPopup = document.querySelector('.popup_add-photos');
export const cardDeletePopup = document.querySelector('.popup_delete-card');
export const photosAddOpenButton = document.querySelector('.profile__add-button');
export const profileEditAvatarPopup = document.querySelector('.popup_update-avatar');
export const profileEditAvatarButton = document.querySelector('.profile__edit-photo');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileEditPopup = document.querySelector('.popup_edit');
export const profileEditNameInput = profileEditPopup.querySelector('[name=youName]');
export const profileEditJobInput = profileEditPopup.querySelector('[name=youJob]');
