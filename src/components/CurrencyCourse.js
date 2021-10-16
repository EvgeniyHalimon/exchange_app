import React, { useState, useEffect } from 'react';
import {Table} from 'react-bootstrap';

function CurrencyCourse(){
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
    fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json&date=${year}${month}${day}`)
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
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
    return <div className="d-flex justify-content-center">
            <div className="spinner-border text-secondary" role="status">
            </div>
            </div>
    } 
    return (
        <Table striped bordered hover size="sm">
        <thead>
        <tr>
            <th>Currency name</th>
            <th>Currency code</th>
            <th>Exchange course</th>
        </tr>
        </thead>
        <tbody>
        {items.map(item => (
            <tr key={item.r030}>
                <td>{item.txt}</td>
                <td>{item.cc}</td>
                <td>{item.rate.toFixed(3)}</td>
            </tr>
        ))}
        </tbody>
    </Table>
    )
}

export default CurrencyCourse