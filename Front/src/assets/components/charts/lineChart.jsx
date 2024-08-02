"use client"
import PropTypes from "prop-types"
import { LineChart, Line, XAxis, ResponsiveContainer } from "recharts"
import { Fragment } from "react"
import { useState, useEffect } from "react"
import MockedService from "../../services/MockedServices"

/** Permet d'afficher les jours du graphique**/
const days = ["L", "M", "M", "J", "V", "S", "D"]

/** Permet d'afficher un graphique en ligne**/
function LineStats({ id }) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch avec lequel je recupere les données liées à l'utilisateur
                //relié a mon MockedService
                const service = new MockedService()
                const response = await service.getData(id.toString(), "average-sessions")

                if (response && response.sessions) {
                    // convertie day 1,day 2 en L,M,M ...
                    response.sessions.forEach((session, index) => (session.day = days[index]))
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
        // interrompt le fetch apres avoir récupéré les données
    }, [id])

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }
    return (
        <>
            {!isLoading && data.sessions && (
                <Fragment>
                    <p>Durée moyenne des sessions</p>
                    {/* Rends le container du graphique responsive */}
                    <ResponsiveContainer width="100%" height="100%">
                        {/* Détermine les données liée au graphique.. */}
                        <LineChart className="custom-line-chart" width={258} height={263} data={data.sessions}>
                            {/* Détermine les propriétés de l'axe X tel que les jours */}
                            <XAxis dataKey="day" stroke="#FFFFFF" axisLine={false} tickLine={false} />
                            {/*Dessine la ligne qui montre la durée des sessions des activités au cours de la semaine*/}
                            <Line type="basis" dataKey="sessionLength" stroke="#FFFFFF" strokeWidth="2" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="chartOverlay"></div>
                </Fragment>
            )}
        </>
    )
}

LineStats.propTypes = {
    id: PropTypes.number.isRequired,
}

export default LineStats
