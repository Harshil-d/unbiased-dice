import { getRandomArbitrary, readData, sleep, writeData } from './utils';

const testNumber = 10;

function main() {
  const diceOneId = '7db0823c';
  const diceTwoId = '1e6eef2d';
  const data = readData();
  let count = 0;

  if (data[diceOneId] == undefined) {
    data[diceOneId] = [];
  }
  if (data[diceTwoId] == undefined) {
    data[diceTwoId] = [];
  }

  while (count < testNumber) {
    const onTop = getRandomArbitrary(1, 6);
    data[diceOneId].push(onTop);
    console.log('On Top: ', onTop);
    count++;
    sleep(2000);
  }

  writeData(data);
}

main();
