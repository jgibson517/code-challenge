/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

   var url = "http://localhost:8000/api/parse/";
   // source for reseting HTML table: https://stackoverflow.com/questions/47214759/how-to-reset-an-html-table-to-its-original-after-changing-it-with-a-javascript-f
   var blankTable = document.getElementById("results_table").innerHTML;

   async function makeGet(event)  {
       event.preventDefault();
   
       let input_string = document.getElementById('input_form').elements['address'].value;
       const queryTerms = new URLSearchParams({ address: input_string });
       
        // source for JS fetch usgae: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
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
           // reset table before populating 
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
   
   const inputForm = document.getElementById("input_form");
   // source for JS event listener: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
   inputForm.addEventListener("submit", makeGet);



