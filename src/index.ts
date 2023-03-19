import {
  getRandomArbitrary,
  logStatistics,
  readData,
  sleep,
  writeData,
} from './utils';

const testNumber = 50000000;

async function main() {
  const diceOneId = '7db0823c';
  const diceTwoId = '1e6eef2d';
  const data = readData();
  let count = 0;
  const maxNumberOnDice = 6;

  if (data[diceOneId] == undefined) {
    data[diceOneId] = {
      data: [],
      occurrence: {},
      // occurrence: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    };
    for (let i = 1; i <= maxNumberOnDice; i++) {
      data[diceOneId].occurrence[i] = 0;
    }
  }
  // if (data[diceTwoId] == undefined) {
  //   data[diceTwoId] = {
  //     data: [],
  //     occurrence: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
  //   };
  // }

  while (count < testNumber) {
    const onTop = getRandomArbitrary(1, maxNumberOnDice, data[diceOneId]);
    data[diceOneId].data.push(onTop);
    data[diceOneId].occurrence[onTop]++;
    // console.log('On Top: ', onTop);
    count++;
    if (count % (testNumber / 10) == 0) {
      console.log('Complete', (count / testNumber) * 100, '%');
    }
    // await sleep(1);
  }

  logStatistics(data[diceOneId].occurrence, data[diceOneId].data.length);
  // writeData(data);
}

main();
