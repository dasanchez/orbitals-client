class OrbitalsName extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        let namePromptContainer = document.createElement("div");
        namePromptContainer.setAttribute("id","name-prompt-container");
        
        let namePromptLabel = document.createElement("div");
        namePromptLabel.innerText = "Enter your name:";

        let nameEntry = document.createElement("input");
        nameEntry.setAttribute("id","name-entry");
        nameEntry.value = "Alice"

        namePromptContainer.appendChild(namePromptLabel);
        namePromptContainer.appendChild(nameEntry);
        this.appendChild(namePromptContainer);
        
        nameEntry.addEventListener("keyup", async function (event) {
            // console.log(event.key)
                if (event.key === "Enter") {
                    let name = nameEntry.value;
                    // console.log("Entered ", name)
                    const cev = new CustomEvent("name_submitted", {
                        bubbles: true,
                        composed: true,
                        detail: name
                    });
                    nameEntry.dispatchEvent(cev)
                }
            });
        
      }
}

customElements.define('o-name', OrbitalsName)