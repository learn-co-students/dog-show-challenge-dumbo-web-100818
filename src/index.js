document.addEventListener('DOMContentLoaded', () => {

})



fetch("http://localhost:3000/dogs")
  .then(res => res.json())
  .then(dogTable)

 function dogTable(dogData){
  const table = document.getElementById("dog-table")
  for(dog of dogData){
   var dog1 = document.createElement('tr')

    dog1.innerHTML = `<th> ${dog.name} </th>
                      <th> ${dog.breed} </th>
                      <th> ${dog.sex} </th>
                      <th>  <button id=${dog.id}>Edit Dog</button> </th>
                      `
                      console.log(dog1)
    table.appendChild(dog1)
  }
}

// const changeDog = document.getElementById("id")
document.addEventListener('click', editDog)
function editDog (e){

  let number = parseInt(e.target.id)
  if (!isNaN(number)){

    fetch(`http://localhost:3000/dogs/${number}`)
      .then(res => res.json())
      .then(putDogInfo)
  }
}

function putDogInfo(data){
  const tags = document.getElementsByTagName('input')
  tags[0].value = data.name
  tags[1].value = data.breed
  tags[2].value = data.sex
  tags[3].id = data.id
}


document.addEventListener('submit', callback)


function callback(e){
  const dogForm = document.getElementById('dog-form')
      let dogName = dogForm.children[0].value
      let dogBreed = dogForm.children[1].value
      let dogSex = dogForm.children[2].value
      let dogId = dogForm.children[3].id
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



//
