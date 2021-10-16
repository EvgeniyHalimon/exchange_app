import React from 'react';
import {LineChart, XAxis, Tooltip, CartesianGrid,Line,Legend, YAxis} from 'recharts';

function CurrencyChart({data}){
    return(
        <LineChart
                width={400}
                height={300}
                data={data}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis dataKey="exchangedate" />
                <YAxis dataKey="rate"/>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#ff7300" yAxisId={0} activeDot={{ r: 8 }}/>
            </LineChart>
    )
}

export default CurrencyChart