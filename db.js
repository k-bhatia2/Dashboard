const { Pool, Client } = require('pg')


const connectionString = 'postgressql://postgres:kakaminu2@localhost:5432/new again'


//Creating Client
const client = new Client({
    connectionString: connectionString
})


client.connect()
client.query('Select * from loco', (err, res) => {
    console.log(err, res)
    //client.end()
})