/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

const url = "http://localhost:8000/api/parse/";

async function makeGet(event){
   event.preventDefault();

   let input_string = inputForm.elements['address'].value;

   const queryTerms = new URLSearchParams({address : input_string});

   try {
      const response = await fetch(`${url}?${queryTerms}`, {
         method: 'GET'
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();

      let results = document.getElementById("address-results")

      results.style.display = "block";

      document.getElementById("parse-type").textContent += json.address_type

      let addressParts = json.address_components

      let table = document.getElementById("results_table")

      for (let tag in addressParts) {
         if (addressParts.hasOwnProperty(tag)) {

            let part = addressParts[tag]
            console.log(tag, part)

            let nextRow = table.insertRow(-1);

            let partCell = nextRow.insertCell(0);
            let resultsCell = nextRow.insertCell(1);

            partCell.appendChild(document.createTextNode(tag));
            resultsCell.appendChild(document.createTextNode(part));

         }
      }

    } catch (error) {
      console.error(error.message);
    }
  }


const inputForm = document.getElementById("input_form");
inputForm.addEventListener("submit", makeGet);



