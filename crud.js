let tableBody = document.getElementById("tableBody");
let name = document.getElementById("inputAddress");
let adress = document.getElementById("inputAddress2");
let selectedrow = null;
// clearAll
const clearall = () => {
  name.value = "";
  adress.value = "";
};

// Function to show alerts
function showalert(message, className) {
  let div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  let container = document.querySelector(".container");
  let main = document.querySelector(".main");
  container.insertBefore(div, main);

  // Remove the alert after 3 seconds
  setTimeout(() => {
      div.remove();
  }, 3000);
}
//getData API call
const getData = async () => {
  try {
    let url = "https://jsonplaceholder.typicode.com/users";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    parsedData.forEach((userdata) => {
      let output = document.createElement("tr");
      output.innerHTML = ` 
  <td >${userdata.name}</td>
  <td>${userdata.email}</td>
  <td><button class="btn btn-warning " onclick="edit(event)">Edit</button>
  <button class="btn btn-danger" onclick="del(event)">Delete</button></td>
  `;
      tableBody.appendChild(output);
    });
  } catch (error) {
    console.log(error);
  }
};
getData();

//postData API call
const postData = async () => {
  try {
    let url = "https://jsonplaceholder.typicode.com/posts";
    let data = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: `${name.value}`,
        body: `${adress.value}`,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let parsedData = await data.json();
    console.log(parsedData);
  } catch (error) {
    console.log(error);
  }
};

//UpdateData API call
const updateData = async () => {
  try {
    let url = "https://jsonplaceholder.typicode.com/posts/1";
    let data = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        id: 1,
        title: `${name.value}`,
        body: `${adress.value}`,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let parsedData = await data.json();
    console.log(parsedData);
  } catch (error) {
    console.log(error);
  }
};

//DeleteData API call
const Delete = async () => {
  let url = "https://jsonplaceholder.typicode.com/posts/1";
  let data = await fetch(url, {
    method: "DELETE",
  });
  let parsedData = await data.json();
  console.log(parsedData);
};

//add function
function add(e) {
  e.preventDefault();
  if (name.value == "" && adress.value == "") {
    showalert("Plz fill all the fields", "danger");

  }
  if (name.value != "" && adress.value != "") {
    if (selectedrow == null) {
      postData();
      let newrow = document.createElement("tr");
      newrow.innerHTML = ` 
        <td >${name.value}</td>
        <td>${adress.value}</td>
        <td class="d-flex"><button class="btn btn-warning mx-2" onclick="edit(event)">Edit</button>
        <button class="btn btn-danger" onclick="del(event)">Delete</button></td>
        `;
      tableBody.appendChild(newrow);
      clearall();
      showalert("Student data added", "success");

    } else if (selectedrow != null) {
      updateData();

      selectedrow.children[0].textContent = name.value;
      selectedrow.children[1].textContent = adress.value;
      clearall();
      showalert("Student data updated", "info");

    }
  }
}

//del function

const del = (e) => {
  console.log("deleted");
  e.target.parentElement.parentElement.remove();
  Delete();
  showalert("Student data deleted", "danger");

};

//edit function

const edit = (e) => {
  selectedrow = e.target.parentElement.parentElement;
  name.value = selectedrow.children[0].textContent;
  adress.value = selectedrow.children[1].textContent;
};
