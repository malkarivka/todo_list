const domManipulation = (() => {

  const renderProjects = (projects) => {
    for (var i = 0; i < projects.length; i++) {
      addProject(projects[i]);
    };
  };

  const addProject = (project) => {
    let list = document.getElementsByTagName('ul')[0];
    let li = document.createElement('li');
    li.innerHTML = project.title;
    li.setAttribute('data', `${project.id}`);
    li.addEventListener('click', function() { renderList(project); });
    list.insertBefore(li, document.getElementById('new_project').parentNode);
    return li;
  };

  const renderList = (project) => {
    renderTitle(project);
    renderBin(project);
    document.getElementsByTagName('table')[0].innerHTML = ''
    for (let i = 0; i < project.list.length; i++) {
      renderTodo(project.list[i], project);
    };
  };

  const renderTitle = (project) => {
    let h3 = document.getElementsByTagName('h3')[0];
    h3.innerHTML = project.title;
    let old_edit = document.getElementById('edit');
    let edit = old_edit.cloneNode(true);
    old_edit.parentNode.replaceChild(edit, old_edit);
    edit.addEventListener('click', function() {
      let new_title = prompt('New title:', `${project.title}`);
      if (new_title != null) {
        project.title = new_title
        h3.innerHTML = project.title;
        document.querySelectorAll(`li[data='${project.id}']`)[0].innerHTML = project.title;
      };
    });
  };

  const renderBin = (project) => {
    let old_bin = document.getElementById('delete');
    let bin = old_bin.cloneNode(true);
    old_bin.parentNode.replaceChild(bin, old_bin);
    bin.addEventListener('click', function() {
      if (confirm('Do you want to delete this project?') == true) {
        project.delete();
      };
    });
  };

  const renderTodo = (todo, project, i = -1) => {
    let table = document.getElementsByTagName('table')[0];
    let row = table.insertRow(i);
    todo.row = row;
    let check = row.insertCell(0);
    check.innerHTML = `<input type="checkbox">`;
    if (todo.complete == true) check.children[0].checked = true;
    check.children[0].addEventListener('click', function() {
      todo.toggle();
    });
    row.insertCell(1).innerHTML = `${todo.title}`;
    row.insertCell(2).innerHTML = `${todo.description}`;
    row.insertCell(3).innerHTML = `${todo.dueDate}`;
    row.insertCell(4).innerHTML = `${todo.priority}`;
    let editTodo = row.insertCell(5);
    editTodo.innerHTML = `<a href="#modal" class="modal-trigger">edit</a>`;
    editTodo.addEventListener('click', function() {
      renderEditForm(todo, project);
    });
    let deleteTodo = row.insertCell(6);
    deleteTodo.innerHTML = `<a href="#">&#x1F5D1;</a>`;
    deleteTodo.addEventListener('click', function() {
      if (confirm('Do you want to delete this todo item?') == true) {
        todo.delete(project);
      };
    });
  };

  const renderTodoForm = (project) => {
    let properties = ['title', 'description', 'dueDate', 'priority']
    for (var i = 0; i < properties.length; i++) {
      document.getElementById(properties[i]).value = '';
    }
  };

  const renderEditForm = (todo, project) => {
    document.getElementById('title').value = todo.title;
    document.getElementById('description').value = todo.description;
    document.getElementById('dueDate').value = todo.dueDate;
    document.getElementById('priority').value = todo.priority;
    document.getElementById('submit').onclick = function() {
      M.Modal.getInstance(document.querySelectorAll(".modal")[0]).close();
      todo.title = document.getElementById('title').value;
      todo.description = document.getElementById('description').value;
      todo.dueDate = document.getElementById('dueDate').value;
      todo.priority = document.getElementById('priority').value;
      domManipulation.renderTodo(todo, project, todo.row.rowIndex);
      document.getElementsByTagName('table')[0].deleteRow(todo.row.rowIndex + 1);
    };
  };

  return { renderProjects, renderList, addProject, renderTodo, renderTodoForm };
})();

export default domManipulation;
