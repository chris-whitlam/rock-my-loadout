import { Logo } from '@atoms';
import { useLogin } from '@hooks';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  const { isLoggedIn, signOut } = useLogin();
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-secondary-background p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Logo className="mr-5" width={40} />
          <span className="font-semibold text-xl tracking-tight">
            Rock My Loadout
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-white border-teal-400 hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Link
              to="/"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Home
            </Link>
            <Link
              to="/loadouts/create"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
            >
              Loadouts
            </Link>
          </div>
          <div>
            {isLoggedIn ? (
              <button
                onClick={signOut}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
