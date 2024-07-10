/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

   const url = "http://localhost:8000/api/parse/";

   // source for reseting HTML table: https://stackoverflow.com/questions/47214759/how-to-reset-an-html-table-to-its-original-after-changing-it-with-a-javascript-f
   const blankTable = document.getElementById("results_table").innerHTML

   document.getElementById('input_form').onsubmit = async function(event) {
       event.preventDefault();
   
       let input_string = document.getElementById('input_form').elements['address'].value;
       console.log(input_string); 
   
       const queryTerms = new URLSearchParams({ address: input_string });
   
       try {
           const response = await fetch(`${url}?${queryTerms}`, {
               method: 'GET'
           });

           const respData = await response.json()
   
           if (!response.ok) {
               alert(respData.detail);
           }
           
   
           let results = document.getElementById("address-results");
           results.style.display = "block";
   
           document.getElementById("parse-type").textContent = respData.address_type;
   
           let addressParts = respData.address_components;

           let table = document.getElementById("results_table");
           table.innerHTML = blankTable; 
   

           for (let tag in addressParts) {
               if (addressParts.hasOwnProperty(tag)) {
                   let part = addressParts[tag];
                   console.log(tag, part);
   
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
   };

   


