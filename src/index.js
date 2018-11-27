  const form = document.getElementById("dog-form")

// populating table
fetch("http://localhost:3000/dogs")
  .then(response => response.json())
  .then(json => {
    tableBody = document.querySelector("#table-body")
    json.forEach(dog => {
      tableBody.innerHTML += `<tr><td> ${dog.name} </td> <td> ${dog.breed}</td> <td> ${dog.sex} </td>  <td><button class="dog-edit"  data-id=${dog.id}>Edit</button></td></tr>`
    })
  })

// Adding event listener to the edit buttons so that they populate the form fields with the corresponding dog's info
document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById("table-body")
  tableBody.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target.className === "dog-edit") {
      fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
        .then(response => response.json())

        .then(json => {
          form.elements[0].value = json.id
          form.elements[1].value = json.name
          form.elements[2].value = json.breed
          form.elements[3].value = json.sex
        })
    }
  })
})

// Add an event listener to the submit button so that when you hit submit, that dog's information is updated.
//
document.addEventListener('DOMContentLoaded', () =>
  form.addEventListener('click', (e) => {
    if (e.target.className === "submitButtn"){
      e.preventDefault();
      updateDogInfo()
    }
  })
)

function updateDogInfo() {
  let id = form.elements[0].value
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        name: form.elements[1].value,
        breed: form.elements[2].value,
        sex: form.elements[3].value
    })
  }).then(updateDogHTML(id))
}

function updateDogHTML(id){
  let row =  document.querySelector(`[data-id='${id}']`).parentElement.parentElement
  row.innerHTML = `<td> ${form.elements[1].value}</td>
                  <td> ${form.elements[2].value}</td>
                  <td> ${form.elements[3].value} </td>  <td><button class="dog-edit"  data-id=${id}>Edit</button></td>`
}
