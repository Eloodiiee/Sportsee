import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../../data/dataMocked"

//La classe MockedService donne une methode pour fetch et filtré les données basé sur les actions de l'utilisateur .
class MockedService {
    // Mappage des set de données pour les différents types d'actions.
    constructor() {
        this.dataMap = {
            activity: USER_ACTIVITY,
            "average-sessions": USER_AVERAGE_SESSIONS,
            performance: USER_PERFORMANCE,
            default: USER_MAIN_DATA,
        }
    }

    /** Filtres les données basé sur l'ID utilisateur et la clé.
@param {Array} data - Le parametre des données assignés au filtre.
@param {string} id - L'ID utilisateur est utilisé pour filtrer.
@param {string} key - La clé est pour filtrer par ID ou userId.
@returns {Object} L'objet de donnée filtré.
*/
    filterData(data, id, key) {
        console.log("Données avant d'être filtrées:", data)
        console.log("Filtrer les données avec l'ID:", id)
        const result = data.find((item) => item[key].toString() === id)
        console.log("Resultats filtrés:", result)
        return result || {}
    }

    /**Fetche et filtre les données basé sur l'ID utilisateur et le type d'action.
Logs les données filtrés à la console dans un format structuré.
@param {string} id - L'ID utilisateur est utilisé pour filtrer.
@param {string} action - La clé est pour filtrer par ID ou userId.
@returns {Object} - L'objet des données filtrés.
*/
    async getData(id, action) {
        console.log("Obtention des données pour l'action:", action)
        const dataKey = this.dataMap[action] ? action : "default"
        const key = dataKey === "default" ? "id" : "userId"
        const result = this.filterData(this.dataMap[dataKey], id, key)
        console.table(result) //Afficher les données structurées dans la console.
        return result
    }
}

export default MockedService
