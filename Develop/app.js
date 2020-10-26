const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptUser(answers) {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What is your role?",
                name: "role",
                choices: ["Manager", "Engineer", "Intern"],
            },
        ])
        .then((answers) => {
            if (answers.role === "Manager") {
                addManager();
            } else if (answers.role === "Engineer") {
                addEngineer();
            } else if (answers.role === "Intern") {
                addIntern();
            }
        });
}

function addManager(answers) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the manager's name?",
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the manager's ID number?",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the manager's email?",
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is the manager's office number?",
            },
            {
                type: "list",
                name: "addEmployee",
                message: "Would you like to add another employee?",
                choices: ["Yes", "No"],
            },
        ])
        .then((answers) => {
            let manager = new Manager(
                answers.managerName,
                answers.managerID,
                answers.managerEmail,
                answers.managerOfficeNumber
            );
            employees.push(manager);
            if (answers.addEmployee === "Yes") {
                promptUser();
            } else {
                renderHTML();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function addEngineer(answers) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is the engineer's ID number?",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email address?",
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is the engineer's github link?",
            },
            {
                type: "list",
                name: "addEmployee",
                message: "Would you like to add another employee?",
                choices: ["Yes", "No"],
            },
        ])
        .then((answers) => {
            let engineer = new Engineer(
                answers.engineerName,
                answers.engineerID,
                answers.engineerEmail,
                answers.engineerGithub
            );
            employees.push(engineer);
            if (answers.addEmployee === "Yes") {
                promptUser();
            } else {
                renderHTML();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function addIntern(answers) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the Intern's name?",
            },
            {
                type: "input",
                name: "internID",
                message: "What is the intern's ID number?",
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email address?",
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school does the intern attend?",
            },
            {
                type: "list",
                name: "addEmployee",
                message: "Would you like to add another employee?",
                choices: ["Yes", "No"],
            },
        ])
        .then((answers) => {
            let intern = new Intern(
                answers.internName,
                answers.internID,
                answers.internEmail,
                answers.internSchool
            );
            employees.push(intern);
            if (answers.addEmployee === "Yes") {
                promptUser();
            } else {
                renderHTML();
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function renderHTML() {
    return writeFileAsync("team.html", render(employees), "utf-8");
}

promptUser();
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
