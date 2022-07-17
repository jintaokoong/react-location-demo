import { LoaderData, Route } from 'react-location';
import Login from '../pages/login';
import DefaultRoute from '../components/authorization/molecules/default-route';
import PublicRoute from '../components/authorization/molecules/public-route';
import ProtectedRoute from '../components/authorization/molecules/protected-route';
import Main from '../pages/main';
import Register from '../pages/register';
import pokeService from '../services/poke-service';
import { ListingResponse } from '../types/listing-response';
import { Pokemon } from '../types/pokemon';
import { ListingOptions } from '../types/listing-options';

const routeDeclarations: Route[] = [
  {
    path: '/',
    element: <DefaultRoute />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: '/main',
    loader: (loader) => {
      console.log(loader.search as ListingOptions);
      return pokeService.fetchPokemons(loader.search).then((res) => ({
        pokemons: res,
      }));
    },
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
];

export default routeDeclarations;
