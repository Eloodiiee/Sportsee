import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import MockedService from "../assets/services/MockedServices"
import LineStats from "../assets/components/charts/lineChart"
import RadarStats from "../assets/components/charts/RadarChart"
import RadialBarStats from "../assets/components/charts/RadialBarChart"
import ScoresStats from "../assets/components/charts/ScoresChart"
import BarStats from "../assets/components/charts/BarChart"

function Accueil() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async (userId) => {
            setIsLoading(true)
            setErrorMessage(null)
            try {
                const service = new MockedService()
                const response = await service.getData(userId.toString(), "default")
                if (response && response.userInfos) {
                    setData(response)
                    console.log(response)
                    setIsLoading(false)
                } else {
                    throw new Error("Format de donnée invalide")
                }
            } catch (err) {
                console.log("Une erreur est survenue", err)
                setErrorMessage("Une erreur est survenue lors de la récupération des données.")
                setIsLoading(false)
                navigate("/error")
            }
        }

        if (!isNaN(id)) {
            fetchData(id || 7) // 7 par défaut si aucun ID n'est fourni
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
                        {data && data.userInfos && (
                            <div className="userPanel">
                                <h1>
                                    Bonjour <span className="firstName">{data.userInfos.firstName}</span>
                                </h1>
                                <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
                                <div className="chartContainer">
                                    <div className="activityChart">
                                        <BarStats id={data.id} />
                                    </div>
                                    <div className="userScores">
                                        <ScoresStats id={data.id} />
                                    </div>
                                    <div className="userChart" id="lineChart">
                                        <LineStats id={data.id} />
                                    </div>
                                    <div className="userChart" id="radarChart">
                                        <RadarStats id={data.id} />
                                    </div>
                                    <div className="userChart" id="radialBarChart">
                                        <RadialBarStats id={data.id} />
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
