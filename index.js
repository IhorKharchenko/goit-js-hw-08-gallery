import pictures from "./gallery-items.js";
const galleryRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector(".lightbox");
const modalPictureRef = document.querySelector(".lightbox__image");
const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');

const createList = function (list, pictures) {
    const createGallery = pictures.map((image, index) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const img = document.createElement("img");
        img.classList.add("gallery__image");
        img.setAttribute("data-index", index);
        img.setAttribute("data-source", image.original);
        img.src = image.preview;
        img.alt = image.description;
        a.classList.add("gallery__link");
        a.href = image.original;
        li.classList.add("gallery__item");
        a.append(img);
        li.append(a);
        return li;
    });
    return list.append(...createGallery);
};

createList(galleryRef, pictures);

galleryRef.addEventListener("click", (event) => {
  event.preventDefault();
  const pictureLink = event.target.dataset.source;
  const pictureAlt = event.target.alt;
  const pictureIndex = +event.target.dataset.index;
  if (event.target.nodeName === "UL") {
    return;
    };
  addOpenTag(pictureLink, pictureAlt, pictureIndex);
  modalCloseBtn.addEventListener("click", removeListenerTags);
});

const addOpenTag = function (picLink, picAlt, picIndex) {
    document.body.classList.add("modal-open");
    modalRef.classList.add("is-open");
    modalPictureRef.src = picLink;
    modalPictureRef.alt = picAlt;
    modalPictureRef.dataset.index = picIndex;
};

const removeListenerTags = function() {
  removeOpenTag();
  removeEventListener();
};

 const removeOpenTag = function() {
  document.body.classList.remove("modal-open");
  modalRef.classList.remove("is-open");
  modalPictureRef.src = "";
  modalPictureRef.alt = "";
};

const removeEventListener = function () {
  modalCloseBtn.removeEventListener("click", removeListenerTags);
};