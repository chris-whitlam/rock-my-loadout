import fs from 'fs';
import path from 'path';

export const getAttachmentsData = async () => {
  const jsonsInDir = fs
    .readdirSync(__dirname)
    .filter((file) => path.extname(file) === '.json');

  let attachments = {};
  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join(__dirname, file));
    const json = JSON.parse(fileData.toString());
    attachments = {
      ...attachments,
      ...json
    };
  });

  return attachments;
};
