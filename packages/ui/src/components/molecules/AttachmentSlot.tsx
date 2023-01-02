import { FC } from 'react';
import { Attachment } from '@types';

interface Props {
  name: string;
  attachment?: Attachment;
  onClick: (slotName: string) => void;
}

export const AttachmentSlot: FC<Props> = ({ name, attachment, onClick }) => {
  return (
    <button
      className="p-4 border-solid border-2 text-left w-1/6"
      onClick={() => onClick(name)}
    >
      <span className="text-primary">
        {name}
        <br />
      </span>
      <span>{attachment?.name || 'None'}</span>
    </button>
  );
};
