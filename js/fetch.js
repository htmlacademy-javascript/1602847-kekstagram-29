// https://29.javascript.pages.academy/kekstagram/data

const fetchData = () => {
  try {
    fetch('https://29.javascript.pages.academy/kekstagram/data')
      .then((response) => response.json());
  } catch (err) {
    return (err);
  }
};

const sendData = (data) => {
  try {
    fetch('https://29.javascript.pages.academy/kekstagram/data', {method: 'POST', body: data});
  } catch (err) {
    return (err);
  }
};

export {fetchData, sendData};
