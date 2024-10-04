const gridNotifications = $(".column .notification");
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

window.addEventListener("resize",()=> {
    let winSize = document.body.clientWidth;
    var colQty;
    if (winSize <= 768)
        colQty = 1;
    else if(winSize < 1024)
        colQty = 2;
    else if (winSize < 1260)
        colQty = 3;
    else
        colQty = 4;
    $(".pitches").slick('slickSetOption', {
      slidesToShow: colQty,
    }, true);
});

gridNotifications.map((index, notif)=>{
    $(notif).on("click", ()=>{
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
    gridNotifications.each((index, notif)=>{
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

$(".pitches").slick({
  infinite: false,
  prevArrow: 
  `<button type="button" class="button">prev
  </button>`,
  nextArrow:
  `<button type="button" class="button">next
  </button>`,
  appendArrows: $(".slick-nav"),
})
window.dispatchEvent(new Event("resize"))