import Service from "../assets/services/ApiServices"
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
                const service = new Service()
                // Récupération des données simulées

                const response = service.dataMap.user

                // Vérification de la validité des données récupérées
                if (response) {
                    setData(response) // Mise à jour de l'état avec les données récupérées
                    setIsLoading(false) // Indication que le chargement est terminé
                } else {
                    throw new Error("Invalid data format") // Levée d'une exception en cas de données non valides
                }
            } catch (err) {
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
                                <Link to={"/user/" + data[0].id} className="userLink">
                                    {data[0].userInfos.firstName} {data[0].userInfos.lastName}
                                </Link>
                                <Link to={"/user/" + data[1].id} className="userLink">
                                    {data[1].userInfos.firstName} {data[1].userInfos.lastName}
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
