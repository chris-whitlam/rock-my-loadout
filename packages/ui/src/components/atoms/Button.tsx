import { FC } from 'react';

interface Props {
  type?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  isLoading?: boolean;
}

export const Button: FC<Props> = ({
  children,
  onClick,
  className,
  type = 'primary',
  isLoading = false
}) => {
  return (
    <button
      className={`bg-${type} p-3 mt-3 text-center ${className}`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};
