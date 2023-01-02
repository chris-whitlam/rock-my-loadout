import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  title?: string;
  subHeading?: string;
}

export const Section: FC<Props> = ({ children, title, subHeading }) => {
  return (
    <div className="rounded shadow-lg bg-secondary-background p-5">
      <h2 className={`text-xl mb-${subHeading ? 0 : 5}`}>{title}</h2>
      {subHeading && <h3 className="text-l mb-5">{subHeading}</h3>}
      {children}
    </div>
  );
};
