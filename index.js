add = document.getElementById('add');

add.addEventListener('click',()=>{
    console.log("Add button clicked...")
    let task = document.getElementById('task').value;
    let desc = document.getElementById('desc').value;
    update(task, desc);
});

let update = (task, desc, index)=>{
    let itemsJsonArray = [];
    let itemsJsonArrayStr;
    if (localStorage.getItem('itemsJson') == null){
        itemsJsonArray.push([task, desc]);
        itemsJsonArrayStr = JSON.stringify(itemsJsonArray);
        localStorage.setItem('itemsJson', itemsJsonArrayStr);
    }
    else{
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemsJsonArray.push([task, desc]);
        localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
    }  

    populateTable()
}

let populateTable = () =>{
    let tableBody = document.getElementById('tbody');
    let str = "";
    itemsJsonArray = JSON.parse(localStorage.getItem('itemsJson'))
    itemsJsonArray.forEach((element, index)=>{
        str += `
        <tr>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-primary btn-sm" onclick="deleteTask(${index})">Delete</button></td>
        </tr>
        `;
    });
    tableBody.innerHTML = str;
}

deleteTask = (index) =>{
    console.log("Delete Button clicked...")
    itemsJsonArray = JSON.parse(localStorage.getItem('itemsJson'));
    itemsJsonArray.splice(index, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    populateTable();
}

populateTable();