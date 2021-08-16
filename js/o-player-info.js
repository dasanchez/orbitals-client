class OrbitalsPlayerInfo extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        let infoContainer = document.createElement("div");
        infoContainer.setAttribute("id","player-info-container");

        
        let playerNameLabel = document.createElement("div");
        playerNameLabel.setAttribute("id","player-name-label");
        // namePromptLabel.innerText = "Enter your name:";

        let playerTeamLabel = document.createElement("div");
        playerTeamLabel.innerText = "Team";
        // nameEntry.setAttribute("id","name-entry");
        // nameEntry.value = "Player"
        // namePromptLabel.innerText = "Enter your name:";


        infoContainer.appendChild(playerNameLabel);
        infoContainer.appendChild(playerTeamLabel);
        this.appendChild(infoContainer);

      }
}

customElements.define('o-player-info', OrbitalsPlayerInfo)