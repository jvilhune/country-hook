import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  console.log('name', name)
  const [country, setCountry] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [okMessage, setOkMessage] = useState(null)
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    console.log('effect run, name is now', name)

    // skip if name is not defined
    if (name) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          //setRates(response.data.rates)
          setCountry(response.data)
          /*
          console.log('response.data', response.data)
          console.log('response.data.name', response.data.name)
          console.log('response.data.name.common', response.data.name.common)
          console.log('response.data.population', response.data.population)
          console.log('response.data.capital', response.data.capital)
          */
        })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  let component = (
    <div>
      not found...
    </div>
  )


  if (country) {
    console.log('country', country)
    console.log('country.name', country.name)
    console.log('country.name.common', country.name.common)
    console.log('country.population', country.population)
    console.log('country.capital', country.capital)
    console.log('country.region', country.region)

    component = (
      <div>
        <h3>{country.name.common} </h3>
        <div>capital {country.capital} </div>
        <div>population {country.population}</div>
        <img src={country.flag} height='100' alt={`flag of ${country.name.common}`}/> 
      </div>
    )
  }
  return component
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>

      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App