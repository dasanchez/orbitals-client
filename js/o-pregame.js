class OrbitalsPreGame extends HTMLElement {

    static get observedAttributes() {
        return ['name', 'team', 'role', 'players'];
    }

    // Only called for the disabled and open attributes due to observedAttributes
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "name") {
            let playerInfo = document.getElementById("player-info-container");
            playerInfo.setAttribute("name", newValue);
        }
        else if  (name == "team") {
            let playerInfo = document.getElementById("player-info-container");
            playerInfo.setAttribute("team", newValue);
        }
        else if  (name == "role") {
            let playerInfo = document.getElementById("player-info-container");
            playerInfo.setAttribute("role", newValue);
        }
        else if (name == "players") {
            // console.log(JSON.parse(newValue));
            let roster = JSON.parse(newValue);
            console.log(roster);

            let blueTeam = document.getElementById("blue-team-container");
            while (blueTeam.lastChild) {
                    blueTeam.removeChild(blueTeam.lastChild);
                }
            blueTeam.textContent = "Blue Team";

            let orangeTeam = document.getElementById("orange-team-container");
            while (orangeTeam.lastChild) {
                    orangeTeam.removeChild(orangeTeam.lastChild);
                }
            orangeTeam.textContent = "Orange Team";

            for (let i in roster) {
                let newPlayer = document.createElement("div");
                newPlayer.setAttribute("class", "roster-entry");
                newPlayer.innerText = i;
                if (roster[i][1] == "hub") {
                    newPlayer.setAttribute("class", "roster-entry roster-hub");
                }
                else {
                    newPlayer.setAttribute("class", "roster-entry");
                }
                if (roster[i][0] == "blue") {
                    // add player's name to blue container
                    blueTeam.appendChild(newPlayer);       
                } else if (roster[i][0] == "orange") {
                    // add player's name to orange container
                    orangeTeam.appendChild(newPlayer);
                }
                // console.log(i, ":")
                // console.log("team:", roster[i][0])
                // console.log("role:", roster[i][1])
                // console.log("ready:", roster[i][2])
            }

        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        let pregameContainer = document.createElement("div");
        pregameContainer.setAttribute("id", "pregame-container");

        // blue team
        let blueTeamContainer = document.createElement("div");
        // blueTeamContainer.textContent = "Blue Team"
        blueTeamContainer.setAttribute("id", "blue-team-container");

        let playerInfoContainer = document.createElement("o-player-info");
        playerInfoContainer.setAttribute("id", "player-info-container");

        // orange team
        let orangeTeamContainer = document.createElement("div");
        // orangeTeamContainer.innerText = "ORANGE TEAM";
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