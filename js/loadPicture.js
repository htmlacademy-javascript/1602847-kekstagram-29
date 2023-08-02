const uploadInput = document.querySelector('#upload-file');
const formPreview = document.querySelector('.img-upload__preview > img');

uploadInput.addEventListener('change', () => {
  formPreview.src = URL.createObjectURL(uploadInput.files[0]);
});
