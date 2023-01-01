import { CreateLoadout, Homepage, Login, NotFound } from '@pages';
import { Layout } from './Layout';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'loadouts/create',
        element: <CreateLoadout />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  }
]);
