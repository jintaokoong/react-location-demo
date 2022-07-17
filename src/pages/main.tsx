import { useCallback, useEffect, useState } from 'react';
import * as auth from 'firebase/auth';
import app from '../configurations/firebase';
import useFirebaseLogout from '../hooks/use-firebase-logout';
import { useAuthContext } from '../components/authorization/molecules/auth-provider';
import { MakeGenerics, useMatch, Search, Link } from 'react-location';
import { ListingResponse } from '../types/listing-response';
import { Pokemon } from '../types/pokemon';
import { ListingOptions } from '../types/listing-options';

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

  return (
    <div>
      <h1>Main</h1>
      <p>This is the main page</p>
      {user ? <p>Logged in as {user.email}</p> : <p>User not logged in</p>}
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
