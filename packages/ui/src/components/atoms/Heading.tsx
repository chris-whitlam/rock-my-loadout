import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const PageTitle: FC<Props> = ({ children }) => {
  return (
    <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">{children}</h1>
  );
};
