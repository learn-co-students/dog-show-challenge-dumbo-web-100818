document.addEventListener('DOMContentLoaded',function() {
  getDogs()
  let mainDogArea = document.getElementById('table-body')
  mainDogArea.addEventListener('click', handleClick)
  let editForm = document.getElementById('dog-form')
  editForm.addEventListener('submit', updateDog)
})

  function populateDog(e) {
    let dogName = e.target.parentElement.parentElement.children[0].innerText
    let dogBreed = e.target.parentElement.parentElement.children[1].innerText
    let dogSex = e.target.parentElement.parentElement.children[2].innerText
    let dogId = e.target.id
    let nameInput = document.getElementById('input-name')
    let breedInput = document.getElementById('input-breed')
    let sexInput = document.getElementById('input-sex')
    let submit = document.getElementById('submitButton')
    nameInput.value = dogName
    breedInput.value = dogBreed
    sexInput.value = dogSex
    submit.dataset.id = dogId



  }

  function updateDog(e) {
    e.preventDefault()
    let formInfo = document.getElementById('dog-form')
    let name = document.getElementById('dog-form').children[0].value
    let breed = document.getElementById('dog-form').children[1].value
    let sex = document.getElementById('dog-form').children[2].value
    let dogId = e.target.children[3].dataset.id
    fetch(`http://localhost:3000/dogs/${dogId}`,{
      method: "PATCH",
      headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify({
        name: name,
        breed: breed,
        sex: sex
      })
    })
    .then(res => res.json()).then(updateScreen)
  }

  function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(seperateDogs)
  }

  function seperateDogs(dogs) {
    let mainDogArea = document.getElementById('table-body')
    mainDogArea.innerHTML = ""
    for (dog of dogs){
      singleDog(dog)
    }
  }

  function updateScreen() {
    getDogs()


  }

  function singleDog(dog) {
    let dogArea = document.getElementById('table-body')
    const dogInfo = `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="edit-button" id="${dog.id}">Edit</button></td></tr>`
    dogArea.innerHTML += dogInfo
  }

  //******************** click handlers***************//

  function handleClick(e) {
    if(e.target.className === 'edit-button'){
      populateDog(e)
    }


  }
