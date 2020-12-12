const input = require('./data').data;
const instructionsArray = input.split('\n');

console.log({inputArray: instructionsArray, length: instructionsArray.length});

const parseInstruction = ({instruction}) => {
    const regex = /(?<operation>acc|jmp|nop) (?<number>[+-]\d+)/;
    const {operation, number} = instruction.match(regex).groups;
    return {operation, number}
}

const runInstruction = ({operation, number}) => {
  switch (operation) {
    case 'jmp':
      return {addToAcc: 0, relativePosition: Number(number)};
    case 'acc':
        return {addToAcc: Number(number), relativePosition: 1};  
    default:
        return {addToAcc: 0, relativePosition: 1};
  }
}

const part1 = (instructionsArray) => {
  let currentInstructionIndex = 0;
  let acc = 0;
  const ranIndexes = new Set();
  const indexesArray = [];
  
  while (currentInstructionIndex < instructionsArray.length) {    
    if (ranIndexes.has(currentInstructionIndex)){
      return {acc, indexesArray, problematicIndex: currentInstructionIndex};
    }
    ranIndexes.add(currentInstructionIndex);
    indexesArray.push(currentInstructionIndex)

    const {operation, number} = parseInstruction({instruction: instructionsArray[currentInstructionIndex]})
    const {addToAcc, relativePosition} = runInstruction({operation, number});

    acc +=addToAcc;
    currentInstructionIndex += relativePosition;    
  }

  return {acc, indexesArray, problematicIndex: null};
}

const mapper = {
  'jmp' : 'nop',
  'nop' : 'jmp'
}

const part2 = () => {
  let {indexesArray, problematicIndex} = part1(instructionsArray);
  
  const instructionsArray2 = input.split('\n');  
  indexesArray.forEach(index => {
      console.log({index, instruction: instructionsArray2[index]})
    })
  let currentIndex = indexesArray.length -1
  
  while (problematicIndex && currentIndex >= 0) {
    let lineIndexToChange = indexesArray[currentIndex];
    console.log({lineIndexToChange})
    const {operation, number} = parseInstruction({instruction: instructionsArray2[lineIndexToChange]});
    console.log({inst: instructionsArray2[lineIndexToChange], operation, number})

    const originalInstruction = instructionsArray2[lineIndexToChange];
    console.log({originalInstruction});

    if (operation === 'nop' || operation === 'jmp') {
      instructionsArray2[lineIndexToChange] = `${mapper[operation]} ${number}`
      console.log({updatedInstruction: instructionsArray2[lineIndexToChange]})
      const res = part1(instructionsArray2);      
      console.log(res.acc)
      problematicIndex = res.problematicIndex;
      console.log({problematicIndex})
      instructionsArray2[lineIndexToChange] = originalInstruction;
    }

    
    
    // console.log(`at index: ${currentIndex}, bringing back the instruction to be: ${originalInstruction}, before bringing back: ${instructionsArray2[currentIndex]}`);
    
    currentIndex--;    
  }
  
  return 'out from the while'
}

const result = part2();
console.log(result);
