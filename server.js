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
    // Ask user for what they want to do
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

        // View all departments
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
        // View all Roles
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
        // View all employees with information from all three tables
        if (choices === 'View all Employees')
        {
          const sql = `SELECT 
                    employees.first_name, 
                    employees.last_name, 
                    roles.title, 
                    roles.salary, 
                    departments.name AS department, 
                    CONCAT(e.first_name, ' ' ,e.last_name) AS Manager 
                    FROM employees 
                    INNER JOIN roles 
                    on roles.id = employees.role_id 
                    INNER JOIN departments 
                    on departments.id = roles.department_id 
                    left join employees e 
                    on employees.manager_id = e.id;`;

            db.query(sql, function (err, results)
            {
                console.log('\n');
                console.table(results);
                
                userSelections();
            });

        }
        // Add a new department to the departments table
        if (choices === 'Add a Department')
        {

            inquirer.prompt 
            ([
                {
                    type: 'input',
                    name: 'department',
                    message: 'What is the name of the new department?',
                    validate: department =>
                    {
                        if(department)
                        {
                            return true;
                        }
                        else
                        {
                            console.log("Please enter a department name!");
                            return false;
                        }
                    }
                }
            ])
            .then ((data) =>
            {
                const sql = `INSERT INTO departments (name)
                             VALUES  (?)`;

                db.query(sql, data.department, function (err, results)
                {
                    console.log('\n');
                    console.log(`The ${data.department} has been added to departments.`);
                    
                    userSelections();
                });

            });

        }
        // Add a new role to the roles table
        if (choices === 'Add a Role')
        {

            inquirer.prompt ([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the name of the role?',
                    validate: title =>
                    {
                        if(title)
                        {
                            return true;
                        }
                        else
                        {
                            console.log("Please enter a Role!");
                            return false;
                        }
                    }
                },

                {
                    type: 'input',
                    name: 'salary',
                    message: "What is this Role's salary?"
                },

            ])
            .then((info) =>
            {
                const roles = `SELECT name, id FROM departments`;

                db.query(roles, function (err, data)
                {
                    const deptList = data.map(({name, id}) => ({name: name, value: id}));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'department',
                            message: 'Which department does this Role belong to?',
                            choices: deptList
                        }
                    ])
                    .then((deptSel) =>
                    {
                        const sql = `INSERT INTO roles (title, salary, department_id)
                                     VALUES  (?, ?, ?)`;
                        const args = [info.title, info.salary, deptSel.department];

                        db.query(sql, args, function (err, values)
                        {
                            console.log(`The ${info.title} role has been added succesfully!`);

                            userSelections();
                        });
                    });
                });
            });

        }
        // Add a new Employee to the employees table
        if(choices === 'Add an Employee')
        {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the Employee's first name?"
                },

                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the Employee's last name?"
                }
            ])
            .then((names) =>
            {
                const roles = `SELECT roles.id, roles.title FROM roles`;

                db.query(roles, function (err, info)
                {
                    const roleList = info.map(({id, title}) => ({name: title, value: id}));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'role',
                            message: 'Which Role does this employee have?',
                            choices: roleList
                        }
                    ])
                    .then((roleSel) =>
                    {
                        const emps = `SELECT employees.id, employees.first_name, employees.last_name FROM employees`;

                        db.query(emps, function (err, res)
                        {
                            const empList = res.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "Who is this Employee's manager?",
                                    choices: empList
                                }
                            ])
                            .then((managerSel) =>
                            {
                                const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES  (?, ?, ?, ?)';

                                // console.log(`${names.firstName} ${names.lastName} ${roleSel.role} ${managerSel.manager}`)

                                const args = [names.firstName, names.lastName, roleSel.role, managerSel.manager];
                                
                                db.query(sql, args, function (err, data)
                                {
                                    console.log(`${names.firstName} ${names.lastName} is a ${roleSel.role} `);

                                    userSelections();
                                });
                                // db.query(sql, names.firstName, names.lastName, roleSel.role, managerSel.manager, function (err, info)
                                // {
                                //     console.log(`${names.firstName} ${names.lastName} has been added as an employee`);

                                //     userSelections();
                                // });
                            });
                        });
                    });
                });
            });
        }
        // Update an existing employee's role 
        if(choices === 'Update an Employee Role')
        {
            const emps = `SELECT employees.id, employees.first_name, employees.last_name FROM employees`;

            db.query(emps, function (err, res)
            {
                const empList = res.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value: id}));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'emp',
                        message: "Which Employee's Role would you like to update?",
                        choices: empList
                    }
                ])
                .then((empSel) =>
                {
                    const roles = `SELECT roles.id, roles.title FROM roles`;

                    db.query(roles, function (err, info)
                    {
                        const roleList = info.map(({id, title}) => ({name: title, value: id}));
    
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'role',
                                message: 'Which Role do you want for this employee?',
                                choices: roleList
                            }
                        ])
                        .then((roleSel) =>
                        {
                            const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;

                            const args = [roleSel.role, empSel.emp];

                            db.query(sql, args, function (err, info)
                            {
                                console.log(`Employee has been updated!`);

                                userSelections();
                            });

                        });
                    });
                });
            });
        }



    });
};
// Call main function
userSelections();

