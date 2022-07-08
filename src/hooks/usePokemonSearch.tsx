import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api/pokemonApi";
import { PokemonPaginationResponse, Result, SimplePokemon } from "../interfaces/PokemonInterfaces";


export const usePokemonSearch = () => {

    //estado de carga de la petcicion
    const [isFetching, setIsFetching] = useState(true)
    //estado de lista de pokemon tipado desde interface SimplePokemon
    const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([])

    const loadPokemons = async() => {
      //petcicion 
      const resp = await pokemonApi.get<PokemonPaginationResponse>('https://pokeapi.co/api/v2/pokemon?limit=1200');
      //funcion que mapea la lista obtenida para crear nueva lista
      mapPokemonList(resp.data.results);
    }

    const mapPokemonList = (list: Result[]) => {

      //se declara nuevo listado con tipado de interface SimplePokemon, se desestructura cada item
      const newPokemonList: SimplePokemon[] = list.map(({name,url}) => {
        //arreglo con las partes de la uri partiendo desde cada /
        const urlParts= url.split('/');
        //se guarda como el id la posicion -2 del arreglo
        const id = urlParts[urlParts.length - 2]
        //se declara la imagen concatenande imagenes con id de cada pokemon
        const feature = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

        return { id, feature, name }
      })
      setPokemonList(newPokemonList)
      setIsFetching(false);
    }
    
    useEffect(() => {
    loadPokemons();
    }, [])
    
  return{
    isFetching,
    pokemonList,
    loadPokemons
  }
}
