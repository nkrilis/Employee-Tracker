// imports
const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');
require('dotenv').config();
// import console.table
const cTable = require('console.table'); 

const PORT = process.env.PORT || 3004;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: process.env.DB_USER,
      // MySQL password
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to the employee_db database.`),
  );

  
const userSelections = () =>
{
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View all Departments',
                      'View all Roles',
                      'View all Employees',
                      'Add a Department',
                      'Add a Role',
                      'Add an Employee',
                      'Update an Employee Role']

        }
    ])
    .then((selection) => 
    {
        const {choices} = selection;

        if (choices === 'View all Departments')
        {
            const sql = `SELECT * FROM departments`;

            db.query(sql, function (err, results)
            {
                console.log('\n');
                console.table(results);

                userSelections();
            });

        }

        if (choices === 'View all Roles')
        {
          const sql = `SELECT 
                      roles.id AS id,
                      roles.title AS title,
                      departments.name AS department,
                      roles.salary AS salary
                      FROM roles
                      JOIN departments
                      ON roles.department_id = departments.id`;

            db.query(sql, function (err, results)
            {
                console.log('\n');
                console.table(results);
                
                userSelections();
            });

        }

        if (choices === 'View all Employees')
        {
          const sql = `SELECT 
                      e.id AS id,
                      e.first_name AS first_name,
                      e.last_name AS last_name,
                      roles.title AS title,
                      departments.name AS department,
                      roles.salary AS salary,
                      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                      FROM employees e
                      LEFT JOIN roles
                      ON roles.id = e.role_id
                      LEFT JOIN departments
                      ON departments.id = roles.department_id
                      LEFT JOIN employees manager
                      ON e.id = manager.manager_id`;

            db.query(sql, function (err, results)
            {
                console.log('\n');
                console.table(results);
                
                userSelections();
            });

        }



    });
};

userSelections();