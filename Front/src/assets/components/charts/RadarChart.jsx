"use client"
import PropTypes from "prop-types"
import { Fragment } from "react"
import { useState, useEffect } from "react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"

/** Permet d'afficher un graphique Radar**/
function RadarStats({ response }) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (response) {
                    setData(response)
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
    }, [response])

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }
    //Permet de ranger dans l'ordre les catégories des performances (cardio...)
    let processedData = {}
    if (!isLoading) {
        const kind = ["Cardio", "Energie", "Endurance", "Force", "Vitesse", "Intensité"]
        // Traduit les catégories de performances
        processedData = data.data.map((item, index) => ({ ...item, kind: kind[index] }))
        processedData = processedData.reverse() // Remet dans l'ordre par rapport a la maquette sinon c'est inversé
    }

    return (
        <>
            {!isLoading && (
                <Fragment>
                    {/* Rends le container du graphique responsive */}
                    <ResponsiveContainer width="100%" height="100%">
                        {/* Détermine les propriétés du graphique tel que sa position et les données auxquelles il est lié.. */}
                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={processedData}>
                            {/* Retire les ligne qui vont vers le centre */}
                            <PolarGrid radialLines={false} />
                            {/* Affiche les catégories de performance */}
                            <PolarAngleAxis style={{ fontSize: "11px" }} dataKey="kind" stroke="#FFFFFF" tickLine={false} />
                            {/* Partie rouge du graphique qui montre l'intensité des catégories */}
                            <Radar dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.7} />
                        </RadarChart>
                    </ResponsiveContainer>
                </Fragment>
            )}
        </>
    )
}

RadarStats.propTypes = {
    response: PropTypes.object,
}

export default RadarStats
