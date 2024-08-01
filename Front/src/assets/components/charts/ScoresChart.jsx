"use client"
import PropTypes from "prop-types"
import { Fragment } from "react"
import { useState, useEffect } from "react"
import MockedService from "../../services/MockedServices"

import calories from "../../images/calories.png"
import proteines from "../../images/Proteines.png"
import glucides from "../../images/Glucides.png"
import lipides from "../../images/Lipides.png"
function ScoresStats({ id }) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = new MockedService()
                const response = await service.getData(id.toString(), "")

                if (response) {
                    setData(response)
                    console.log(response)
                    setIsLoading(false)
                } else {
                    throw new Error("Invalid data format")
                }
            } catch (err) {
                console.log("An error occurred", err)
                setErrorMessage("Une erreur est survenue lors de la récupération des données.")
                setIsLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (errorMessage) {
        return <div>{errorMessage}</div>
    }
    return (
        <>
            {!isLoading && (
                <Fragment>
                    <div className="ScoresContainer">
                        <div className="iconContainer" id="Calories">
                            <img src={calories} alt="" />
                        </div>
                        <div className="scoresInfos">
                            <h5>{data.keyData.calorieCount}kCal</h5>
                            <p>Calories</p>
                        </div>
                    </div>
                    <div className="ScoresContainer">
                        <div className="iconContainer" id="Proteines">
                            <img src={proteines} alt="" />
                        </div>
                        <div className="scoresInfos">
                            <h5>{data.keyData.proteinCount}g</h5>
                            <p>Proteines</p>
                        </div>
                    </div>
                    <div className="ScoresContainer">
                        <div className="iconContainer" id="Glucides">
                            <img src={glucides} alt="" />
                        </div>
                        <div className="scoresInfos">
                            <h5>{data.keyData.carbohydrateCount}g</h5>
                            <p>Glucides</p>
                        </div>
                    </div>
                    <div className="ScoresContainer">
                        <div className="iconContainer" id="Lipides">
                            <img src={lipides} alt="" />
                        </div>
                        <div className="scoresInfos">
                            <h5>{data.keyData.lipidCount}g</h5>
                            <p>Lipides</p>
                        </div>
                    </div>
                </Fragment>
            )}
        </>
    )
}

ScoresStats.propTypes = {
    id: PropTypes.number.isRequired,
}

export default ScoresStats
