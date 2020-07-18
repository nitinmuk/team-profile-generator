const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./lib/questions");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const managerQuestions = questions.filter(question => (question.name =='name' || question.name=='id'
                          || question.name=='email' || question.name=='officeNumber'));
console.log("Welcome to Team Profile Generator. Let us build an engineering team");
console.log("First of all, enter manager's details as requested below.");
acceptManagerEmployee();

/**
 * accepts manager's details and then invoke function to accept other employees details.
 */
function acceptManagerEmployee() {
    inquirer.prompt(managerQuestions).then(answers => {
        const emp = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(emp);
        console.log("Thanks for sharing manager's details, please enter other team members details as requested below");
        acceptEmployees();
    })
}

/**
 * accepts non manager employees details recursively
 */
function acceptEmployees() {
    inquirer.prompt(questions).then(answers => {
        let emp;
        switch (answers.role) {
            case 'Engineer':
                emp = new Engineer(answers.name, answers.id, answers.email, answers.githubUser);
                break;
            case 'Intern':
                emp = new Intern(answers.name, answers.id, answers.email, answers.schoolName);
                break;
        }
        employees.push(emp);
        if (answers.continue) {
            acceptEmployees();
        }
        else {
            console.log("Thanks for providing all details. Generating Team profile in output folder..");
            writeToFile(render(employees));
        }
    });
}

const writeToFile = (html) => {
    // check if output folder exists, if not create same
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdir(OUTPUT_DIR, error => error ? console.log(error) : console.log("Output folder created..."));      
    }
    fs.writeFile(outputPath, html, error =>
        error ? console.log(error) : console.log("team.html generated successfully in output folder.")
    );

}