import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Service from "../assets/services/ApiServices"
import LineStats from "../assets/components/charts/lineChart"
import RadarStats from "../assets/components/charts/RadarChart"
import RadialBarStats from "../assets/components/charts/RadialBarChart"
import ScoresStats from "../assets/components/charts/ScoresChart"
import BarStats from "../assets/components/charts/BarChart"

function Accueil() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [dataUser, setDataUser] = useState(null)
    const [dataActivity, setDataActivity] = useState(null)
    const [dataSession, setDataSession] = useState(null)
    const [dataPerformance, setDataPerformance] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async (userId) => {
            setIsLoading(true)
            setErrorMessage(null)
            try {
                const service = new Service()
                const responseUser = await service.getData(userId, "")
                const responseActivity = await service.getData(userId, "activity")
                const responseSession = await service.getData(userId, "average-sessions")
                const responsePerformance = await service.getData(userId, "performance")
                if (responseUser && responseUser.userInfos) {
                    setDataUser(responseUser)
                    setIsLoading(false)
                } else {
                    throw new Error("Format de donnée invalide pour les données utilisateurs")
                }
                if (responseActivity) {
                    setDataActivity(responseActivity)
                    setIsLoading(false)
                } else {
                    throw new Error("Format de donnée invalide pour les données d'activité")
                }
                if (responseSession) {
                    setDataSession(responseSession)
                    setIsLoading(false)
                } else {
                    throw new Error("Format de donnée invalide pour les données session")
                }
                if (responsePerformance) {
                    setDataPerformance(responsePerformance)
                    setIsLoading(false)
                } else {
                    throw new Error("Format de donnée invalide pour les données performance")
                }
            } catch (err) {
                setErrorMessage("Une erreur est survenue lors de la récupération des données.")
                setIsLoading(false)
                navigate("/error")
            }
        }

        if (id && !isNaN(id)) {
            fetchData(id) // Utilisez l'ID fourni par l'utilisateur
        } else {
            setErrorMessage("ID utilisateur invalide.")
            navigate("/error")
        }
    }, [id, navigate])

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }

    return (
        <>
            {!isLoading && (
                <main>
                    <div className="mainContainer">
                        {dataUser && dataUser.userInfos && (
                            <div className="userPanel">
                                <h1>
                                    Bonjour <span className="firstName">{dataUser.userInfos.firstName}</span>
                                </h1>
                                <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
                                <div className="chartContainer">
                                    <div className="activityChart">
                                        <BarStats response={dataActivity} />
                                    </div>
                                    <div className="userScores">
                                        <ScoresStats response={dataUser} />
                                    </div>
                                    <div className="userChart" id="lineChart">
                                        <LineStats response={dataSession} />
                                    </div>
                                    <div className="userChart" id="radarChart">
                                        <RadarStats response={dataPerformance} />
                                    </div>
                                    <div className="userChart" id="radialBarChart">
                                        <RadialBarStats response={dataUser} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            )}
        </>
    )
}

export default Accueil
