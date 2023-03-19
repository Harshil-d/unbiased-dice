import * as fs from 'fs';
import path from 'path';

const filePath = 'predictionData.json';
const absolutePath = path.join(__dirname, '..', 'data', filePath);

// Way Number One - simple one
if (typeof window !== 'undefined') {
  var random = window.crypto && window.crypto.getRandomValues.bind(crypto);
}

export function getRandom(range) {
  var nb;
  if (random) {
    const array = new Uint32Array(10);
    random(array);
    nb = array[0];
  } else {
    nb = (Math.random() * 0x100000000) | 0;
  }
  return Math.abs(nb % range) + 1;
}

// Way Number Two - bit complex one
export function getRandomArbitrary(min, max, data) {
  const shouldProb = 1 / (max - min + 1);
  const probability = calculateProbability(data.occurrence, data.data.length);
  let newProb = Object.keys(probability)
    .sort((a, b) => +a - +b)
    .map((p) => {
      const value = shouldProb + (shouldProb - probability[p]);
      return value < 0 ? 0 : value;
    });
  // console.log('newProb', newProb);
  if (newProb.some((p) => isNaN(p))) {
    return Math.round(Math.random() * (max - min) + min);
  }
  newProb = newProb.reduce(
    (db, c) => {
      db.db.push(c + db.count);
      db.count += c;
      return db;
    },
    { db: [], count: 0 },
  ).db;
  let val = Math.random();
  // console.log('could be top', middleShort(newProb, Math.random()) + min);
  // return Math.round(Math.random() * (max - min) + min);
  // console.log('val:', val, '\tprob', JSON.stringify(newProb));
  return middleShort(newProb, val) + min;
}

export function readData() {
  try {
    return JSON.parse(fs.readFileSync(absolutePath).toString());
  } catch (error) {
    return {};
  }
}

export function writeData(data: object) {
  return fs.writeFileSync(absolutePath, JSON.stringify(data), { flag: 'w' });
}

export function sleep(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

export function logStatistics(occurrence: object, count: number) {
  // const occurrence = data.reduce(
  //   (db, n) => {
  //     db[n]++;
  //     return db;
  //   },
  //   { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  // );
  const probability = calculateProbability(occurrence, count);
  console.log('Total Trials:', count);
  console.table({ occurrence, probability });
  return probability;
}

export function calculateProbability(occurrence: object, count: number) {
  return Object.keys(occurrence).reduce((db, c) => {
    try {
      db[c] = Math.round((occurrence[c] / count) * 1000) / 1000;
    } catch (error) {
      db[c] = 0;
    }
    return db;
  }, {});
}

export function middleShort(data: number[], num: number, inRecur = false) {
  let i = 0;
  if (data.length == 1) {
    // console.log('data f:', data);
    if (data[i] >= num || !inRecur) {
      return i;
    } else {
      return i + 1;
    }
  }
  if (data.length % 2 == 0) {
    i = data.length / 2 - 1;
  } else {
    i = Math.floor(data.length / 2);
  }
  // console.log('data f:', data);
  // console.log('i f:', i);
  if (data[i] >= num) {
    return middleShort(data.slice(0, i + 1), num, true);
  } else {
    const indx = i + 1 + middleShort(data.slice(i + 1, data.length), num, true);
    return indx == data.length ? indx - 1 : indx;
  }
}
