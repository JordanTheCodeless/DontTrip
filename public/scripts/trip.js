// insertTripDetails function with the help of ejs I can manipulate the currentId of the item as a parameter and concatenate the values of the ids this is not your usual form action due to bootstraps modal being outside of the for each scope
// -----------------------------------
// globally assign bStrap modal https://getbootstrap.com/docs/5.3/components/modal/#how-it-works
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
function editTripDetails(thisTrip) {
  let tripName = document.getElementById(`tripName${thisTrip}`).textContent;
  let tripDescription = document.getElementById(
    `tripDescription${thisTrip}`
  ).textContent;
  let tripVisits = document.getElementById(`tripVisits${thisTrip}`).textContent;
  // return console.log(tripName);
  // if exist add values to modal fields for functionality of appending new values
  document.getElementById("tripIDModal").value = thisTrip;
  document.getElementById("tripNameModal").value = tripName;
  document.getElementById("tripDescriptionModal").value = tripDescription;
  document.getElementById("tripVisitsModal").value = tripVisits;
  myModal.show();
}

  let saveBTN = document.getElementById("saveChangesBtn");
  //   here I wait till the save button is clicked and prevent the default submission of the form using async since waiting for a response I use a try catch block
  saveBTN.addEventListener("click", async (e) => {
    e.preventDefault();
    let editedTripID = document.getElementById("tripIDModal").value;
    let editedTripName = document.getElementById("tripNameModal").value;
    let editedTripDescription = document.getElementById(
      "tripDescriptionModal"
    ).value;
    let editedTripVisits = document.getElementById("tripVisitsModal").value;
    try {
      const res = await fetch(
        `/trip/edit/${editedTripID}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            id: editedTripID,
            name: editedTripName,
            description: editedTripDescription,
           visits: editedTripVisits,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        console.log("trip sent succesfully");
        console.log(res)
        myModal.hide();
      }
    } catch (e) {
      if (e) {
        console.error("There has been an error : ", e);
      }
    }
  });
//   Delete function
async function deleteThisTrip(thisTrip) {
        try{
            const res = await fetch(`/trip/delete/${thisTrip}`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            },
        })
            if(res.ok){
                console.log("delete request has been received")
            }
            else{
                console.error("Failed to delete trip");
            }
            }catch(e){
                if(e){
                    console.error(`Error trying to delete the trip${thisTrip}`, e)
                }
        }


}
