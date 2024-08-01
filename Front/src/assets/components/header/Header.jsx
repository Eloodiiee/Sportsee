import { NavLink } from "react-router-dom"
import logoSportsee from "../../images/logo.png"

/** Ce component permet d'afficher le header avec le nav **/

const Header = () => {
    return (
        <header>
            <img src={logoSportsee} alt="logo Sportsee" />
            <nav>
                <NavLink to="/">Accueil</NavLink>

                <NavLink to="/profile">Profil</NavLink>

                <NavLink to="/settings">Réglage</NavLink>

                <NavLink to="/community">Communauté</NavLink>
            </nav>
        </header>
    )
}
export default Header
