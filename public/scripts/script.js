// -------- MODAL SCRIPTS --------
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

$menuItems = $('#menu-items');
$itemDetails = $('.modal-content');

function displayItemDetails(e) {
  const parent = e.target.parentElement;
  const modal = parent.getElementsByClassName("modal")[0];
  console.log(modal);
  modal.style.display = "block";
}

function closeDetails(e) {
  const parent = e.target.parentElement.parentElement.parentElement;
  const modal = parent.getElementsByClassName("modal")[0];
  console.log(modal);
  modal.style.display = "none";
}

$menuItems.on('click', '.card', displayItemDetails);
$itemDetails.on('click', '.close', closeDetails);

