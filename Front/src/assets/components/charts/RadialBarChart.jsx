"use client"
import PropTypes from "prop-types"
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts"
import { Fragment } from "react"
import { useState, useEffect } from "react"
import MockedService from "../../services/MockedServices"

function RadialBarStats({ id }) {
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
    const score = [
        {
            name: "Score",
            value: data.todayScore,
            fill: "#E60000",
        },
    ]
    return (
        <>
            {!isLoading && (
                <Fragment>
                    <p>Score</p>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart cx="50%" cy="50%" innerRadius="80%" outerRadius="100%" barSize={10} data={score} startAngle={90} endAngle={90 + 360 * data.todayScore}>
                            <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={50} />
                            <text x={"50%"} y={"40%"} textAnchor="middle" dominantBaseline="middle" className="progress-label">
                                {data.todayScore * 100}%
                            </text>
                            <text x={"50%"} y={"50%"} textAnchor="middle" dominantBaseline="middle" className="progress-sub-label">
                                de votre
                            </text>
                            <text x={"50%"} y={"60%"} textAnchor="middle" dominantBaseline="middle" className="progress-sub-label">
                                objectif
                            </text>
                        </RadialBarChart>
                    </ResponsiveContainer>
                </Fragment>
            )}
        </>
    )
}

RadialBarStats.propTypes = {
    id: PropTypes.number.isRequired,
}

export default RadialBarStats
