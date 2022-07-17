import ky from '../configurations/ky';
import { complement, isNil, pickBy } from 'ramda';
import { ListingOptions } from '../types/listing-options';
import { SearchParamsOption } from 'ky';
import { ListingResponse } from '../types/listing-response';
import { Pokemon } from '../types/pokemon';

const fetchPokemons = (options: ListingOptions) => {
  const params = pickBy(complement(isNil), options);
  return ky
    .get('pokemon', {
      searchParams: params as SearchParamsOption,
    })
    .json<ListingResponse<Pokemon>>();
};

const pokeService = {
  fetchPokemons,
};

export default pokeService;
