import { NavLink } from "react-router-dom"
import logoSportsee from "../../images/logo.png"

/** Ce component permet d'afficher le header avec le nav **/

const Header = () => {
    return (
        <header>
            <img src={logoSportsee} alt="logo Sportsee" />
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Accueil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profil</NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings">Réglage</NavLink>
                    </li>
                    <li>
                        <NavLink to="/community">Communauté</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
export default Header
