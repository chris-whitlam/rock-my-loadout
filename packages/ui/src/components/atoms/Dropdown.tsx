import { FC, ReactEventHandler } from 'react';

interface Props {
  options: string[];
  onSelect: ReactEventHandler<HTMLSelectElement>;
  children?: React.ReactNode;
}

export const Dropdown: FC<Props> = ({ children, options, onSelect }) => {
  return (
    <>
      <label className="mr-3">{children}</label>
      <select className="text-black mb-5" onChange={onSelect}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
