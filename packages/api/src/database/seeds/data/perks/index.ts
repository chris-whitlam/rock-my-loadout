import fs from 'fs';
import path from 'path';

export const getPerksData = async () => {
  const jsonsInDir = fs
    .readdirSync(__dirname)
    .filter((file) => path.extname(file) === '.json');

  let perks = {};
  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join(__dirname, file));
    const json = JSON.parse(fileData.toString());
    perks = {
      ...perks,
      ...json
    };
  });

  return perks;
};
