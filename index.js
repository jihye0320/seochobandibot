const express = require('express')
const http = require('http')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).send('Server is working')
})


app.listen(port, () => {
    console.log(`Server is runnint at https://localhost:${port}`)
})