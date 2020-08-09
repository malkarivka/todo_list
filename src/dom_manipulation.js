const domManipulation = (() => {

  const renderlists = (lists) => {
    for (var i = 0; i < lists.length; i++) {
      addlist(lists[i]);
    };
  };

  const addlist = (list) => {
    let ul = document.getElementById('slide-out');
    let li = document.createElement('li');
    li.innerHTML = `<a href="#" data="${list.id}" class="sidenav-close">New list</a>`;
    li.addEventListener('click', function() { renderList(list); });
    ul.insertBefore(li, document.getElementById('new_list').parentNode);
    return li;
  };

  const renderList = (list) => {
    renderTitle(list);
    renderBin(list);
    document.getElementsByTagName('table')[0].innerHTML = ''
    for (let i = 0; i < list.items.length; i++) {
      renderitem(list.items[i], list);
    };
  };

  const renderTitle = (list) => {
    let h3 = document.getElementsByTagName('h3')[0];
    h3.innerHTML = list.title;
    let old_edit = document.getElementById('edit');
    let edit = old_edit.cloneNode(true);
    old_edit.parentNode.replaceChild(edit, old_edit);
    edit.addEventListener('click', function() {
      let new_title = prompt('New title:', `${list.title}`);
      if (new_title != null) {
        list.title = new_title
        h3.innerHTML = list.title;
        document.querySelectorAll(`a[data='${list.id}']`)[0].innerHTML = list.title;
      };
    });
  };

  const renderBin = (list) => {
    let old_bin = document.getElementById('delete');
    let bin = old_bin.cloneNode(true);
    old_bin.parentNode.replaceChild(bin, old_bin);
    bin.addEventListener('click', function() {
      if (confirm('Do you want to delete this list?') == true) {
        list.delete();
      };
    });
  };

  const renderitem = (item, list, i = -1) => {
    let table = document.getElementsByTagName('table')[0];
    let row = table.insertRow(i);
    item.row = row;
    let check = row.insertCell(0);
    check.innerHTML = `<input type="checkbox">`;
    if (item.complete == true) check.children[0].checked = true;
    check.children[0].addEventListener('click', function() {
      item.toggle();
    });
    row.insertCell(1).innerHTML = `${item.title}`;
    row.insertCell(2).innerHTML = `${item.description}`;
    row.insertCell(3).innerHTML = `${item.dueDate}`;
    let edititem = row.insertCell(4);
    edititem.innerHTML = `<a href="#modal" class="modal-trigger">edit</a>`;
    edititem.addEventListener('click', function() {
      renderEditForm(item, list);
    });
    let deleteitem = row.insertCell(5);
    deleteitem.innerHTML = `<a href="#">&#x1F5D1;</a>`;
    deleteitem.addEventListener('click', function() {
      if (confirm('Do you want to delete this item item?') == true) {
        item.delete(list);
      };
    });
  };

  const renderitemForm = (list) => {
    let properties = ['title', 'description', 'dueDate']
    for (var i = 0; i < properties.length; i++) {
      document.getElementById(properties[i]).value = '';
    }
  };

  const renderEditForm = (item, list) => {
    document.getElementById('title').value = item.title;
    document.getElementById('description').value = item.description;
    document.getElementById('dueDate').value = item.dueDate;
    document.getElementById('submit').onclick = function() {
      M.Modal.getInstance(document.querySelectorAll(".modal")[0]).close();
      item.title = document.getElementById('title').value;
      item.description = document.getElementById('description').value;
      item.dueDate = document.getElementById('dueDate').value;
      domManipulation.renderitem(item, list, item.row.rowIndex);
      document.getElementsByTagName('table')[0].deleteRow(item.row.rowIndex + 1);
    };
  };

  return { renderlists, renderList, addlist, renderitem, renderitemForm };
})();

export default domManipulation;
