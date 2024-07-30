class ApiFetch {
    static dataUrl = `http://localhost:3000/user/`

    async getData(id, action) {
        try {
            // Apifetch.dataUrl correspond a l'url ligne 2, ID et action sont envoyé quand on appelle la fonction
            const response = await fetch(`${ApiFetch.dataUrl}${id}/${action}`)
            if (!response.ok) {
                throw new Error(`Erreur HTTP! Statut: ${response.status}`)
            }
            const data = await response.json()

            if (!data || !data.data) {
                throw new Error("Données non valides reçues du serveur.")
            }

            return data.data
        } catch (error) {
            console.error("Une erreur a eu lieu:", error)
            throw error
        }
    }
}

export default ApiFetch
