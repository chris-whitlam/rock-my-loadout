import { FC } from 'react';
import { Attachment as AttachmentT } from '@types';

interface Props {
  attachment: AttachmentT;
  onClick: (attachment: AttachmentT) => void;
}

export const Attachment: FC<Props> = ({ attachment, onClick }) => {
  return (
    <button
      className="bg-tertiary p-10 text-center text-2xl font-bold"
      onClick={() => onClick(attachment)}
    >
      {attachment.name}
    </button>
  );
};
