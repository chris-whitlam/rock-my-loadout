import { RouterProvider } from 'react-router-dom';
import { useFetchWeaponsQuery } from './store';
import { router } from './router';

function App() {
  const { data = [], isFetching } = useFetchWeaponsQuery();
  console.log(data);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
