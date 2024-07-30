"use client"
import PropTypes from "prop-types"
import { Fragment } from "react"
import { useState, useEffect } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import MockedService from "../../services/MockedServices"

//const kind = ["Cardio", "Energie", "Endurance", "Force", "Vitesse", "Intensité"]

function RadarStats({ id }) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = new MockedService()
                const response = await service.getData(id.toString(), "performance")

                if (response) {
                    setData(response)
                    console.log(response)
                    setIsLoading(false)
                } else {
                    throw new Error("Format de données invalide")
                }
            } catch (err) {
                setErrorMessage("Une erreur est survenue lors de la récupération des données.")
                setIsLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }
    //Permet de ranger dans l'ordre les catégories des performances (cardio...)
    let processedData = {}
    if (!isLoading) {
        const kind = Object.values(data.kind)
        processedData = data.data.map((item, index) => ({ ...item, kind: kind[index] }))
        processedData = processedData.reverse() // Remet dans l'ordre par rapport a la maquette sinon cest inversé
    }

    return (
        <>
            {!isLoading && (
                <Fragment>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={processedData}>
                            <PolarGrid radialLines={false} />
                            <PolarAngleAxis style={{ fontSize: "11px" }} dataKey="kind" stroke="#FFFFFF" tickLine={false} />
                            <Radar dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.7} />
                        </RadarChart>
                    </ResponsiveContainer>
                </Fragment>
            )}
        </>
    )
}

RadarStats.propTypes = {
    id: PropTypes.number.isRequired,
}

export default RadarStats
