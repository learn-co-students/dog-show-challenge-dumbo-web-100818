
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(json => {
    const dogs = json
    const div = document.querySelector('#table-body')
    dogs.forEach(dog => {
      div.innerHTML +=
      `<tr><td class="name"> ${dog.name} </td> <td class="breed">${dog.breed}</td> <td class="sex">${dog.sex}</td> <td><button data-id=${dog.id} class="dog-edit">Edit</button></td></tr>`

    })
    const form = document.querySelector("#dog-form")
    const submitButton = form.lastElementChild
    submitButton.addEventListener('click', () => {
      let name = form.name.value
      let breed = form.breed.value
      let sex = form.sex.value
      let id = submitButton.dataset.id
      const nameElement = document.querySelector('.name')
      const breedElement = document.querySelector('.breed')
      const sexElement = document.querySelector('.sex')
      event.preventDefault()
        fetch(`http://localhost:3000/dogs/${id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: name, breed: breed, sex: sex})
        }).then(response => response.json()).then(json => {
          
          let oldName = form.name.placeholder
          let oldBreed = form.breed.placeholder
          let oldSex = form.sex.placeholder

          let name = json.name
          let breed = json.breed
          let sex = json.sex

          nameElement.innerHTML = name === "" ? oldName : name
          breedElement.innerHTML = breed === "" ? oldBreed : breed
          sexElement.innerHTML = sex === "" ? oldSex : sex
        })
        // .then(res => res.json())
        // .then(json => {
        //   document.querySelector('.random').innerText +=  json
        // })
          // .then(response => response.json())
          // .then(json =>  console.log(JSON.parse(json)))
        //   {
        //   method: "POST",
        //   body: form
        // });

    })
    const table = document.querySelector('#table-body')
    table.addEventListener('click', ()=> {
      if (event.target.className === "dog-edit"){
        const dog = event.target.parentElement.parentElement;
        const dogName = dog.firstChild
        const dogBreed = dogName.nextElementSibling
        const dogSex = dogBreed.nextElementSibling

        form.name.placeholder = dogName.innerText
        form.breed.placeholder = dogBreed.innerText
        form.sex.placeholder = dogSex.innerText
        submitButton.dataset.id = event.target.dataset.id
        }
      })
    })
  })
