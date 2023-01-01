import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Section: FC<Props> = ({ children, title }) => {
  return (
    <div className="rounded shadow-lg bg-secondary-background p-5">
      <h2 className="text-xl mb-5">{title}</h2>
      {children}
    </div>
  );
};
