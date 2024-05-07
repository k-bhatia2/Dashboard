const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname));


const pool = new Pool({
    connectionString: 'postgresql://postgres:kakaminu2@localhost:5432/new again',
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/index.html');
});


app.post('/query', (req, res) => {
    const shedCode = req.body.shedCode;

    // Query the database
    pool.query('SELECT * FROM loco WHERE "Loco Owning Shed" = $1', [shedCode], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database query failed');
        }

        // Create an HTML table with the results
        let table = `<table border="1">
                      <tr>
                        <th>Loco Number</th>
                        <th>Loco Type</th>
                        <th>Loco Commissioning Date</th> 
                        <th>Loco Manufacturer</th> 
                        <th>Loco Control Type</th> 
                      </tr>`;

        result.rows.forEach(row => {
            table += `<tr>
                        <td>${row["Loco Owning Shed"]}</td>
                        <td>${row["Loco Type"]}</td>
                        <td>${row["Loco Commissioning Date"]}</td>
                        <td>${row["Loco Manufacturer"]}</td>
                        <td>${row["Loco Control Type"]}</td>
                      </tr>`;
        });

        table += `</table>`;

        res.send(`
            <html>
            <head>
                <title>Query Result</title>
            </head>
            <body>
                <h1>Results for Shed Code: ${shedCode}</h1>
                ${table}
                <a href="/">Back to Form</a>
            </body>
            </html>
        `);
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});

