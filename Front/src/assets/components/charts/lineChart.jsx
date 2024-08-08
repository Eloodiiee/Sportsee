"use client"
import PropTypes from "prop-types"
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts"
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

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div
                    className="lineChart-bar-marker"
                    style={{
                        border: "1px solid #FFFFFF",
                        padding: "2px",
                        backgroundColor: "#FFFFFF",
                        color: "black",
                        minWidth: "80px",
                    }}
                >
                    <p>{`${payload[0].value} min`}</p>
                </div>
            )
        }
    }

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
                        <LineChart className="custom-line-chart" width={200} height={200} data={data.sessions} margin={{ left: 15, right: 15 }}>
                            {/* Détermine les propriétés de l'axe X tel que les jours */}
                            <XAxis dataKey="day" stroke="#FFFFFF" axisLine={false} tickLine={false} opacity={0.6} />
                            {/* Infobulle quand l'utilisateur met la souris sur le graphique */}
                            <Tooltip cursor={false} content={<CustomTooltip />} />
                            {/*Dessine la ligne qui montre la durée des sessions des activités au cours de la semaine*/}
                            <Line type="basis" dataKey="sessionLength" stroke="url(#colorUv)" strokeWidth="2" dot={false} />
                            <defs>
                                <linearGradient id="colorUv" x1="0%" y1="0" x2="100%" y2="0">
                                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.3)" />
                                    <stop offset="20%" stopColor="rgba(255, 255, 255, 0.4)" />
                                    <stop offset="40%" stopColor="rgba(255, 255, 255, 0.5)" />
                                    <stop offset="60%" stopColor="rgba(255, 255, 255, 0.6)" />
                                    <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                                </linearGradient>
                            </defs>
                        </LineChart>
                    </ResponsiveContainer>
                    {/* <div className="chartOverlay"></div> */}
                </Fragment>
            )}
        </>
    )
}

LineStats.propTypes = {
    id: PropTypes.number.isRequired,
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number,
        })
    ),
}

export default LineStats
