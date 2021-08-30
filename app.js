const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function generateEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the employee's name?",
                name: "name",
                validate: (nameInput) => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("What's your name?");
                        return false;
                    }
                }
            },
            {
                type: "list",
                message: "What is the employee's role?",
                choices: ["Engineer", "Manager", "Intern"],
                name: "role",
            },
            {
                type: "input",
                message: "What is the employee's e-mail address?",
                name: "email",
            },
            {
                type: "input",
                message: "What is the employee's ID number?",
                name: "id",
                validate: (idInput) => {
                    if (isNaN(idInput)) {
                        console.log("Please enter a valid number");
                        return false;
                    } else if (!idInput) {
                        console.log("Please enter a valid ID number!");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                message: "What is the employee's office number?",
                name: "officeNumber",
            },
        ])
        .then((data) => {
            console.log(data);
            if (data.role === "Engineer") {
                engineerQuestions(data);
            } else if (data.role === "Intern") {
                internQuestions(data);
            } else {
                managerQuestions(data);
            }

        });
}

function engineerQuestions(employeeData) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "gitHub",
                message: "What is the employee's Github username?",
                validate: (githubInput) => {
                    if (!githubInput) {
                        console.log("Please enter a vlid Github username");
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "confirm",
                message: "Would you like to add another employee?",
                name: "employeeConfirm"
            },
        ])
        .then((data) => {
            const engineer = new Engineer(
                employeeData.name,
                employeeData.id,
                employeeData.email,
                employeeData.officeNumber,
                data.github
            );

            team.push(engineer);

            if(data.employeeConfirm === true) {
                generateEmployee();
            } else {
                generateTeam();
            }
        })
}

function internQuestions(employeeData) {
    inquirer
        .prompt([
            {
            type: "input",
            name: "school",
            message: "Where does the employee attend school?",
            validate: (schoolInput) => {
                if(!schoolInput) {
                    console.log("Please enter a school name.");
                    return false;
                } else {
                    return true;
                }
            }
            },
            {
                type: "confirm",
                message: "Would you like to add another employee?",
                name: "employeeConfirm"
            },
        ])
}

function managerQuestions(employeeData) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "officeNumber",
                message: "What is the manager's office phone number?",
                validate: (officeInput) => {
                    if (!officeInput) {
                    console.log("Please enter an office phone number");
                    return false;
                } else {
                    return true;
                    }
                }
            },
            {
                type: "confirm",
                message: "Would you like to add another employee?",
                name: "employeeConfirm"
            },
        ])
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

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

generateEmployee();