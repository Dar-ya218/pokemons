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
  types: [
    {
      type: {
        name: string
      }
    }
  
  ]
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([])
  const [pokemonFiltered, setPokemonFiltered] = useState<PokemonDetails[]>([])

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
      <h2>Fire Pokemon filtered</h2>
      <section>
        {
          pokemonDetails.length > 0 && pokemonDetails.filter((pokemon) => pokemon.types[0]?.type.name === 'fire').sort((a, b) => a.id - b.id).map((pokemon) => (
            <div key={pokemon.id} className="card">
              <h2>{pokemon.name}</h2>
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
              <p>{pokemon.types.map((type) => type.type.name).join(', ')}</p>
            </div>
          ))
        }
      </section>
      <h2>First 10 pokemons</h2>
      <section>
        {
          pokemonDetails.length > 0 && pokemonDetails.map((poke: PokemonDetails) => (
            <div key={poke.id} className='card'>
              <h1>{poke.name}</h1>
              <img src={poke.sprites.front_shiny} alt={poke.name} />
            </div>
          ))
        }
      </section>
    </>
  )
}

export default App
