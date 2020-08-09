import M from "./materialize.min.js";
import domManipulation from './dom_manipulation.js';

document.addEventListener("DOMContentLoaded", function () {
  M.Modal.init(document.querySelectorAll(".modal"));
  M.FormSelect.init(document.querySelectorAll("select"));
  M.Sidenav.init(document.querySelectorAll(".sidenav"));
});

class Item {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.complete = false;
    // localStorage.setItem('lists', JSON.stringify(lists));
    // this.tr = (domManipulation.renderitem(this));
  };
  toggle() {
    this.complete == false ? this.complete = true : this.complete = false;
  }
  delete(list) {
    this.row.parentNode.removeChild(this.row);
    list.items = list.items.filter(item => item !== this);
  };
};

class List {
  constructor(title = 'New list') {
    this.id = id++; // necessary?
    this.title = title;
    this.items = [];
    this.li = (domManipulation.addlist(this));
    // localStorage.setItem('lists', JSON.stringify(lists));
    // console.log(localStorage.getItem('lists'))
    // console.log(JSON.parse(localStorage.getItem('lists')))
  };
  static create() {
    let newList = new List();
    lists.push(newList);
    currentlist = newList;
    domManipulation.renderList(newList);
  };
  delete() {
    this.li.parentNode.removeChild(this.li);
    lists = lists.filter(list => list !== this);
    lists.length > 0 ? domManipulation.renderList(lists[0]) : List.create();
  };
};

let id = 0;
let currentlist;
let lists = [];
// let lists;
// if (localStorage.getItem('lists')) {
//   lists = JSON.parse(localStorage.getItem('lists'));
//   add reviver parameter?
// } else {
//   lists = [];
//   List.create();
// }
document.getElementById('new_list').addEventListener('click', List.create);
document.getElementById('new_item').addEventListener('click', function() {
  domManipulation.renderitemForm(currentlist);
  document.getElementById('submit').onclick = function() {
    M.Modal.getInstance(document.querySelectorAll(".modal")[0]).close();
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let dueDate = document.getElementById('dueDate').value;
    let newItem = new Item(title, description, dueDate);
    currentlist.items.push(newItem);
    domManipulation.renderitem(newItem, currentlist);
  };
});
domManipulation.renderlists(lists);
List.create();

// console.log(JSON.parse(window.localStorage.getItem('lists')))
// console.log(JSON.parse(window.localStorage.getItem('lists')))
// in terminal: npx webpack
