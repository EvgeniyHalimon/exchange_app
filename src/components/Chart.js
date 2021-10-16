import React, { useState, useEffect } from 'react';
import {LineChart, XAxis, Tooltip, CartesianGrid,Line,Legend, YAxis} from 'recharts';
import {Table} from 'react-bootstrap';

function Chart(){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [current, setCurrent] = useState([])
    const [chart, setChart] = useState([])
    const [currencyState, setCurrencyState] = useState("") 

    const fetchCurrency = () => { 
        fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`)
        .then(res => res.json())
        .then(
        (result) => {
            setIsLoaded(true)
            setItems(result)
        },
        (error) => {
            setIsLoaded(true)
            setError(error)
        }
        )
    }

    const fetchForPeriod = (valCode) => {
    let res = []
    let chartRes = []
    for (let i = 0; i < 7; i++) {
        let d = new Date()
        let timestamp = d.setDate(d.getDate()-i)
        let date = new Date(timestamp)
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
    if(month < 10){
        month = `0${month}`
    }
    if(day < 10){
        day = `0${day}`
    }

    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=${valCode}&date=${year}${month}${day}`)
        .then(res => res.json())
        .then(
            (result) => {
                res.unshift(result[0])
                chartRes.push(result[0])
                setCurrent([...res])
                setChart([...chartRes])
            },
            (error) => {
                setIsLoaded(true)
                setError(error)
            }
        )  
        }
    }

    useEffect(() => {
        fetchForPeriod(currencyState)
        fetchCurrency()
    }, [currencyState])

    chart.sort((a, b) => {
        if (a.exchangedate > b.exchangedate) {
        return 1
        }
        if (a.exchangedate < b.exchangedate) {
        return -1
        }
        return 0
    })

    current.sort((a, b) => {
        if (a.exchangedate < b.exchangedate) {
        return 1
        }
        if (a.exchangedate > b.exchangedate) {
        return -1
        }
        return 0
    })

    let i = 0 

    if (error) {
        return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
        return <div className="d-flex justify-content-center">
                <div className="spinner-border text-secondary" role="status">
                </div>
            </div>
    } 
        return (
        <>
            <select
                className="select"
                value={currencyState}
                onChange={(e) => {
                    setCurrencyState(e.target.value)
                }
            }
            >
                {items.map(item => (
                    <option value={item.cc} key={item.r030}>
                    {item.cc}
                    </option>
                ))}
            </select>
            
            <Table className="currency-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Currency name</th>
                        <th>Exchange course</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {current.map((item) => (
                        <tr key={i++}>
                            <td>
                                {item.txt}  
                            </td>
                            <td>
                                {item.rate.toFixed(3)}  
                            </td>
                            <td>
                                {item.exchangedate}  
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <LineChart
            width={400}
            height={300}
            data={chart}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="exchangedate" />
                <YAxis dataKey="rate"/>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#ff7300" yAxisId={0} activeDot={{ r: 8 }}/>
            </LineChart>
        </>
        )
}

export default Chart