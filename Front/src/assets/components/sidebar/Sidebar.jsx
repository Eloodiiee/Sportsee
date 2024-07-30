import meditating from "../../images/meditating.png"
import swimming from "../../images/swimming.png"
import bike from "../../images/bike.png"
import weight from "../../images/weight.png"

/**Ce component permet d'afficher le sidebar **/
const SideBar = () => {
    return (
        <aside>
            <div className="sidebar">
                <img src={meditating} alt="icon-1"></img>
                <img src={swimming} alt="icon-2"></img>
                <img src={bike} alt="icon-3"></img>
                <img src={weight} alt="icon-4"></img>
            </div>
            <p> Copyright, SportSee 2020 </p>
        </aside>
    )
}

export default SideBar
