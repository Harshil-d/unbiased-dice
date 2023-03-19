import { middleShort } from './utils';

function test(num: number) {
  const data = [21, 32, 42, 57, 70, 92];
  const index = middleShort(data, num);
  console.log(
    'index:',
    index,
    '\tnum',
    num,
    '\tvalue:',
    data[index],
    '\tdata:',
    data,
  );
  console.log();
}

test(20);
test(25);
test(35);
test(45);
test(60);
test(75);

test(0);
test(21);
test(57);
test(92);
test(96);
test(42);
