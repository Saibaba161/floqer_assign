const data = require('./schema')

const getData = async(req, res) => {
    
    try {
        const aggregatedData = await data.aggregate([
            {
                $group: {
                    _id: "$work_year",
                    totalJobs: { $sum : 1},
                    averageSalaryUSD: { $avg: "$salary_in_usd"}
                }
            },
            {
                $project: {
                    year: "$_id",
                    totalJobs: 1,
                    averageSalaryUSD: { $round: ["$averageSalaryUSD", 2] }
                }
            },
            {
                $sort: { year: 1}
            }
        ]);
        res.set('Access-Control-Allow-Origin', '*');
        res.json(aggregatedData)

    } catch(error) {
        res.status(500).json(error)
    }
}

const getSingleData = async(req, res) => {
    const { year } = req.body
    console.log('Received year:', year)

    const parsedYear = parseInt(year)

    if(!parsedYear) {
        return res.status(400).json("Year not found")
    }

    try {
        const jobTitles = await data.aggregate([
            { $match: { work_year: parsedYear } },
            { $group: { _id: "$job_title", job_count: { $sum : 1}}},
            { $project: { job_title: "$_id", job_count: 1, _id: 0 }}
        ])

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true')
        res.json(jobTitles)

    } catch(error) {
        res.status(500).json(error)
    }
}

module.exports = { getData, getSingleData }