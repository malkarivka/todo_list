import domManipulation from './dom_manipulation.js';

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    // localStorage.setItem('projects', JSON.stringify(projects));
    // this.tr = (domManipulation.renderTodo(this));
  };
  toggle() {
    this.complete == false ? this.complete = true : this.complete = false;
  }
  delete(project) {
    this.row.parentNode.removeChild(this.row);
    project.list = project.list.filter(todo => todo !== this);
  };
};

class Project {
  constructor(title = 'New Project') {
    this.id = id++; // necessary?
    this.title = title;
    this.list = [];
    this.li = (domManipulation.addProject(this));
    // localStorage.setItem('projects', JSON.stringify(projects));
    // console.log(localStorage.getItem('projects'))
    // console.log(JSON.parse(localStorage.getItem('projects')))
  };
  static create() {
    let newProject = new Project();
    projects.push(newProject);
    currentProject = newProject;
    domManipulation.renderList(newProject);
  };
  delete() {
    this.li.parentNode.removeChild(this.li);
    projects = projects.filter(project => project !== this);
    projects.length > 0 ? domManipulation.renderList(projects[0]) : Project.create();
  };
};

let id = 0;
let currentProject;
let projects = [];
// let projects;
// if (localStorage.getItem('projects')) {
//   projects = JSON.parse(localStorage.getItem('projects'));
//   add reviver parameter?
// } else {
//   projects = [];
//   Project.create();
// }
document.getElementById('new_project').addEventListener('click', Project.create);
document.getElementById('new_todo').addEventListener('click', function() {
  domManipulation.renderTodoForm(currentProject);
  document.getElementById('submit').onclick = function() {
    document.getElementById('modal').style.display = 'none';
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let priority = document.getElementById('priority').value;
    let newTodo = new Todo(title, description, dueDate, priority);
    currentProject.list.push(newTodo);
    domManipulation.renderTodo(newTodo, currentProject);
  };
});
domManipulation.renderProjects(projects);
Project.create();

// console.log(JSON.parse(window.localStorage.getItem('projects')))
// console.log(JSON.parse(window.localStorage.getItem('projects')))
// in terminal: npx webpack
