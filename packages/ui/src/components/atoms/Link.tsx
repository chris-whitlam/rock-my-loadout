import { FC } from 'react';
import { Link as RRLink } from 'react-router-dom';

interface Props {
  to: string;
  children: React.ReactNode;
}

export const Link: FC<Props> = ({ children, to }) => {
  return <RRLink to={to}>{children}</RRLink>;
};
