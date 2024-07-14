import { Loading } from "./components/Loading";
// import { PokeGrid } from "./components/PokeGrid";
import { PokeHome } from "./components/PokeHome";
import { useFetch } from "./hooks/useFetch";

export const Home = () => {
  const { loading } = useFetch(`https://pokeapi.co/api/v2/pokemon/1`);

  return (
    <>
      <h1>PokeDex</h1>
      <hr />

      {loading && <Loading />}
      {/* {data && <PokeGrid data={data} />} */}
      {!loading && <PokeHome />}
    </>
  );
};
