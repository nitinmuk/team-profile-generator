const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = employees => {
  const html = [];

  employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
    .forEach(element => html.push(element));
  
  employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
    .forEach(element => html.push(element));
  employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
    .forEach(element => html.push(element));
  
  return renderMain(distributeEmployees(html).join(""));
};

const distributeEmployees = html => {
  const cards = [];
  if(html.length <= 3) {
    let template = fs.readFileSync(path.resolve(templatesDir, "employee-card-deck.html"), "utf8");
    cards.push(replacePlaceholders(template, "employees", html.join("")));    
  }
  else {
    const cardDeckCount = Math.ceil(html.length/3);
    for(let i = 0; i<cardDeckCount; i++ ) {
      const template = fs.readFileSync(path.resolve(templatesDir, "employee-card-deck.html"), "utf8");
      cards.push(replacePlaceholders(template, "employees", html.splice(0,3).join("")));
    }
  }
  return cards;  
};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "role", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "id", manager.getId());
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "role", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "id", engineer.getId());
  template = replacePlaceholders(template, "github", engineer.getGithub());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "role", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "id", intern.getId());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
};

module.exports = render;
