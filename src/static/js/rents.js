const tabs = document.querySelectorAll(".tabs li")
const tabContexts = document.querySelectorAll("#tab-content")

tabs.forEach((tab) =>{
    tab.addEventListener("click", () => {
        tabs.forEach(item => item.classList.remove("is-active"))
        tab.classList.add("is-active")

        const target = tab.dataset.target;

        tabContexts.forEach(cont => {
            if (cont.getAttribute("id") === target){
                cont.classList.remove("is-hidden")}
            else{
                cont.classList.add("is-hidden")
            }
        })
    }
)})