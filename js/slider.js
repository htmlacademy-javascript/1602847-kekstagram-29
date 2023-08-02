const slider = document.querySelector('.effect-level__slider');
const effectInput = document.querySelector('.effect-level__value');
const imageNode = document.querySelector('.img-upload__preview > img');
const activeEffects = document.querySelectorAll('.effects__radio');
const sliderParent = document.querySelector('.img-upload__effect-level');

const effects = {
  grayscale: {
    filter: 'grayscale',
    dimension: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia: {
    filter: 'sepia',
    dimension: '',
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  invert: {
    filter: 'invert',
    dimension: '%',
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  blur: {
    filter: 'blur',
    dimension: 'px',
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  brightness: {
    filter: 'brightness',
    dimension: '',
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  }
};

function resetParams() {
  sliderParent.classList.add('hidden');
  imageNode.removeAttribute('style');
}

noUiSlider.create(slider, {
  start: 10,
  connect: true,
  range: {
    'min': 10,
    'max': 50
  }
});


activeEffects.forEach((effect) => {
  effect.addEventListener('change', () => {
    sliderParent.classList.remove('hidden');
    switch (effect.value) {
      case 'chrome':
        effect = effects.grayscale;
        break;
      case 'sepia':
        effect = effects.sepia;
        break;
      case 'marvin':
        effect = effects.invert;
        break;
      case 'phobos':
        effect = effects.blur;
        break;
      case 'heat':
        effect = effects.brightness;
        break;
      case 'none':
        resetParams();
    }
    try {
      slider.noUiSlider.updateOptions ({
        range: effect.range,
        start: effect.start,
        step: effect.step,
      });
      slider.noUiSlider.on('update',() => {
        effectInput.value = slider.noUiSlider.get();
        imageNode.style.filter = `${effect.filter}(${effectInput.value}${effect.dimension})`;
      });
    } catch {
      imageNode.removeAttribute('style');
    }

  });
});
