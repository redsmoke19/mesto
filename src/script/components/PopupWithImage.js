import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photosPopupImage = this._popupSelector.querySelector('.popup__image');
    this._photosPopupCaption = this._popupSelector.querySelector('.popup__image-caption');
  }

  getDataCard(photoCaption, photoImage) {
    this._photoCaption = photoCaption;
    this._photoImage = photoImage;
  }

  open() {
    this._photosPopupImage.src = this._photoImage;
    this._photosPopupImage.alt = this._photoCaption;
    this._photosPopupCaption.textContent = this._photoCaption;

    super.open()
  }
}
