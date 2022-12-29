import fs from 'fs';
import path from 'path';

const getAttachmentsFromDirectory = async (directoryPath: string) => {
  const jsonsInDir = fs
    .readdirSync(__dirname + directoryPath)
    .filter((file) => path.extname(file) === '.json');

  let attachments = {};
  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(
      path.join(__dirname + directoryPath, file)
    );
    const json = JSON.parse(fileData.toString());
    attachments = {
      ...attachments,
      ...json
    };
  });

  return attachments;
};

export const getAttachmentsData = async () => {
  const platformAttachments = await getAttachmentsFromDirectory('/platform');
  // const universalAttachments = await getAttachmentsFromDirectory('/universal');
  const attachments = { ...platformAttachments };
  return attachments;
};
