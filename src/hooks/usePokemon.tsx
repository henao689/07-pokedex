import {useEffect, useState} from 'react'
import { pokemonApi } from '../api/pokemonApi'
import { PokemonFull } from '../interfaces/PokemonInterfaces'

export const usePokemon = (id: string) => {
    const [isLoading, setIsLoading] = useState(true)
    const [pokemon, setpokemon] = useState<PokemonFull>()

    const loadPokemon = async() => {
      const resp = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      setpokemon(resp.data)
      setIsLoading(false)
    }

    useEffect(() => {
      loadPokemon();
    }, [])
    

    return{
        isLoading,
        pokemon
    }
}