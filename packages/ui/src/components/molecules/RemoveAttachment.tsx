import { FC } from 'react';

interface Props {
  attachmentSlot: string;
  onClick: (attachmentSlot: string) => void;
}

export const RemoveAttachment: FC<Props> = ({ attachmentSlot, onClick }) => {
  return (
    <button
      className="bg-tertiary p-10 text-center text-2xl font-bold"
      onClick={() => onClick(attachmentSlot)}
    >
      None
    </button>
  );
};
