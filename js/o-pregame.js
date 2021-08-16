class OrbitalsPreGame extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        let pregameContainer = document.createElement("div");
        pregameContainer.setAttribute("id","pregame-container");

        // blue team
        let blueTeamContainer = document.createElement("div");
        blueTeamContainer.innerText = "BLUE TEAM"
        blueTeamContainer.setAttribute("id", "blue-team-container");

        let playerInfoContainer = document.createElement("o-player-info");
        // playerInfoContainer.innerText = "PLAYER INFO";
        // playerInfoContainer.setAttribute("id", "player-info-container");

        // orange team
        let orangeTeamContainer = document.createElement("div");
        orangeTeamContainer.innerText = "ORANGE TEAM";
        orangeTeamContainer.setAttribute("id", "orange-team-container");
        
        // let namePromptLabel = document.createElement("div");
        // namePromptLabel.innerText = "Enter your name:";

        // let nameEntry = document.createElement("input");
        // nameEntry.setAttribute("id","name-entry");
        // nameEntry.value = "Player"
        // namePromptLabel.innerText = "Enter your name:";


        // namePromptContainer.appendChild(namePromptLabel);
        // namePromptContainer.appendChild(nameEntry);
        pregameContainer.appendChild(blueTeamContainer);
        pregameContainer.appendChild(playerInfoContainer);
        pregameContainer.appendChild(orangeTeamContainer);
        this.appendChild(pregameContainer);
        

      }
}

customElements.define('o-pregame', OrbitalsPreGame)