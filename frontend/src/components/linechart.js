import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const LineGraph = ({ data }) => {
    
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='work_year'/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='averageSalaryUSD' stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="totalJobs" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineGraph