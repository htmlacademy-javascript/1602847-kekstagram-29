const increaseScaleBtn = document.querySelector('.scale__control--bigger');
const decreaseScaleBtn = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imageNode = document.querySelector('.img-upload__preview > img');

const scaleParams = {
  MIN: 25,
  MAX: 100,
  STEP: 25
};

function getScaleValue() {
  const rawValue = scaleValue.value;
  return parseInt(rawValue.split('%')[0], 10);
}

function increaseScale() {
  let currentScaleValue = getScaleValue();
  if(currentScaleValue < scaleParams.MAX) {
    currentScaleValue = currentScaleValue + scaleParams.STEP;
    scaleValue.value = `${currentScaleValue}%`;
    imageNode.style.transform = `scale(${currentScaleValue / 100})`;
  } else {
    currentScaleValue = scaleParams.MAX;
  }
}

function decreaseScale() {
  let currentScaleValue = getScaleValue();
  if(currentScaleValue > scaleParams.MIN) {
    currentScaleValue = currentScaleValue - scaleParams.STEP;
    scaleValue.value = `${currentScaleValue}%`;
    imageNode.style.transform = `scale(${currentScaleValue / 100})`;
  } else {
    currentScaleValue = scaleParams.MIN;
  }
}

increaseScaleBtn.addEventListener('click', increaseScale);
decreaseScaleBtn.addEventListener('click', decreaseScale);
