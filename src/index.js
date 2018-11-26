
function getDogs(){
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(json => {
    const dogs = json
    const div = document.querySelector('#table-body')
    dogs.forEach(dog => {
      div.innerHTML +=
      `<tr><td class="name"> ${dog.name} </td> <td class="breed">${dog.breed}</td> <td class="sex">${dog.sex}</td> <td><button data-id=${dog.id} class="dog-edit">Edit</button></td></tr>`

    })
})
}


document.addEventListener('DOMContentLoaded', () => {
    getDogs()

    const form = document.querySelector("#dog-form")
    const submitButton = form.lastElementChild
    submitButton.addEventListener('click', () => {
        event.preventDefault()
        const oldName = form.name.placeholder
        const oldBreed = form.breed.placeholder
        const oldSex = form.sex.placeholder
      let name = form.name.value === "" ? oldName : form.name.value
      let breed = form.breed.value === "" ? oldBreed : form.breed.value
      let sex = form.sex.value === "" ? oldSex : form.sex.value
      let id = submitButton.dataset.id

      // const dog = document.querySelector(`[data-id='${id}']`)
      const nameElement = document.querySelector(`.name`)
      const breedElement = document.querySelector(`.breed`)  // [data-id='${id}']
      const sexElement = document.querySelector(`.sex`)

        fetch(`http://localhost:3000/dogs/${id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: id, name: name, breed: breed, sex: sex})
        }).then(response => response.json()).then(json => {

          nameElement.innerHTML = name
          breedElement.innerHTML = breed
          sexElement.innerHTML = sex
          getDogs()


          //

// if name is nothing, default name to the old name else change the name
          // const newName = json.name
          // const newBreed = json.breed
          // const newSex = json.sex


          // nameElement.innerHTML = newName === "" ? oldName : newName
          // breedElement.innerHTML = newBreed === "" ? oldBreed : newBreed
          // sexElement.innerHTML = newSex === "" ? oldSex : newSex
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
