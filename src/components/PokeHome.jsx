import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

import "../indexHome.css";

export const PokeHome = () => {
  const [offset, setOffset] = useState(0);
  const info = useFetch(
    `https://pokeapi.co/api/v2/pokemon?limit=9&offset=${offset}`
  );
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (info.data && info.data.results) {
        const data = await Promise.all(
          info.data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            return { data };
          })
        );
        setPokemonData(data);
      }
    };

    fetchData();
  }, [info.data]);

  // console.log(offset);

  return (
    <>
      <div
        className="d-grid gap-3 p-3 "
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {pokemonData.map((pokemon) => (
          <div className="p-3 card " key={pokemon.data.id}>
            <h3 className="pb-2">{pokemon.data.name.toUpperCase()}</h3>
            <p>ID: {pokemon.data.id}</p>
            <p>Experiencia Base: {pokemon.data.base_experience}</p>
            <p>HP: {pokemon.data.stats[0]?.base_stat}</p>
            <p>ATTACK: {pokemon.data.stats[1]?.base_stat}</p>
            <p>DEFENSE: {pokemon.data.stats[2]?.base_stat}</p>
            <p>SPEED: {pokemon.data.stats[5]?.base_stat}</p>
            <img src={pokemon.data.sprites.front_default} alt="" />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary  m-3 buton "
          onClick={() => {
            setOffset((prevOffset) => prevOffset - 9);
          }}
          disabled={offset === 0}
        >
          Previous Page
        </button>

        <button
          className="btn btn-secondary buton m-3 "
          onClick={() => {
            setOffset((prevOffset) => prevOffset + 9);
          }}
          disabled={offset === 1297}
        >
          Next Page
        </button>
      </div>
    </>
  );
};
