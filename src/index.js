const url = "http://localhost:3000/dogs"

  document.addEventListener('DOMContentLoaded', (e) => {
    getDogs()
    editDog()
  })

  function addDogsToTable(givenJson) {
      givenJson.forEach((dog)=>{
          let table = document.getElementById("myTable")
          let row = table.insertRow(-1);
          row.classList.add("dogRow")
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          cell1.innerHTML += dog.name
          cell2.innerHTML += dog.breed
          cell3.innerHTML += dog.sex
          cell4.innerHTML += `<button data-id="${dog.id}">Edit</button>`
      })
  }


  function getDogs() {
    fetch(url)
    .then(res => res.json())
    .then(json => addDogsToTable(json))
  }

  function editDog() {
    document.getElementById('myTable').addEventListener("click",function checkButton(e) {
      const currentDog = e.target.parentElement.parentElement.childNodes
      const dogForm = document.getElementById('dog-form')
      let dogName = currentDog[0].innerText
      let dogBreed = currentDog[1].innerText
      let dogSex = currentDog[2].innerText
      dogForm.name.value = dogName
      dogForm.breed.value = dogBreed
      dogForm.sex.value = dogSex
      let dogId =  parseInt(currentDog[3].firstChild.dataset.id)
      document.getElementById('dog-form').addEventListener("submit", (e) => submitFunction(e, dogId))

    })
  }

      function submitFunction(e, dogId){
        //e.preventDefault()
        const dogForm = document.getElementById('dog-form')
        let dogName = dogForm.children[0].value
        let dogBreed = dogForm.children[1].value
        let dogSex = dogForm.children[2].value
        let dogData = JSON.stringify({name: dogName, breed: dogBreed, sex: dogSex})
        updateDog(dogData,dogId)
      }


  function updateDog(dogData, givenId) {
    let url = `http://localhost:3000/dogs/${givenId}`
    fetch(url,{
    method:"PATCH",
      headers:
     {
       "Content-Type": "application/json",
       Accept: "application/json"
     },
     body: dogData
   })
}
