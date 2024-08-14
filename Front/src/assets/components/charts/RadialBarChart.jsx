"use client"
import PropTypes from "prop-types"
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts"
import { Fragment } from "react"
import { useState, useEffect } from "react"

/** Permet d'afficher la barre de progression circulaire du score de l'utilisateur**/
function RadialBarStats({ response }) {
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
    /** Array qui permet de formater le score pour qu'il puisse être affiché **/
    const score = [
        {
            name: "Score",
            value: data.todayScore,
            fill: "#E60000",
        },
    ]

    return (
        <>
            {!isLoading && (
                <Fragment>
                    <p>Score</p>
                    {/* Rends le container du graphique responsive */}
                    <ResponsiveContainer width="100%" height="100%">
                        {/* Détermine les propriétés du graphique tel que sa position, la largeur du trait et son point de depart.. */}
                        <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" barSize={8} data={score} startAngle={90} endAngle={90 + 360 * data.todayScore}>
                            {/* Détermine les propriétés de la barre du graphique, le sens dans lequel elle tourne et la valeur a laquelle elle est reliée */}
                            <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={50} />
                            <text x={"50%"} y={"40%"} textAnchor="middle" dominantBaseline="middle" className="progress-label">
                                {data.todayScore * 100}%
                            </text>
                            <text x={"50%"} y={"50%"} textAnchor="middle" dominantBaseline="middle" className="progress-sub-label">
                                de votre
                            </text>
                            <text x={"50%"} y={"60%"} textAnchor="middle" dominantBaseline="middle" className="progress-sub-label">
                                objectif
                            </text>
                        </RadialBarChart>
                    </ResponsiveContainer>
                </Fragment>
            )}
        </>
    )
}

RadialBarStats.propTypes = {
    response: PropTypes.object,
}

export default RadialBarStats
