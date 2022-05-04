import './index.css';
import Section from "../script/components/Section.js";
import Card from "../script/components/Card.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import FormValidator from "../script/components/FormValidator.js";
import UserInfo from "../script/components/UserInfo.js";
import {
  initialPhotos,
  photosList,
  photosPopup,
  formData,
  userInfoData,
  photosAddPopup,
  photosAddOpenButton,
  profileEditButton,
  profileEditPopup,
  profileEditNameInput,
  profileEditJobInput,
  formValidators,
} from "../script/utils/constants.js";

// Создаем экземпляр класса PopupWithImage
const imagePopup = new PopupWithImage(photosPopup);
imagePopup.setEventListeners();

// Функция, которая собирает данные карточек и размещает их в разметке
const renderCards = new Section({
  data: initialPhotos,
  renderer: (item) => {
    addCardContainer(cardCreate(item));
  }
}, photosList);

const addCardContainer = (item) => {
  renderCards.addItem(item);
}

// Функция, которая создает карточку из класса и помещает ее в контейнер
const cardCreate = (data) => {
  const card = new Card(data, '.user-template',
    () => {
      imagePopup.getDataCard(data.name, data.link);
      imagePopup.open();
    });
  return card.createCard();
}

renderCards.renderItems();

// Создаем экземпляр класса попапа формы с добавлением картинки
const imageAddFormPopup = new PopupWithForm(photosAddPopup,
  (data) => {
    const popupImageData = {
      name: data.pictureName,
      link: data.pictureLink
    };
    addCardContainer(cardCreate(popupImageData));
  }
)

imageAddFormPopup.setEventListeners();

// Создаем экземпляр класса карточки UserInfo
const profile = new UserInfo(userInfoData);

const profileEditFormPopup = new PopupWithForm(profileEditPopup,
  (data) => {
    profile.setUserInfo({userName: data.youName, userJob: data.youJob});
  });

profileEditFormPopup.setEventListeners();

const getProfileValues = () => {
  const userInfo = profile.getUserInfo();
  profileEditNameInput.value = userInfo.userName;
  profileEditJobInput.value = userInfo.userJob;
}

profileEditButton.addEventListener('click', () => {
  getProfileValues();
  profileEditFormPopup.open();
  formValidators['changeYouData'].resetValidation();
});

photosAddOpenButton.addEventListener('click', () => {
  imageAddFormPopup.open();
  formValidators['addYouPicture'].resetValidation();
});

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(formData);
