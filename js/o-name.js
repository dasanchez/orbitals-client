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
        nameEntry.value = "Player"

        namePromptContainer.appendChild(namePromptLabel);
        namePromptContainer.appendChild(nameEntry);
        this.appendChild(namePromptContainer);
        

      }
}

customElements.define('o-name', OrbitalsName)