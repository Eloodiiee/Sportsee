import MockedService from "../assets/services/MockedServices"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function Profil() {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = new MockedService()
                const response = service.dataMap.activity

                if (response) {
                    setData(response)
                    console.log(response)
                    setIsLoading(false)
                } else {
                    throw new Error("Invalid data format")
                }
            } catch (err) {
                console.log("An error occurred", err)
                setErrorMessage("Une erreur est survenue lors de la récupération des données.")
                setIsLoading(false)
            }
        }

        fetchData()
    }, [data])

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }

    return (
        <>
            {!isLoading && (
                <main>
                    <div className="profileContainer">
                        <div className="userChoiceContainer">
                            <h2> Bonjour, vers quel utilisateur voudriez-vous être redirigé ?</h2>
                            <div className="userChoice">
                                <Link to={"/user/" + data[0].userId} className="userLink">
                                    Vittorio Toscano
                                </Link>
                                <Link to={"/user/" + data[1].userId} className="userLink">
                                    Mikaela Reid
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}
export default Profil
