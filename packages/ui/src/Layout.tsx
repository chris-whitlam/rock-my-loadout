import { Header } from '@molecules';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
  return (
    <div className="bg-primary-background">
      <Header />
      <main className="p-10">
        <Outlet />
      </main>
    </div>
  );
};
