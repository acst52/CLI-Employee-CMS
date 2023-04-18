// Node.js APP set up:
const inquirer = require('inquirer');
const consoleTable = require('console.table');

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

function viewEmployees() {
  db.findAllEmployees()
  .then(([ rows ]) => {
    const employees = rows;
    console.table(employees);
  })
  .then(() => {
    main();
  });
}

function viewRoles() {
  db.findAllRoles()
  .then(([ rows ]) => {
    const roles = rows;
    console.table(roles);
  })
  .then(() => {
    main();
  });
}

function viewDepartments() {
  db.findAllDepartments()
  .then(([ rows ]) => {
    const departments = rows;
    console.table(departments);
  })
  .then(() => {
    main();
  });
}

function addDepartment() {
  inquirer.prompt({
    name: 'name',
    message: 'What is the name of the department?'
  })
  .then(res => {
    let departmentName = res;
    db.createDepartment(departmentName)
    .then(() => console.log(`Added ${departmentName.name} to the database.`))
    .then(() => main())
  });
}

function addRole() {
  inquirer.prompt([
  {
    name: 'title',
    message: 'What is the name of the role?'
  },
  {
    name: 'salary',
    message: 'What is the salary of this role?'
  },
  {
    name: 'department_id',
    message: 'What is the department of this role?'
  }
])
  .then(res => {
    let roleData = {
      title: res.title,
      salary: res.salary,
      department_id: res.department_id
    };
    db.createRole(roleData)
    .then(() => console.log(`Added ${roleData.title} to the database.`))
    .then(() => main())
  });
}

function addEmployee() {
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
        inquirer.prompt({
          type: "list",
          name: "managerID",
          message: "Who is the employees manager?",
          choices: managerChoices
        })
        .then(res => {
          let managerID = res.managerID;
          // create variable that is employee obj that you pass to db.createEmployee:
          let employee = {
            first_name: firstName,
            last_name: lastName,
            role_id: roleID,
            manager_id: managerID
          };
          db.createEmployee(employee)
          .then(() => console.log(`${firstName} ${lastName} added to the database!`))
          .then(() => main());
        });
        });
      });
    });
  });
}

async function updateEmployee() {
  const employeeChoices = (await db.findAllEmployees())[0].map(employee => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const roleChoices = (await db.findAllRoles())[0].map(role => ({
    name: role.title,
    value: role.id,
  }));

  const { employeeId, newRoleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee would you like to update?',
      choices: employeeChoices,
    },
    {
      type: 'list',
      name: 'newRoleId',
      message: 'What is the new role of this employee?',
      choices: roleChoices,
    },
  ]);
  
  db.updateEmployeeRole(employeeId, newRoleId)
    .then(() => console.log(`Updated employee's role in the database.`))
    .then(() => main());
}