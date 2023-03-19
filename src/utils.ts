import * as fs from 'fs';
import path from 'path';

const filePath = 'predictionData.json';
const absolutePath = path.join(__dirname, '..', 'data', filePath);

export function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function readData() {
  try {
    return JSON.parse(fs.readFileSync(absolutePath).toString());
  } catch (error) {
    return {};
  }
}

export function writeData(data: object) {
  return fs.writeFileSync(absolutePath, JSON.stringify(data), { flag: 'a+' });
}

export const sleep = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};
