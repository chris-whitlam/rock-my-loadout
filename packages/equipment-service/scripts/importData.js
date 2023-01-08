const fs = require('fs');
const uuid = require('uuid');

// in vim: :g/^/+d
// https://www.gamesatlas.com/cod-modern-warfare-2/attachments/

const inputFile = './data.csv';
const outputFile = './output.json';

// Change this per import
const CONSTANTS = {
  attachmentSlot: 'Trigger Action'
};

const main = async () => {
  const output = {};

  try {
    const data = await fs
      .readFileSync(inputFile, { encoding: 'utf8' })
      .replace(/(\r)/gm, '')
      .split('\n');

    data.forEach((line) => {
      if (!line) {
        return;
      }

      const reference = line.toUpperCase().replace(/ /gm, '_');
      output[reference] = {
        uuid: uuid.v4(),
        name: line,
        ...CONSTANTS
      };
    });
  } catch (error) {
    console.log(error);
  }

  console.log(output);

  await fs.writeFileSync(outputFile, JSON.stringify(output));
};

main();
