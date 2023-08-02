import {generateUniqueID, generateImageData} from './data.js';
import './pictures.js';

const generateImageId = generateUniqueID({min: 0, max: 25});
const generateUrlId = generateUniqueID({min: 0, max: 25});

const data = [];
for(let i = 0; i < 25; i++){
  data.push(generateImageData(generateImageId(), generateUrlId()));
}
