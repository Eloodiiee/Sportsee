import MockedService from "../assets/services/MockedServices"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

// Définition de la page Profil
function Profil() {
    // Déclaration des états locaux de la page
    const [data, setData] = useState({}) // Stocke les données récupérées
    const [isLoading, setIsLoading] = useState(true) // Indique si les données sont en cours de chargement
    const [errorMessage, setErrorMessage] = useState(null) // Stocke le message d'erreur en cas de problème

    // useEffect pour récupérer les données lors du montage de la page
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Instanciation du service mocké
                const service = new MockedService()
                // Récupération des données simulées
                const response = service.dataMap.activity

                // Vérification de la validité des données récupérées
                if (response) {
                    setData(response) // Mise à jour de l'état avec les données récupérées
                    console.log(response) // Log des données dans la console pour débogage
                    setIsLoading(false) // Indication que le chargement est terminé
                } else {
                    throw new Error("Invalid data format") // Levée d'une exception en cas de données non valides
                }
            } catch (err) {
                console.log("An error occurred", err)
                setErrorMessage("Une erreur est survenue lors de la récupération des données.") // Mise à jour de l'état avec un message d'erreur
                setIsLoading(false) // Indication que le chargement est terminé malgré l'erreur
            }
        }

        fetchData() // Appel de la fonction pour récupérer les données au montage de la page
    }, [data]) // Le useEffect est déclenché à chaque fois que l'état `data` change

    // Affichage d'un message d'erreur si une erreur est survenue
    if (errorMessage) {
        return <div>{errorMessage}</div>
    }
    // Rendu conditionnel : affichage du contenu principal si les données sont chargées
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

// Exportation de la page pour pouvoir l'utiliser dans d'autres fichiers
export default Profil
