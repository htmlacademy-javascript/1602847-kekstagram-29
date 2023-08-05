import { loadPhotos, bindFilters } from './pictures.js';
import { showError } from './utils.js';

const fetchData = () => {
  try {
    fetch('https://29.javascript.pages.academy/kekstagram/data')
      .then ((response) => {
        if(response.ok) {
          const data = response.json();
          data.then ((currentData)=>{
            loadPhotos(currentData);
            bindFilters([...currentData]);
          });
          return;
        }
        throw new Error(`${response.status} ${response.statusText}`);
      });
  } catch (err) {
    showError('Возникла ошибка при загрузке фотографий.');
  }
};

const sendData = (data) => {
  fetch('https://29.javascript.pages.academy/kekstagram', {method: 'POST', body: data})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error('Не удалось отправить данные. Попробуйте ещё раз');
    });
};

export {fetchData, sendData};
