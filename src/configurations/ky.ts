import exky from 'ky';

const ky = exky.create({
  prefixUrl: 'https://pokeapi.co/api/v2',
});

export default ky;
