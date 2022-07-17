import { useEffect, useMemo, useState } from 'react';
import useFirebaseLogout from '../hooks/use-firebase-logout';
import { useAuthContext } from '../components/authorization/molecules/auth-provider';
import { Link, MakeGenerics, Search, useSearch } from 'react-location';
import { ListingResponse } from '../types/listing-response';
import { Pokemon } from '../types/pokemon';
import { ListingOptions } from '../types/listing-options';
import { useQuery } from 'react-query';
import pokeService from '../services/poke-service';

type LocationGenerics = MakeGenerics<{
  Search: Search<ListingOptions>;
  LoaderData: {
    pokemons: ListingResponse<Pokemon>;
  };
}>;

const Main = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const logout = useFirebaseLogout();
  const options = useSearch<LocationGenerics>();

  const { data: pokemons } = useQuery(
    ['pokemons', options.limit, options.offset],
    () => pokeService.fetchPokemons(options),
  );

  const { limit, offset } = useSearch<LocationGenerics>();

  useEffect(() => {
    console.log(limit, offset);
  }, [limit, offset]);

  const next = useMemo(() => {
    if (!pokemons?.next) return undefined;
    const params = new URL(pokemons.next).searchParams;
    return {
      limit: params.get('limit'),
      offset: params.get('offset'),
    };
  }, [pokemons]);
  const previous = useMemo(() => {
    if (!pokemons?.previous) return undefined;
    const params = new URL(pokemons.previous).searchParams;
    return {
      limit: params.get('limit'),
      offset: params.get('offset'),
    };
  }, [pokemons]);

  return (
    <div>
      <h1>Main</h1>
      <p>This is the main page</p>
      {user ? <p>Logged in as {user.email}</p> : <p>User not logged in</p>}
      <div
        style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: '10px' }}
      >
        {previous && (
          <Link to={'/main'} search={previous}>
            Previous
          </Link>
        )}
        {next && (
          <Link to={'/main'} search={next}>
            Next
          </Link>
        )}
      </div>
      <pre>{JSON.stringify(pokemons?.results, null, 2)}</pre>
      <button
        type={'button'}
        disabled={user == null || loading}
        onClick={() => {
          setLoading(true);
          return logout().then(() => {
            setLoading(false);
          });
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Main;
