const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter employee name',
    },
    {
        type: 'input',
        name: 'id',
        message: answers => `Please enter ${answers.name}'s employee id`,
    },
    {
        type: 'input',
        name: 'email',
        message: answers => `Please enter ${answers.name}'s email id`,
    },
    {
        type: 'list',
        name: 'role',
        message: answers => `Please enter ${answers.name}'s role`,
        choices: ['Intern', 'Engineer'],
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: answers => `Please enter ${answers.name}'s office number`,
        validate: (value) => {
            const pass = value.match(
                /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
            );
            if (pass) {
                return true;
            }
            return 'Please enter a valid phone number';
        },
        when: answers => !answers.role,
    },
    {
        type: 'input',
        name: 'githubUser',
        message: answers => `Please enter ${answers.name}'s github username`,
        when: answers => answers.role === 'Engineer',
    },
    {
        type: 'input',
        name: 'schoolName',
        message: answers => `Please enter ${answers.name}'s school name`,
        when: answers => answers.role === 'Intern',
    },
    {
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to enter more team members?',        
    }
]

module.exports = questions;