// insertTripDetails function with the help of ejs I can manipulate the currentId of the item as a parameter and concatenate the values of the ids this is not your usual form action due to bootstraps modal being outside of the for each scope
// -----------------------------------
// globally assign bStrap modal https://getbootstrap.com/docs/5.3/components/modal/#how-it-works
const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
function editTripDetails(thisTrip){
    let tripName = document.getElementById(`tripName${thisTrip}`).textContent;
    let tripDescription = document.getElementById(`tripDescription${thisTrip}`).textContent;
    let tripVisits = document.getElementById(`tripVisits${thisTrip}`).textContent;
    // return console.log(tripName);
    // if exist add values to modal fields for functionality of appending new values
        document.getElementById('tripIDModal').value = thisTrip;
        document.getElementById('tripNameModal').value = tripName;
        document.getElementById('tripDescriptionModal').value = tripDescription;
        document.getElementById('tripVisitsModal').value = tripVisits;
        myModal.show();
}