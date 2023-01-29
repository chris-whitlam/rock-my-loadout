import fs from 'fs';
import path from 'path';

export const getWeaponData = async () => {
  const jsonsInDir = fs
    .readdirSync(__dirname)
    .filter((file) => path.extname(file) === '.json');

  let weapons = {};
  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join(__dirname, file));
    const json = JSON.parse(fileData.toString());
    weapons = {
      ...weapons,
      ...json
    };
  });

  return weapons;
};
