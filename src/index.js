document.addEventListener('DOMContentLoaded', () => {
  dogData()
})

const dogData = () => {
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(utilize_data);
}

const getDogShow = (dogId) => {
  fetch(`http://localhost:3000/dogs/${dogId}`)
  .then(res => res.json())
  .then(populate)
}

const changeDog = (dog, id) => {
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dog)
  }).then(res => res.json()).then((json) => {
    // dogData();
    // Update the dom
    // 1. The single thing to update
    // 2. All things

  let updatedRow = document.querySelector(`tr[data-id="${json.id}"]`).children
  updatedRow[0].innerHTML = json.name
  updatedRow[1].innerHTML = json.breed
  updatedRow[2].innerHTML = json.sex
  })

}


const utilize_data = (data) => {

let table = document.querySelector('#table-body')
  table.addEventListener("click", editAction)

let submit = document.querySelector('#dog-form')
  submit.addEventListener("submit", submitAction)


data.forEach((dog)=> {
  table.innerHTML += `
    <tr data-id="${dog.id}">
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td class="edit"> Edit </td>
    </tr>
  `
  })

}
const editAction = (e) => {
  if (e.target.className === "edit") {
    let dogId = e.target.parentElement.dataset.id //data-id
    getDogShow(dogId)
  }
}

function populate(data){
  let dogForm = document.querySelector('#dog-form');

  let dogName = dogForm[0];
  let dogBreed = dogForm[1];
  let dogSex = dogForm[2];
  let dogId = data.id;
  dogName.value = data.name;
  dogBreed.value = data.breed;
  dogSex.value = data.sex;
  // debugger
  dogForm.dataset.id = data.id;

}

const submitAction = (e) => {
    e.preventDefault();
    let name = e.target[0].value;
    let breed = e.target[1].value;
    let sex = e.target[2].value;
    let id = e.target.dataset.id
    let dog = {
      "id": id,
      "name": name,
      "breed": breed,
      "sex": sex
    }
    changeDog(dog, id);
}
