const gridNotifications = document.querySelectorAll(".column .notification");
const columns = document.querySelectorAll(".columns .is-multiline div.day");
const clientForm = document.forms["clientForm"];

async function createRent(name, email, phone, rents) {
    const response = await fetch("/rent", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-type": "application/json"},
        body: JSON.stringify({name: name, email: email, phone: phone, rents: rents})
    });
}

document.addEventListener('DOMContentLoaded', () => {
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".modal-trigger") || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });

    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button, .modal-content .button') || [])
    .forEach(($close) => {
      if(!($close.getAttribute("type") == "submit")){
        const $target = $close.closest(".modal");
        $close.addEventListener('click', () => {
          closeModal($target);
      });
}});
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if(event.key === "Escape") {
        closeAllModals();
      }
    });
});

document.getElementById("clearRentsBtn").addEventListener("click", () =>
    gridNotifications.forEach(notif =>{
        if (notif.classList.contains("is-success"))
            notif.classList.remove("is-success")
    })
);

window.addEventListener("resize",()=> {
    let winSize = document.body.clientWidth;
    var today = new Date();
    var colQty;
    if (winSize <= 768)
        colQty = 0;
    else if(winSize < 1024)
        colQty = 1;
    else if (winSize < 1260)
        colQty = 2;
    else
        colQty = 3;

    columns.forEach(col =>{
        if (Math.abs(today.getDate() - parseInt(col.id)) > colQty)
            col.classList.add("is-hidden");
        else
            col.classList.contains("is-hidden") ? col.classList.remove("is-hidden") : undefined
    })
});

gridNotifications.forEach(notif =>{
    notif.addEventListener("click", ()=>{
      if (notif.classList.contains("is-info")){
        if (notif.classList.contains("is-light"))
            notif.classList.remove("is-light");
        else
            notif.classList.add("is-light");
    }})
});

clientForm.addEventListener("submit", e => {
    e.preventDefault();
    let rents = []
    gridNotifications.forEach(notif =>{
      if(notif.classList.contains("is-success")){
        date = notif.closest(".day").children.item(0).textContent;
        rents.push({
          date: date,
          time: notif.textContent,
          areaID: notif.attributes.getNamedItem("itemid").nodeValue})
      }
    })
    window.dispatchEvent(new Event("DOMContentLoaded"))
    createRent(clientForm.fullname.value, clientForm.email.value, clientForm.phone.value, rents)
})

$(".pitches").slick()

window.dispatchEvent(new Event("resize"))