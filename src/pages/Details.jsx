import React, {useState, useEffect} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"

import {IoArrowBack} from "react-icons/io5"
import {searchByCountry} from "../config"
import {Button} from "../components/UI/Button"
import Info from "../components/Info"

const Details = () => {
    const navigate = useNavigate()
    const {name} = useParams()

    const [country, setCountry] = useState(null)

    useEffect(() => {
        axios.get(searchByCountry(name)).then(
            ({data}) => setCountry(data[0])
        )
    }, [name])

    return (
        <div>
            <Button onClick={() => navigate(-1)}>
                <IoArrowBack/>
                Back
            </Button>
            {
                country && <Info navigate={navigate} {...country} />
            }
        </div>
    )
}

export default Details