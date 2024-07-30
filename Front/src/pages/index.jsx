import { Component } from "react"
import MockedService from "../assets/services/MockedServices"
import LineStats from "../assets/components/charts/lineChart"
import RadarStats from "../assets/components/charts/RadarChart"

// constructor de l'accueil qui fetch sans useState ou useEffect
class Accueil extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            loading: false,
            error: null,
        }
        this.fetchData = this.fetchData.bind(this)
    }
    // cest une fonction qui verifie que le component a été monté
    componentDidMount() {
        this.fetchData(7) //7 ou 32
    }
    // Fetch avec lequel je recupere l'utilisateur
    async fetchData(id) {
        this.setState({ loading: true, error: null })
        try {
            //relie a mon MockedService
            const service = new MockedService()
            const response = await service.getData(id.toString(), "default")
            if (response && response.userInfos) {
                this.setState({ user: response, loading: false })
                console.log("Données fetch:", response)
            } else {
                throw new Error("Format de données invalide")
            }
        } catch (err) {
            this.setState({ error: "Une erreur est survenue lors de la récupération des données.", loading: false })
        }
    }

    render() {
        const { user, loading, error } = this.state
        return (
            <main>
                <div className="mainContainer">
                    {loading && <div>Loading...</div>}
                    {error && <div>Error: {error}</div>}
                    {user && user.userInfos && (
                        <div className="userPanel">
                            <h1>
                                Bonjour <span className="firstName">{user.userInfos.firstName}</span>
                            </h1>
                            <div className="chartContainer">
                                <div className="activityChart"></div>
                                <div className="userScores"></div>
                                <div className="userChart" id="lineChart">
                                    <LineStats id={user.id} />
                                </div>
                                <div className="userChart" id="radarChart">
                                    <RadarStats id={user.id} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        )
    }
}
/* ;<div className="chart">Performances</div> */
export default Accueil
