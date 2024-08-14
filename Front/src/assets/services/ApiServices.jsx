/* import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from "../../data/dataMocked" */ //a décommenter pour etre sur le Frontend
import ApiFetch from "./getDataUser"

//Récupération des données de la fonction qui permet fetch les utilisateurs dans back/app/data.js
const data = await backEndFetch()
//Initialisation des données des utilsateurs du backend
const FIRST_USER_MAIN_DATA_BACK = []
const FIRST_USER_ACTIVITY_BACK = []
const FIRST_USER_AVERAGE_SESSIONS_BACK = []
const FIRST_USER_PERFORMANCE_BACK = []
//Formatage des utilisateurs du backend pour qu'il soient compatibles avec le mappage
data.forEach((user) => {
    FIRST_USER_MAIN_DATA_BACK.push(user.USER_MAIN_DATA_BACK)
    FIRST_USER_ACTIVITY_BACK.push(user.USER_ACTIVITY_BACK)
    FIRST_USER_AVERAGE_SESSIONS_BACK.push(user.USER_AVERAGE_SESSIONS_BACK)
    FIRST_USER_PERFORMANCE_BACK.push(user.USER_PERFORMANCE_BACK)
    return FIRST_USER_MAIN_DATA_BACK, FIRST_USER_ACTIVITY_BACK, FIRST_USER_AVERAGE_SESSIONS_BACK, FIRST_USER_PERFORMANCE_BACK
})

//La classe Service donne une methode pour fetch et filtré les données basé sur les actions de l'utilisateur .
class Service {
    // Mappage des set de données pour les différents types d'actions.
    constructor() {
        //Mappage backend a décommenter pour etre sur le Backend
        this.dataMap = {
            activity: FIRST_USER_ACTIVITY_BACK,
            "average-sessions": FIRST_USER_AVERAGE_SESSIONS_BACK,
            performance: FIRST_USER_PERFORMANCE_BACK,
            user: FIRST_USER_MAIN_DATA_BACK,
        }
        //Mappage data mocked a décommenter pour etre sur le Frontend
        /*   this.dataMap = {
            activity: USER_ACTIVITY,
            "average-sessions": USER_AVERAGE_SESSIONS,
            performance: USER_PERFORMANCE,
            user: USER_MAIN_DATA,
        } */
    }

    /** Filtres les données basé sur l'ID utilisateur et la clé.
@param {Array} data - Le parametre des données assignés au filtre.
@param {string} id - L'ID utilisateur est utilisé pour filtrer.
@param {string} key - La clé est pour filtrer par ID ou userId.
@returns {Object} L'objet de donnée filtré.
*/

    filterData(data, id, key) {
        return data.find((item) => item[key].toString() === id) || {}
    }

    /**Fetche et filtre les données basé sur l'ID utilisateur et le type d'action.
@param {string} id - L'ID utilisateur est utilisé pour filtrer.
@param {string} action - La clé est pour filtrer par ID ou userId.
@returns {Object} - L'objet des données filtrés.
*/
    async getData(id, action) {
        const dataKey = this.dataMap[action] ? action : "user"
        const key = dataKey === "user" ? "id" : "userId"
        const result = this.filterData(this.dataMap[dataKey], id, key)
        return result
    }
}

export default Service

//Fonction qui fetch les données des utilisateurs du backend

async function backEndFetch() {
    const backEndFetching = new ApiFetch()
    //Initialise les promesses pour pouvoir les récupérer dans la méthode forEach
    const promises = []
    //ID des utilisateurs du back
    const backendIds = [12, 18]
    //Récupération des promesses
    backendIds.forEach((id) => {
        promises.push(backEndFetching.getData(id, ""))
        promises.push(backEndFetching.getData(id, "average-sessions"))
        promises.push(backEndFetching.getData(id, "performance"))
        promises.push(backEndFetching.getData(id, "activity"))
    })
    //Complète les promesses pour pouvoir les formater
    const backEndUsers = await Promise.all(promises)
    //Formate les données pour qu'elles soient triées par utilisateurs
    const formattedData = []
    for (let i = 0; i < backEndUsers.length; i += 4) {
        const userMainData = backEndUsers[i] // getData(id, "")
        const userAverageSessions = backEndUsers[i + 1] // getData(id, "average-sessions")
        const userPerformance = backEndUsers[i + 2] // getData(id, "performance")
        const userActivity = backEndUsers[i + 3] // getData(id, "activity")

        formattedData.push({
            USER_MAIN_DATA_BACK: userMainData,
            USER_AVERAGE_SESSIONS_BACK: userAverageSessions,
            USER_PERFORMANCE_BACK: userPerformance,
            USER_ACTIVITY_BACK: userActivity,
        })
    }

    return formattedData
}
