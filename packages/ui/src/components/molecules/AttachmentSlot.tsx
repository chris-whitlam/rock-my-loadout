import { FC } from 'react';
import { Attachment } from '@types';

interface Props {
  name: string;
  attachment?: Attachment;
  isDisabled?: boolean;
  onClick: (slotName: string) => void;
}

export const AttachmentSlot: FC<Props> = ({
  name,
  attachment,
  isDisabled,
  onClick
}) => {
  return (
    <button
      className={`p-4 border-solid border-2 text-left w-1/6 flex flex-col ${
        attachment ? 'border-primary' : 'border-gray-700'
      }`}
      disabled={isDisabled}
      onClick={() => onClick(name)}
    >
      <span
        className={`font-bold ${isDisabled ? 'text-gray-700' : 'text-primary'}`}
      >
        {name}
      </span>
      <span className={`font-thin mt-1 ${isDisabled && 'text-gray-700'}`}>
        {attachment?.name || 'None'}
      </span>
    </button>
  );
};
