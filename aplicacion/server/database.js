const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'avicolaelmanantial'
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to DB', err);
        return;
    }
    console.log('Connected to DB');
})

module.exports = connection;