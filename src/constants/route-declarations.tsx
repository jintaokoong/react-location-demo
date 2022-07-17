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
import { client } from '../App';

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
    loader: (loader) =>
      client.getQueryData([
        'pokemons',
        loader.search.offset,
        loader.search.limit,
      ]) ??
      client.fetchQuery(
        ['pokemons', loader.search.offset, loader.search.limit],
        () => pokeService.fetchPokemons(loader.search).then(() => ({})),
      ),
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
