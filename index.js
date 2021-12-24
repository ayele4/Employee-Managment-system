const {prompt} = require('inquirer');
const { connect } = require('./db/connection');
const connection = require("./db/connection");
require("console.table")

startApp();

function startApp() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What action would you like to do?',
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View All Employees By Department',
                    value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
                },
                {
                    name: 'View All Employees By Manager',
                    value: 'VIEW_EMPLOYEES_BY_MANAGER'
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE'
                },
                {
                    name: 'Remove Employee',
                    value: 'REMOVE_EMPLOYEE'
                },
                {
                    name: 'Update Employee Manager',
                    value: 'UPDATE_EMPLOYEE_MANAGER'
                },
                {
                    name: 'Update Employee Role',
                    value: 'UPDATE_EMPLOYEE_ROLE'
                },
                {
                    name: 'View Roles',
                    value: 'VIEW_ROLES'
                },
                {
                    name: 'Add Roles',
                    value: 'ADD_ROLES'
                },
                {
                    name: 'Remove Role',
                    value: 'REMOVE_ROLE'
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_ALL_DEPARTMENTS'
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT'
                },
                {
                    name: 'Remove Department',
                    value: 'REMOVE_DEPARTMENT'
                },
                {
                    name: 'Quit',
                    value: 'QUIT'
                },
            ]
        }
    ]).then(res => {
        let choice = res.choice;

        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_DEPARTMENT":
                viewEmployeesByDepartment();
                break;
            
                
        }
    })
}

function viewEmployees() {
    connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;   "
    ).then(([rows]) => {
        let employees = rows;
        console.table(employees);
    }).then(() => startApp());
}

function viewEmployeesByDepartment() {
    connection.promise().query(
        "SELECT department.id, department.name FROM department"
    )
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({
            id, name}) => ({
                name: name,
                value: id
            }));
        function viewEmployees() {
            RTCPeerConnectionIceEvent.promise().Query(
                "SELECT department.id, department.name From department"
            )
        }
            
    
        

            prompt([
                {
                    type: "list",
                    name: 'departmentId',
                    message: "Which departments employees would you like to view?",
                    choices: departmentChoices
                }
            ])
            .then(res => connection.promise().query(
                `SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id WHERE department.id = ${res.departmentId};`
            )).then(([rows]) => {
                let employees = rows;
                console.table(employees);
            })
            .then(() => startApp())
    })
        }
