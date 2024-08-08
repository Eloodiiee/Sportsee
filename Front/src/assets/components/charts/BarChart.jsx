import PropTypes from "prop-types"
import { Fragment, useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from "recharts"
import MockedService from "../../services/MockedServices"

function BarStats({ id }) {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = new MockedService()
                const response = await service.getData(id.toString(), "activity")

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
    console.log(data)
    const currentDay = (date) => date.split("-")[2]

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bar-marker">
                    <p>{`${payload[0].value} kg`}</p>
                    <p>{`${payload[1].value} kcal`}</p>
                </div>
            )
        }
    }
    return (
        <>
            {!isLoading && (
                <Fragment>
                    <div className="activityContainer">
                        <p className="dailyActivity">Activité quotidienne</p>
                        <ResponsiveContainer width="100%" aspect={3}>
                            <BarChart
                                width={500}
                                height={200}
                                data={data.sessions}
                                margin={{
                                    top: 15,
                                    right: 15,
                                    left: 30,
                                    bottom: 15,
                                }}
                            >
                                <CartesianGrid horizontal="true" vertical="" strokeDasharray="3" />
                                <XAxis axisLine={false} tickLine={false} dataKey="day" tickFormatter={currentDay} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} orientation="left" dataKey="calories" hide={true} />
                                <YAxis yAxisId="right" axisLine={false} tickLine={false} orientation="right" dataKey="kilogram" />
                                <Tooltip content={CustomTooltip} />
                                <Legend verticalAlign="top" align="right" height={70} iconType="circle" />
                                <Bar
                                    yAxisId="right"
                                    barSize={7}
                                    radius={[10, 10, 0, 0]}
                                    dataKey="kilogram"
                                    fill="#282D30"
                                    name="Poids (kg)" // Added custom name for the legend label (Weight in kg)
                                />
                                <Bar
                                    yAxisId="left"
                                    barSize={7}
                                    radius={[10, 10, 0, 0]}
                                    dataKey="calories"
                                    fill="#E60000"
                                    name="Calories brûlées (kCal)" // Added custom name for the legend label (Burned Calories in kCal)
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Fragment>
            )}
        </>
    )
}

BarStats.propTypes = {
    id: PropTypes.number.isRequired,
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.number,
        })
    ),
}

export default BarStats
