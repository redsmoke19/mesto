const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_edit');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileEditCloseButton = profileEditPopup.querySelector('.popup__close_edit');
const profileEditNameInput = profileEditPopup.querySelector('[name=youName]');
const profileEditJobInput = profileEditPopup.querySelector('[name=youJob]');

const photosAddOpenButton = document.querySelector('.profile__add-button');
const photosAddPopup = document.querySelector('.popup_add-photos');
const photosAddCloseButton = photosAddPopup.querySelector('.popup__close');
const photosAddForm = photosAddPopup.querySelector('.popup__form');
const photosAddNameInput = photosAddPopup.querySelector('[name=pictureName]');
const photosAddLinkInput = photosAddPopup.querySelector('[name=pictureLink]');

const photosList = document.querySelector('.photos__list');
const photosTemplate = document.querySelector('.user-template').content;

const photosPopup = document.querySelector('.popup_photo');
const photosPopupImage = photosPopup.querySelector('.popup__image');
const photosPopupCaption = photosPopup.querySelector('.popup__image-caption');
const photosPopupClose = photosPopup.querySelector('.popup__close');

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
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

const openEditPopup = () => {
  openPopup(profileEditPopup);
  profileEditNameInput.value = nameProfile.textContent;
  profileEditJobInput.value = jobProfile.textContent;
};

const openPhotoPopup = (item) => {
  photosPopupImage.src = item.link;
  photosPopupImage.alt = item.name;
  photosPopupCaption.textContent = item.name;
}

const handleLikePhoto = (item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('photos__like_active');
  });
};

const handleDeletePhoto = (item) => {
  item.addEventListener('click', () => {
    item.parentElement.remove();
  });
};

const getCreateElement = (item) => {
  const photosElement = photosTemplate.querySelector('.photos__item').cloneNode(true);
  const photosImage = photosElement.querySelector('.photos__img');
  const photosTitle = photosElement.querySelector('.photos__title');
  const photosLikeButton = photosElement.querySelector('.photos__like');
  const photosDeleteButton = photosElement.querySelector('.photos__delete');
  photosImage.src = item.link;
  photosImage.alt = item.name;
  photosTitle.textContent = item.name;
  handleLikePhoto(photosLikeButton);
  handleDeletePhoto(photosDeleteButton);
  photosImage.addEventListener('click', () => {
    openPhotoPopup(item);
    openPopup(photosPopup);
  })
  photosList.prepend(photosElement);
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

  getCreateElement(photosData);
  photosAddNameInput.value = '';
  photosAddLinkInput.value = '';
  closePopup(photosAddPopup);
};

const getUploadPhotosCards = (arr) => {
  arr.forEach(item => {
    getCreateElement(item);
  })
};

profileEditButton.addEventListener('click', openEditPopup);
profileEditForm.addEventListener('submit', handleEditFormSubmit);
profileEditCloseButton.addEventListener('click', () => {
  closePopup(profileEditPopup);
});

photosAddForm.addEventListener('submit', handleAddPhotosFormSubmit);
photosAddOpenButton.addEventListener('click', () => {
  openPopup(photosAddPopup);
});
photosAddCloseButton.addEventListener('click', () => {
  closePopup(photosAddPopup);
});

photosPopupClose.addEventListener('click', () => {
  closePopup(photosPopup);
});

getUploadPhotosCards(initialPhotos);
