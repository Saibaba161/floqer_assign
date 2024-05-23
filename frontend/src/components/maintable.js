import { useState, useEffect } from "react";
import { Button, Select, Table, Typography } from 'antd'
import LineGraph from "./linechart";

const { Title } = Typography

const MainTable = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedYear, setSelectedYear] = useState(null)
    const [showSecondTable, setShowSecondTable] = useState(false);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('https://floqer-assign-backend.vercel.app/api/data', { mode: 'cors'},
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Request-Method': 'GET'
                    },
                })
                const result = await response.json()

                setData(result)
                setLoading(false)

            } catch(error) {
                console.log(error)
                setLoading(false)
            }
        };

        fetchData()
    }, []);

    const handleRowClick = async(year) => {

        try {
            const response = await fetch('/api/data/:year', { mode: 'cors'},
            {
                method: 'POST',
                body: JSON.stringify({ year }),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Request-Method': 'POST',
                    'Content-Type': 'application/json'
                },
            })

            const result = await response.json()

            setSelectedYear(result)
            setShowSecondTable(true)
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleCancelClick = () => {
        setShowSecondTable(false)
        setSelectedYear(null)
    }

    const handlePageSizeChange = (value) => {
        setPageSize(value)
    }

    const columns = [
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
            sorter: (a, b) => a.year - b.year,
            render: text => <b>{text}</b>,
            onCell: record => ({
                onClick: () => handleRowClick(record.year)
            }),
        },
        {
            title: 'Total Jobs',
            dataIndex: 'totalJobs',
            key: 'totalJobs',
            sorter: (a, b) => a.totalJobs - b.totalJobs
        },
        {
            title: 'Average Salary (USD)',
            dataIndex: 'averageSalaryUSD',
            key: 'averageSalaryUSD',
            sorter: (a, b) => a.averageSalaryUSD - b.averageSalaryUSD
        }
    ]

    const jobColumns = [
        {
            title: 'Job Title',
            dataIndex: 'job_title',
            key: 'job_title'
        },
        {
            title: 'Number of Jobs',
            dataIndex: 'job_count',
            key: 'job_count'
        }
    ]

    return (
        <div className="table-container">
            <Title level={2} className="table-title"> ML Engineer Salaries (2020 - 2024) </Title>
            <Table
                dataSource={data}
                columns={columns}
                loading={loading}
                rowKey="year"
                bordered
                className="styled-table"
                pagination={false}
            />

            {selectedYear && (
                <div className={`table-container ${!showSecondTable ? 'hide' : ''}`}>
                    <div className="close-button">
                        <Title level={2} className="table-title">Job Titles for The Selected Year</Title>
                        
                        <Button onClick={handleCancelClick}>Close Table</Button>
                        
                        <span style={{marginLeft: '10px'}}>Records per page: </span>
                        
                        <Select defaultValue={5} onChange={handlePageSizeChange} style={{marginLeft:'10px'}}
                            options={[
                                {
                                    value:'5',
                                    label:'5',
                                },
                                {
                                    value:'10',
                                    label:'10',
                                },
                                {
                                    value:'15',
                                    label:'15',
                                },
                                {
                                    value:'20',
                                    label:'20',
                                },
                            ]}
                        />

                    </div>

                    <Table
                        dataSource={selectedYear}
                        columns={jobColumns}
                        rowKey="job_title"
                        bordered
                        className="styled-table"
                        pagination={{pageSize: pageSize}}
                    />

                </div>
            )}

            <Title level={3} className="chart-title">Job Trend Over The Years</Title>
            <div className="chart-container">
                {!loading && data.length > 0 ? <LineGraph data={data} /> : <p>Loading chart data...</p>}
            </div>
        </div>
    )
}


export default MainTable