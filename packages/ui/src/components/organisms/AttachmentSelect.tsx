import { FC } from 'react';
import { Attachment as AttachmentT } from '@types';

import { Attachment, Modal } from '@molecules';

interface Props {
  attachments?: AttachmentT[];
  isOpen: boolean;
  onClose: () => void;
  onClickAttachment: (attachment: AttachmentT) => void;
}

export const AttachmentSelect: FC<Props> = ({
  attachments,
  isOpen,
  onClose,
  onClickAttachment
}) => {
  if (!attachments) return null;

  return (
    <Modal title="Select an Attachment" isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-3 gap-5">
        {attachments.map((attachment) => (
          <Attachment
            key={attachment.uuid}
            attachment={attachment}
            onClick={onClickAttachment}
          />
        ))}
      </div>
    </Modal>
  );
};
