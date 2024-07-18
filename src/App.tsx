import { useEffect, useState } from 'react'
import './App.css'

interface Pokemon {
  name: string
  url: string
}

interface PokemonDetails {
  id: number
  name: string
  sprites: {
    front_shiny: string
  }
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')
      .then((res) => res.json())
      .then((poke) => setPokemons(poke.results))
  }, [])

  useEffect(() => {
    if (pokemons.length > 0) {
      pokemons.forEach((pokemon: any) => {
        fetch(pokemon.url)
          .then((res) => res.json())
          .then((poke) => {
            setPokemonDetails((prevDetails: any) => [...prevDetails, poke])
          })
      })
    }
  }, [pokemons])

  return (
    <> 
      {
        pokemonDetails.length > 0 && pokemonDetails.map((poke: PokemonDetails) => (
          <div key={poke.id}>
            <h1>{poke.name}</h1>
            <img src={poke.sprites.front_shiny} alt={poke.name} />
          </div>
        ))
      }
    </>
  )
}

export default App
