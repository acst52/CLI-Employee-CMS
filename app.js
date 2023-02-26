// Node.js APP SET UP:
const inquirer = require('inquirer');

// Import MySQL connection:
const sequelize = require('./config/connection');

// Synchronize the db by importing Sequelize models & calling the sync() method on the Sequelize instance - this will create the tables and columns in the db
const Department = require('./models/Department');
const Employee = require('./models/Employee');
const Role = require('./models/Role');

sequelize.sync({ force: true }).then(() => {
    console.log('Database synchronized');
  }).catch((error) => {
    console.error('Error synchronizing database:', error);
});


// Write Inquirer prompts:

inquirer.prompt([
    {
      type: 'list',
      name: 'viewDepartments',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
  ]).then((answers) => {
    switch (answers.viewDepartments) {
      case 'View all departments':
        Department.findAll().then((departments) => {
          console.table(departments);
        }).catch((error) => {
          console.error(error);
        });
        break;
      case 'View all roles':
        // code to view all roles
        break;
      case 'View all employees':
        // code to view all employees
        break;
      case 'Add a department':
        // code to add a department
        break;
      case 'Add a role':


    }
});



// Write code to handle ea option dep on user selection:
  // EX: "View all departments" option handling:

connection.query('SELECT * FROM department', (err, results) => {
    if (err) throw err;
    console.table(results);
    // return to the main prompt
  });


// MySQL COMPANY EMPLOYEE DATABASE SET UP:

// CREATE TABLE department (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(30) NOT NULL
//   );
  
//   CREATE TABLE role (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(30) NOT NULL,
//     salary DECIMAL(10, 2) NOT NULL,
//     department_id INT NOT NULL,
//     FOREIGN KEY (department_id) REFERENCES department(id)
//   );
  
//   CREATE TABLE employee (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     first_name VARCHAR(30) NOT NULL,
//     last_name VARCHAR(30) NOT NULL,
//     role_id INT NOT NULL,
//     manager_id INT,
//     FOREIGN KEY (role_id) REFERENCES role(id),
//     FOREIGN KEY (manager_id) REFERENCES employee(id)
//   );

// OR USE SEQUELIZE PKG