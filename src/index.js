const dogForm = document.getElementById('dog-form');
const makeDogList = []
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/dogs')
  .then(data => data.json())
  .then(json => {
    json.forEach(dog => {displayDog(dog)})
    giveEditFunction()
  })
})

function displayDog(dog){
  makeDogList.push(dog);
  document.getElementById('table-body').innerHTML +=
  `<tr>
  <td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>
  <td><button class= "edit-btn" data-id= "${dog.id}">Edit</button></td></tr>`

}
function giveEditFunction(){
let dogBox = document.querySelectorAll('input');
let editDog = document.getElementsByClassName('edit-btn');

for(let i=0; i < editDog.length; i++){
  editDog[i].addEventListener('click', function(){
    console.log("clicked index" + editDog[i]);
    console.log(makeDogList[i])
    dogBox[0].value = makeDogList[i].name
    dogBox[1].value = makeDogList[i].breed
    dogBox[2].value = makeDogList[i].sex
    submitDog(i)
  })
}
// submitDog()
}

function submitDog(i){
  let dogBox = document.querySelectorAll('input');
  dogBox[3].addEventListener('click', e => {
    e.preventDefault()
    let dogUpdate = {name:dogBox[0].value, breed:dogBox[1].value, sex:dogBox[2].value}
    // debugger

    fetch(`http://localhost:3000/dogs/${i+1}`,{
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(dogUpdate)}).then(response => console.log(response.json())).then(doge(i, dogBox))
    })
  }
    function doge(i, dogBox){
    let doge = document.getElementById('table-body').childNodes[i+1]

    doge.innerHTML =
    `<tr>
    <td>${dogBox[0].value}</td>
    <td>${dogBox[1].value}</td>
    <td>${dogBox[2].value}</td>
    <td><button class= "edit-btn" data-id= "${i+1}">Edit</button></td></tr>`
  }
