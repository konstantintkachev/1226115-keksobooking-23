const avatarPhoto = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const flatPhoto = document.querySelector('#images');
const previewFlatPhoto = document.querySelector('.ad-form__photo');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

avatarPhoto.addEventListener('change', () => {
  const file = avatarPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});

flatPhoto.addEventListener('change', () => {
  const file = flatPhoto.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewFlatPhoto.src = reader.result;
      const newElement = document.createElement('img');
      newElement.setAttribute('src', '#');
      newElement.setAttribute('style', 'width: 70px; height: 70px;');
      newElement.src = reader.result;
      previewFlatPhoto.appendChild(newElement);
    });
    reader.readAsDataURL(file);
  }
});

export {previewAvatar, previewFlatPhoto};
