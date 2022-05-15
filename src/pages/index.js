import './index.css';
import Section from "../script/components/Section.js";
import Card from "../script/components/Card.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import PopupWithConfirm from "../script/components/popupWhitConfirm.js";
import FormValidator from "../script/components/FormValidator.js";
import UserInfo from "../script/components/UserInfo.js";
import Api from "../script/components/Api.js";
import {
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
  profileEditAvatarPopup,
  profileEditAvatarButton,
  formValidators,
  cardDeletePopup,
  apiData,
} from "../script/utils/constants.js";

const api = new Api({
  url: `https://mesto.nomoreparties.co/v1/${apiData.groupID}`,
  headers: {
    authorization: apiData.token,
    'Content-Type': 'application/json'
  }
});

// Создаем экземпляр класса PopupWithImage
const imagePopup = new PopupWithImage(photosPopup);
imagePopup.setEventListeners();

// Функция, которая собирает данные карточек и размещает их в разметке
const renderCards = new Section({
  renderer: (item) => {
    addCardContainer(cardCreate(item));
  }
}, photosList);

const addCardContainer = (item) => {
  renderCards.addItem(item);
};

// Функция, которая создает карточку из класса и помещает ее в контейнер
const cardCreate = (data) => {
  const userID = profile.getUserInfo().userID;
  const card = new Card(data, userID,
    '.user-template',
    () => {
      imagePopup.getDataCard(data.name, data.link);
      imagePopup.open();
    },
    () => {
      if (card.isLiked()) {
        api.getCardDeleteLike(data._id)
          .then((res) => {
            card.getLikesReload(res.likes.length);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}!`);
          })
      } else {
        api.setCardLike(data._id)
          .then((res) => {
            card.getLikesReload(res.likes.length);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}!`);
          })
      }
    },
    (cardElement, cardID) => {
      cardDeleteFormPopup.getDeletedCardData(cardElement, cardID);
      cardDeleteFormPopup.open();
    }
  );
  return card.createCard();
};

// Создаем экземпляр класса попапа формы с добавлением картинки
const imageAddFormPopup = new PopupWithForm(photosAddPopup,
  (data) => {
    return api.setCard(data)
      .then((res) => {
        addCardContainer(cardCreate(res));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}!`)
      });
  }
);

imageAddFormPopup.setEventListeners();

// Создаем экземпляр класса попапа с редактированием аватара
const avatarUpdateFormPopup = new PopupWithForm(profileEditAvatarPopup,
  (data) => {
    return api.getUpdateAvatar(data)
      .then((res) => {
        profile.setUserInfo(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}!`)
      });
  }
);

avatarUpdateFormPopup.setEventListeners();

// Создаем экземпляр класса попапа удаления карточки
const cardDeleteFormPopup = new PopupWithConfirm(cardDeletePopup,
  (cardID) => {
    api.getRemoveCard(cardID)
      .then((res) => {
        cardDeleteFormPopup.getDeleteCard();
        // cardDeleteFormPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}!`)
      });
  }
);

cardDeleteFormPopup.setEventListeners();

// Создаем экземпляр класса карточки UserInfo
const profile = new UserInfo(userInfoData);

const profileEditFormPopup = new PopupWithForm(profileEditPopup,
  (data) => {
    return api.setUserInfo(data)
      .then((res) => {
        profile.setUserInfo(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}!`)
      });
  }
);

profileEditFormPopup.setEventListeners();

const getProfileValues = () => {
  const userInfo = profile.getUserInfo();
  profileEditNameInput.value = userInfo.userName;
  profileEditJobInput.value = userInfo.userJob;
};

profileEditButton.addEventListener('click', () => {
  getProfileValues();
  profileEditFormPopup.open();
  formValidators['changeYouData'].resetValidation();
});

photosAddOpenButton.addEventListener('click', () => {
  imageAddFormPopup.open();
  formValidators['addYouPicture'].resetValidation();
});

profileEditAvatarButton.addEventListener('click', () => {
  avatarUpdateFormPopup.open();
  formValidators['updateAvatar'].resetValidation();
});

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formData);

const userCardInfo = api.getUserData();
const cardListData = api.getInitialCards();

Promise.all([userCardInfo, cardListData])
  .then (([userData, cardsData]) => {
    profile.setUserInfo(userData);
    renderCards.renderItems(cardsData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}!`)
  });
