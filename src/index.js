let dogId

document.addEventListener('DOMContentLoaded', () => {
  const dogs = fetch("http://localhost:3000/dogs")
    .then(response => response.json())
    .then(json => dogTable(json))
})
document.addEventListener('click',(e) => {
  if (e.target.innerText === "Edit"){
    prepareDog(e)

    document.addEventListener('click',(f) => {
      if (f.target.value === "Submit"){
        editDog(f)
      }
    })
  }
})

function dogTable(dogs){
  const element = document.getElementById("table-body")
  dogs.forEach((dog) =>
    {element.innerHTML += `<tr><td> ${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id=${dog.id} >Edit</button></td></tr>`
  })
}

function prepareDog(event){
  dogId = event.target.id
  const element = document.getElementById(`${event.target.id}`)
  const foundForm = document.getElementById("dog-form")
  foundForm.children[0].value = `${event.target.parentElement.parentElement.firstChild.innerText}`
  foundForm.children[1].value = `${event.target.parentElement.parentElement.childNodes[2].innerText}`
  foundForm.children[2].value = `${event.target.parentElement.parentElement.childNodes[4].innerText}`
  return
}

function editDog(data){
  debugger
  const e = document.getElementById("dog-form")
  fetch(`http://localhost:3000/dogs/${dogId}`,
  { method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: e.name.value, breed: e.breed.value, sex: e.sex.value}),
  }).then(res => res.json())
}
  // const data = document.getElementById("dog-form")
  // const dog = fetch("http://localhost:3000/dogs")
  //   .then(response => response.json())
  //   .then(json => {
  //     json.find(() => {data.children[0].value && data.children[1].value})
  //     console.log(json)
  //   })
