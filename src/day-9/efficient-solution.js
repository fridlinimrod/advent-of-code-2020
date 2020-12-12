const data = require('./data');
const dataArray = data.split('\n').map(num => Number(num));

console.log({dataArray})

const preamble = 25;
let index = preamble;
let res = -1;

const createSumPart = function({index1, val1, index2, val2}){
  this.index1=index1, this.val1=val1, this.index2=index2, this.val2=val2;
  this.sum = val1 + val2;
  console.log(this);
  this.replaceIndex = function({indexToReplace, newIndex, newValue}){
    if (this.index1 === indexToReplace) {
      console.log(`replacing index1 ${index1}`)
      this.index1 = newIndex;
      this.val1 = newValue;
      this.sum = this.val1 + this.val2;
    }

    if (this.index2 === indexToReplace) {
      console.log(`replacing index2 ${index2}`)
      this.index2 = newIndex;
      this.val2 = newValue;
      this.sum = this.val1 + this.val2;
    }
  }
  
  return this;
}

const part1 = (dataArray) => {
  // calculate all sums until preamble.
  const sumsArray = [];
  for (let i=0; i< preamble-1; i++) {
    for (let j=i+1; j<preamble; j++) {
      sumsArray.push(new createSumPart({index1: i, index2: j, val1: dataArray[i], val2: dataArray[j]}));
    }
  }
  console.log({sumsArray});
  let currIndex = preamble;
  while (sumsArray.find(({val1, val2, sum}) => {
    console.log(`val1: ${val1}, val2: ${val2}, sum: ${sum}, currIndex: ${currIndex}, val: ${dataArray[currIndex]}`)
    return val1 !== val2 && sum === dataArray[currIndex];
  })) {
    currIndex++;
    sumsArray.forEach(sumPart => {
      // console.log(`replacing ${currIndex - preamble} with ${currIndex -1} (val: ${dataArray[currIndex -1]})`);
      if (sumPart.index1 === currIndex - preamble -1 || sumPart.index2 === currIndex - preamble -1) {
        sumPart.replaceIndex({indexToReplace: currIndex - preamble -1, newIndex: currIndex -1, newValue: dataArray[currIndex -1]})
        console.log(`after replacing: ${JSON.stringify(sumPart)}`)
      }
    })
  }

  console.log({res: dataArray[currIndex]});
}

part1(dataArray);
