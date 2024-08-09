import "./App.css"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Header from "./assets/components/header/Header"
import Sidebar from "./assets/components/sidebar/Sidebar"
import Accueil from "./pages/index"
import PageErreur from "./pages/PageErreur"
import Profil from "./pages/Profile"
function App() {
    return (
        <Router>
            <Header />
            <Sidebar />
            <Routes>
                <Route path="/" element={<Navigate to="/user/7" />} /> {/* Redirige la racine vers /user/7 */}
                <Route path="/user/:id" element={<Accueil />} />
                <Route path="/error" element={<PageErreur />} />
                <Route path="*" element={<PageErreur />} /> {/* Pour gérer les routes non définies */}
                <Route path="/profile" element={<Profil />} /> {/* Page profil utilisé pour choisir l'utilisateur */}
            </Routes>
        </Router>
    )
}

export default App
