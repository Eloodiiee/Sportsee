import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./assets/components/header/Header"
import Sidebar from "./assets/components/sidebar/Sidebar"
import Accueil from "./pages/index"

/** Permet d'afficher les éléments de base de chaque pages et de définir les Url utilisés **/
function App() {
    return (
        <Router>
            <Header />
            <Sidebar />
            <Routes>
                <Route path="/" element={<Accueil />} />
            </Routes>
        </Router>
    )
}

export default App
