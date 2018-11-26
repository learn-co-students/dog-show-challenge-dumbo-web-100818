document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById("table-body")
  tableBody.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target.className === "dog-edit") {
      fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
        .then(response => response.json())

        .then(json => {
          const form = document.getElementById("dog-form")
          form.elements[0].value = json.name
          form.elements[1].value = json.breed
          form.elements[2].value = json.sex
        })
    }
  })

})
// either take the script tag and move it all the way to the bottom of the html doc (like i did) or use this shxt ^^ "Content Loaded" so that you can't grab shxt before your page has loaded

fetch("http://localhost:3000/dogs")
  .then(response => response.json())
  //  response.json is also a promise
  .then(json => {


    tableBody = document.querySelector("#table-body")

    json.forEach(dog => {
      tableBody.innerHTML += `<tr><td> ${dog.name} </td> <td> ${dog.breed}</td> <td> ${dog.sex} </td>  <td><button class="dog-edit"  data-id=${dog.id}>Edit</button></td></tr>`

      // also could've done tableBody.innerHTML += '<tr><td> etc </td> </tr>.. we're doing =+ because if we don't, the row would just continued to get replaced.

    })

  })
