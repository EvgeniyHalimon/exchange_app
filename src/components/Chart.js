import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import CurrencyChart from './CurrencyChart';

function Chart(){
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [current, setCurrent] = useState([])
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
        for (let i = 0; i < 9; i++) {
            let d = new Date()
            let q = d.toISOString().split('T')[0].split("-").join("") - i

            fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&valcode=${valCode}&date=${q}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        res.push(result[0])
                        setCurrent([...res])
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
    }, [currencyState])

    useEffect(() => {
        fetchCurrency()
    }, [])

    current.sort((a, b) => {
        if (a.exchangedate < b.exchangedate) {
        return 1
        }
        if (a.exchangedate > b.exchangedate) {
        return -1
        }
        return 0
    })

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
            
            <div className="block">
            <Table className="currency-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Currency name</th>
                        <th>Exchange course</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {current.map((item,index) => (
                        <tr key={index}>
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
            <CurrencyChart
                width={400}
                height={300}
                data={current.reverse()}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            />
            </div>
        </>
        )
}

export default Chart