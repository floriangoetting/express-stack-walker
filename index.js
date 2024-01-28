const express = require('express')
const cors = require('cors')
const {expressStack} = require('./stacks/expressStack')
const {logDestination} = require('./config/destinations')
const {analystContract} = require('./config/contracts')

const app = express()
app.use(cors())
app.use(express.text({ type: 'text/plain' }))

//configure and initialize node client
const { elb, push } = expressStack({
    destinations: { logDestination }, // Static destinations
    contracts: [analystContract], // Enforce contracts
    onError: console.error, // Handle errors
});

//configure endpoint
app.post('/measure', async (req, res) => {
    try {
        const result = await push(req, res);

        return res.status(200).send({
            status: result.status,
            successfull: result.successful.length,
            failed: result.failed.length,
            queued: result.queued.length,
        });
    } catch (error){
        console.log(error)
        error = String(error)
        return res.status(400).send({ error });
    }
})

app.listen(process.env.PORT || 3001, () => console.log('App available on http://localhost:3001'))