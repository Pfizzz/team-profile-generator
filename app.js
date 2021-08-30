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
        .then((data) => {
            const intern = new Intern(
                employeeData.name,
                employeeData.id,
                employeeData.email,
                employeeData.officeNumber,
                data.school
            );

            team.push(intern);

            if(data.employeeConfirm === true) {
                generateEmployee();
            } else {
                generateTeam();
            }
        })
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
        .then((data) => {
            const manager = new Manager(
                employeeData.name,
                employeeData.id,
                employeeData.email,
                employeeData.officeNumber,
                data.officeNumber
            );

            team.push(manager);

            if(data.employeeConfirm === true) {
                generateEmployee();
            } else {
                generateTeam();
            }
        })
}

function generateTeam() {
    fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR)
    fs.writeFileSync(outputPath, render(team), "utf-8")
}

generateEmployee();