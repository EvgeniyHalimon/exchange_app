import React from 'react';
import {LineChart, XAxis, Tooltip, CartesianGrid,Line,Legend, YAxis} from 'recharts';

function CurrencyChart({width, height, data, margin}){
    
    return(
        <LineChart
                width={width}
                height={height}
                data={data}
                margin={margin}
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