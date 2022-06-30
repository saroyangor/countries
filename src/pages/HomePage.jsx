import React, {useState, useEffect} from "react"
import axios from "axios"
import {useNavigate} from 'react-router-dom'

import Controls from "../components/Controls"
import List from "../components/List"
import Card from "../components/Card"

import {ALL_COUNTRIES} from "../config"

const HomePage = ({countries, setCountries}) => {
    const [filteredCountries, setFilteredCountries] = useState(countries)

    const navigate = useNavigate()

    const handleSearch = (search, region) => {
        let data = [...countries]

        if (region) {
            data = data.filter(c => c.region.includes(region))
        }

        if (search) {
            data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
        }

        setFilteredCountries(data)
    }

    useEffect(() => {
        if(!countries.length) {
            axios.get(ALL_COUNTRIES)
                .then(({data}) => setCountries(data))
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        handleSearch()
        //eslint-disable-next-line
    }, [countries])

    return (
        <>
            <Controls onSearch={handleSearch} />
            <List>
                {
                    filteredCountries.map(c => {
                        const countryInfo = {
                            img: c.flags.png,
                            name: c.name,
                            info: [
                                {
                                    title: 'Population',
                                    description: c.population.toLocaleString()
                                },
                                {
                                    title: 'Region',
                                    description: c.region
                                },
                                {
                                    title: 'Capital',
                                    description: c.capital
                                }
                            ]
                        }
                        return <Card key={c.name} onClick={() => navigate(`/country/${c.name}`)} {...countryInfo} />
                    })
                }
            </List>
        </>
    )
}

export default HomePage