import { getRandom, logStatistics, readData } from './utils';

const testNumber = 50000000;

async function main() {
  const diceOneId = '7db0823c';
  const data = readData();
  let count = 0;
  const maxNumberOnDice = 6;

  if (data[diceOneId] == undefined) {
    data[diceOneId] = {
      data: [],
      occurrence: {},
    };
    for (let i = 1; i <= maxNumberOnDice; i++) {
      data[diceOneId].occurrence[i] = 0;
    }
  }

  while (count < testNumber) {
    const onTop = getRandom(maxNumberOnDice);
    data[diceOneId].data.push(onTop);
    data[diceOneId].occurrence[onTop]++;
    count++;
    if (count % (testNumber / 10) == 0) {
      console.log('Complete', (count / testNumber) * 100, '%');
    }
  }

  logStatistics(data[diceOneId].occurrence, data[diceOneId].data.length);
}

main();
