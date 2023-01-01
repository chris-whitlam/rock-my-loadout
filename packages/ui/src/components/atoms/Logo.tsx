import { FC } from 'react';

interface Props {
  className?: string;
  height?: number;
  width?: number;
}

export const Logo: FC<Props> = ({ className, height = 188, width = 168 }) => {
  const originalWidth = 168;
  const originalHeight = 188;

  const ratio = originalHeight / originalWidth;

  const newHeight = width * ratio;

  return (
    <svg
      className={className}
      width={width}
      height={newHeight || height}
      viewBox="0 0 168 188"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M84 2L2 26V140L84 186L166 140V26L84 2Z"
        fill="#91C83C"
        stroke="black"
        strokeWidth="3"
      />
      <path
        d="M156 45L96 72V163L156 131V45Z"
        fill="#59594E"
        stroke="black"
        strokeWidth="3"
      />
      <path
        d="M74 73L13 45V128L74 164V73Z"
        fill="#59594E"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
};
