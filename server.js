const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9344',
  database: 'classwork'
});


connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});


app.use(bodyParser.json());

// GET - Display all employees using e_name
app.get('/employees', (req, res) => {
  const eName = req.query.e_name;
  const query = `SELECT * FROM Employee_Tb WHERE e_name LIKE '%${eName}%'`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// POST - Add employee data into MySQL table
app.post('/employees', (req, res) => {
  const employeeData = req.body;
  const query = 'INSERT INTO Employee_Tb SET ?';
  connection.query(query, employeeData, (err, results) => {
    if (err) throw err;
    res.send('Employee added successfully');
  });
});

// DELETE - Delete employee from table by doj
app.delete('/employees/:doj', (req, res) => {
  const doj = req.params.doj;
  const query = `DELETE FROM Employee_Tb WHERE doj = '${doj}'`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Employee deleted successfully');
  });
});

// PUT - Update dname and doj
app.put('/employees/:id', (req, res) => {
  const id = req.params.id;
  const { dname, doj } = req.body;
  const query = `UPDATE Employee_Tb SET dname = '${dname}', doj = '${doj}' WHERE id = ${id}`;
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.send('Employee updated successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
