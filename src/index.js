const fetchDogs = fetch('http://localhost:3000/dogs').then(res => res.json())

fetchDogs.then(dogs => {
  dogs.forEach((dog) => {
    const tableBody = document.getElementById('table-body')
    tableBody.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class = 'dog-edit' data-id = "${dog.id}">Edit Dog</button></td></tr>`
  })
})

document.addEventListener('DOMContentLoaded', function (){
  const tableBody = document.getElementById('table-body')
  const dogForm = document.getElementById('dog-form')

  tableBody.addEventListener('click', (e) => {
    if (e.target.className === 'dog-edit'){
      fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
      .then(res => res.json())
      .then(dog => {
        dogForm.elements[0].value = dog.name
        dogForm.elements[1].value = dog.breed
        dogForm.elements[2].value = dog.sex
        dogForm.dataset.id = dog.id
      }
    )}
  })

  dogForm.addEventListener('submit', (e) =>{
   e.preventDefault()

   // ******** YOU CAN ASSUME YOUR CODE WORKS BUT I DID THIS TOTALLY AS
   // A WAY TO PREVENT PREEMPTIVE SUBMISSIONS
   if(e.target.dataset.id === undefined) { alert('select a dog');return }
   // ******* I AM ONLY ADDING THIS CONDITIONAL TO AVOID THE CODE TO EXECUTE BELOW
   // NOT NECESSARY



   // - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
   fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`, {
     method: "PATCH",
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       "name": dogForm.elements[0].value, // name
       "breed": dogForm.elements[1].value, // breed
       "sex": dogForm.elements[2].value // sex
     })
   })
   .then(res => res.json())
   .then(json => {
     // Now our form has submitted
     // Reset the form ** also not necessary **
     dogForm.reset()

     // How can we update the page???
     // 1. We either reload the entire table
     // Basically means we do exactly the same logic as we loaded the entire page
     fetch("http://localhost:3000/dogs").then(response => response.json())
     .then(function(dogs){
       const tableBody = document.getElementById('table-body')
       /// *** ONLY CHANGE BETWEEN WHAT IS ABOVE IN OUR INITIAL RENDER
       /// AND HERE is innerhtml being set back to "" before adding
       tableBody.innerHTML = ""
       dogs.forEach(dog => {
         tableBody.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button class="dog-edit" data-id="${dog.id}">Edit Dog</button></td></tr>`
       })
     })

     // 2. WE UPDATE THE DOM SPECIFICALLY TO THE ONE WE WANT
     // - We find the particular row (we could use the id of our JSON to find the button with the matching data-id)
     // - update each column appropriately
     // SINCE I PUT THE DATA-ID ON THE BUTTON, I HAVE TO SELECT THE GRANDPARENTELEMENT
     // let dogRow = document.querySelector(`button[data-id="${json.id}"]`).parentElement.parentElement
     //
     // dogRow.children[0].innerText = json.name
     // dogRow.children[1].innerText = json.breed
     // dogRow.children[2].innerText = json.sex
 })

})



})
