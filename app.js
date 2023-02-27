// Node.js APP set up:
const inquirer = require('inquirer');
require('console.table');

// Import class and instance methods:
const db = require('./db/index');

// Write first Inquirer prompt options that branch off into separate paths inside a main fcn:

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
      // for each choice case, send to that choice's function then break
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
            quit(); // quit option exits CLI CMS
    }
});
}

main();

viewEmployees() {
  db.findAllEmployees()
  .then(([ rows ]) => {
    let employees = rows;
    console.table(employees);
  }) 
  .then(() => main())
}

// viewRoles() & viewDepartments() ^ similar to above ^


addDepartment() {
  inquirer.prompt({
    name: 'departmentName',
    message: 'What is the name of the department?'
  })
  .then(res => {
    let departmentName = res;
    db.createDepartment(departmentName)
    .then(() => console.log(`Added ${departmentName.departmentName} to the database.`))
    .then(() => main())
  });
}

// ^ addRole() probably similar to addDepartment() ... ^

addEmployee() {
  inquirer.prompt([
    {
      name: "first_name",
      message: "What is the employees first name?"
    },
    {
      name: "last_name",
      message: "What is the employees last name?"
    }
])
.then(res => {
  let firstName = res.first_name
  let lastName = res.last_name
  db.findAllRoles()
  .then(([ rows ]) => {
    let roles = rows
    const roleChoices = roles.map(({id, title}) => ({ // destruct roles
      name: title, 
      value: id,
    }))
    inquirer.prompt({
      type: "list",
      name: "roleID",
      message: "What is the employees role?",
      choices: roleChoices
    })
    .then(res => {
      let roleID = res.roleID
      db.findAllEmployees()
      .then(([ rows ]) => {
        let employees = rows
        const managerChoices = employees.map(({id, first_name, last_name}) => ({
          name: `${first_name} ${last_name}`,
          value: id
        })) 
// add another inquirer.prompt that asks who's the employee manager, manager choces, create variable that is employee obj that you pass to db.createEmmployee
      })
    })
  })
})
}