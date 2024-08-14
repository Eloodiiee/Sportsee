import PropTypes from "prop-types"
import { Fragment, useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts"

// Composant fonctionnel BarStats qui prend une prop 'id'
function BarStats({ response }) {
    // Déclaration des états pour les données, le chargement et les messages d'erreur
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    // Hook useEffect pour effectuer une requête de données lorsque le composant est monté
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Si une réponse est reçue, on met à jour l'état avec les données
                if (response) {
                    setData(response)
                    setIsLoading(false) // On indique que le chargement est terminé
                } else {
                    // Si la réponse est invalide, on lance une erreur
                    throw new Error("Format de données invalide")
                }
            } catch (err) {
                // En cas d'erreur, on affiche un message d'erreur et on arrête le chargement
                setErrorMessage("Une erreur est survenue lors de la récupération des données.")
                setIsLoading(false)
            }
        }

        // Appel de la fonction fetchData pour lancer la récupération des données
        fetchData()
    }, [response]) // Le useEffect se déclenche lorsque l'id change

    // Si un message d'erreur est présent, on le rend dans un div
    if (errorMessage) {
        return <div>{errorMessage}</div>
    }
    // Fonction pour extraire le jour de la date sous forme de chaîne
    const currentDay = (date) => date.split("-")[2]

    // Composant personnalisé pour le tooltip dans le graphique, comme par exemple l'affichage des calories et kg au survol de la souris sur le graphique
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bar-marker">
                    <p>{`${payload[0].value} kg`}</p>
                    <p>{`${payload[1].value} kcal`}</p>
                </div>
            )
        }
    }
    // Rendu du composant principal
    return (
        <>
            {!isLoading && (
                <Fragment>
                    <div className="activityContainer">
                        <p className="dailyActivity">Activité quotidienne</p>
                        <ResponsiveContainer width="100%" aspect={3}>
                            <BarChart
                                width={500}
                                height={200}
                                data={data.sessions}
                                margin={{
                                    top: 15,
                                    right: 15,
                                    left: 30,
                                    bottom: 15,
                                }}
                            >
                                <CartesianGrid horizontal="true" vertical="" strokeDasharray="3" />
                                {/* Axe x des jours,tickFormatter permet de réduire "aaaa-mm-jj" uniquement à afficher le jour  */}
                                <XAxis axisLine={false} tickLine={false} dataKey="day" tickFormatter={currentDay} />
                                {/* Axe y de gauche pour les calories */}
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} orientation="left" dataKey="calories" hide={true} />
                                {/* Axe y de droite pour les Kilos */}
                                <YAxis yAxisId="right" axisLine={false} tickLine={false} orientation="right" dataKey="kilogram" />
                                <Tooltip content={CustomTooltip} /> {/* Appel du tooltip */}
                                {/* Affiche la légende du graphique et montre la couleur des kilos et les kcal */}
                                <Legend verticalAlign="top" align="right" height={70} iconType="circle" />
                                {/* Barre des kilos affiché en gris foncé, basé sur l'axe Y de droite */}
                                <Bar
                                    yAxisId="right"
                                    barSize={7}
                                    radius={[10, 10, 0, 0]}
                                    dataKey="kilogram"
                                    fill="#282D30"
                                    name="Poids (kg)" // Ajoute un nom personnalisé pour la légende (Poids en kilos)
                                />
                                {/* Barre des kcal affiché en rouge, basé sur l'axe Y de gauche */}
                                <Bar
                                    yAxisId="left"
                                    barSize={7}
                                    radius={[10, 10, 0, 0]}
                                    dataKey="calories"
                                    fill="#E60000"
                                    name="Calories brûlées (kCal)" // Ajoute un nom personnalisé pour la légende  (Calories brulées en kcal)
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Fragment>
            )}
        </>
    )
}

// Validation des types de props pour s'assurer qu'elles sont passées correctement
BarStats.propTypes = {
    response: PropTypes.object,
    active: PropTypes.bool, // active est optionnel et doit être un booléen
    payload: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number, // Chaque élément du tableau payload doit avoir une propriété "value" qui est un nombre
        })
    ),
}

// Export du composant pour pouvoir l'utiliser ailleurs
export default BarStats
