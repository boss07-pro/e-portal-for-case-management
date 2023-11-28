const connectToMongo = require('./db');
var cors = require('cors');

connectToMongo();
const express = require('express')
const app = express()

app.use(cors());



const port = 5000
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`e-court backend listening on port ${port}`)
})
