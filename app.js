// Node.js APP SET UP:
const inquirer = require('inquirer');
const { createDepartment } = require('./db/index');
require('console.table');

const db = require('./db/index');

// Write Inquirer prompts:

function main() {
inquirer.prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Quit']
    }
  ]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case 'View all departments': 
        viewDepartments();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployee();
        break;
          default:
            quit(); 
    }
});
}

main();


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