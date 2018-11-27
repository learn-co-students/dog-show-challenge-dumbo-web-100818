

document.addEventListener('DOMContentLoaded', () => {
    const dogTable = document.getElementById('table-body')
    const dogForm = document.getElementById('dog-form')
    const formName = document.getElementById('name')
    const formBreed = document.getElementById('breed')
    const formSex = document.getElementById('sex')
    const formId = document.getElementById('dog-id')

    function getDogs(){
        fetch('http://localhost:3000/dogs').then(resp => resp.json()).then(displayDogs)
    }

    function renderDog(dog) {

        let dogRow = document.createElement('tr')
        dogRow.setAttribute('data-id', dog.id)
        dogRow.setAttribute('data-name', dog.name)
        dogRow.setAttribute('data-breed', dog.breed)
        dogRow.setAttribute('data-sex', dog.sex)

        dogRow.innerHTML = `
            <td>${dog.name}</td>
            <td>${dog.breed}</td>
            <td>${dog.sex}</td>
            <td><button class = 'editButton'>Edit</button></td>
            `

        dogTable.appendChild(dogRow)
    }

    function displayDogs(dogs) {
        dogTable.innerHTML = ""
        dogs.forEach(function(dog) {
            renderDog(dog)
        })
    }



        // Make a dog editable. Clicking on the edit button next to a dog
        //should populate the top form with that dog's current information.
    dogTable.addEventListener('click' ,function(event){

        if (event.target.classList.contains("editButton")){
            let parent = event.target.parentNode.parentNode

            formId.value = parent.dataset.id
            formName.value = parent.dataset.name
            formBreed.value = parent.dataset.breed
            formSex.value = parent.dataset.sex
        }

    })

    dogForm.addEventListener('submit', function(event) {
        event.preventDefault()

        let dogData = {
            name: formName.value,
            breed: formBreed.value,
            sex: formSex.value
        }

        fetch(`http://localhost:3000/dogs/${formId.value}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(dogData)
        }).then(resp => resp.json())
        .then(function(json) {
            dogForm.reset()
            getDogs()
        })


        // formId.value = ""
        // formName.value = ""
        // formBreed.value = ""
        // formSex.value = ""
    })

    // On submit of the form, a PATCH request should be made
    //to http://localhost:3000/dogs/:id to update the
    //dog information (including name, breed and sex attributes).

    // Once the form is submitted, the table should reflect the
    // updated dog information. There are many ways to do this.
    // You could search for the table fields you need to edit and
    // update each of them in turn, but we suggest making a new get
    // request for all dogs and rerendering all of them in the table.
    // Make sure this GET happens after the PATCH so you can get
    // the most up-to-date dog information.





    getDogs()
})
