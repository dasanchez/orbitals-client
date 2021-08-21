class OrbitalsPlayerInfo extends HTMLElement {

    static get observedAttributes() {
        return ['name', 'team', 'role'];
    }

    // Only called for the disabled and open attributes due to observedAttributes
    attributeChangedCallback(name, oldValue, newValue) {
        if (name == "name") {
            let nameLabel = document.getElementById("player-name-label");
            nameLabel.textContent = newValue;
        } else if (name == "team") {
            // highlight button
            let blueButton = document.getElementById("blue-team-button");
            let orangeButton = document.getElementById("orange-team-button");
            if (newValue == "blue") {
                blueButton.setAttribute("class", "team-button blue-highlight");
                orangeButton.setAttribute("class", "team-button");
            } else if (newValue == "orange") {
                orangeButton.setAttribute("class", "team-button orange-highlight");
                blueButton.setAttribute("class", "team-button");
            }
        } else if (name == "role") {
            // highlight button
            let orbitalButton = document.getElementById("orbital-button");
            let hubButton = document.getElementById("hub-button");
            if (newValue == "orbital") {
                orbitalButton.setAttribute("class", "role-button role-highlight");
                hubButton.setAttribute("class", "role-button");
            } else if (newValue == "hub") {
                orbitalButton.setAttribute("class", "role-button");
                hubButton.setAttribute("class", "role-button role-highlight");
            }
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        function sendTeamRequest(e) {
            // console.log("Pressed button", e);
            const tev = new CustomEvent("team_request", {
                bubbles: true,
                composed: true,
                detail: e.currentTarget.myParam
            });
            this.dispatchEvent(tev);
        };
        function sendRoleRequest(e) {
            // console.log("Pressed button", e);
            const rev = new CustomEvent("role_request", {
                bubbles: true,
                composed: true,
                detail: e.currentTarget.myParam
            });
            this.dispatchEvent(rev);
        };

        // Name
        let playerNameLabel = document.createElement("div");
        playerNameLabel.setAttribute("id", "player-name-label");

        // Team
        let playerTeamLabel = document.createElement("div");
        playerTeamLabel.innerText = "Team";
        let playerTeamSelection = document.createElement("div");
        playerTeamSelection.setAttribute("id", "team-selection-container");
        let blueButton = document.createElement("button");
        blueButton.setAttribute("class", "team-button");
        blueButton.setAttribute("id", "blue-team-button");
        blueButton.textContent = "Blue";
        blueButton.myParam = "blue";
        blueButton.addEventListener("click", sendTeamRequest, false);
        let orangeButton = document.createElement("button");
        orangeButton.setAttribute("class", "team-button");
        orangeButton.setAttribute("id", "orange-team-button");
        orangeButton.textContent = "Orange";
        orangeButton.myParam = "orange";
        orangeButton.addEventListener("click", sendTeamRequest, false);
        playerTeamSelection.appendChild(blueButton);
        playerTeamSelection.appendChild(orangeButton);

        // Role
        let playerRoleLabel = document.createElement("div");
        playerRoleLabel.textContent = "Role";
        let playerRoleSelection = document.createElement("div");
        playerRoleSelection.setAttribute("id", "role-selection-container");
        
        let orbitalButton = document.createElement("button");
        orbitalButton.setAttribute("id", "orbital-button");
        orbitalButton.setAttribute("class", "role-button");
        orbitalButton.textContent = "Orbital";
        orbitalButton.myParam = "orbital";
        orbitalButton.addEventListener("click", sendRoleRequest, false);
        
        let hubButton = document.createElement("button");
        hubButton.setAttribute("id", "hub-button");
        hubButton.setAttribute("class", "role-button");
        hubButton.textContent = "Hub";
        hubButton.myParam = "hub";
        hubButton.addEventListener("click", sendRoleRequest, false);

        playerRoleSelection.appendChild(orbitalButton);
        playerRoleSelection.appendChild(hubButton);

        this.appendChild(playerNameLabel);
        this.appendChild(playerTeamLabel);
        this.appendChild(playerTeamSelection);
        this.appendChild(playerRoleLabel);
        this.appendChild(playerRoleSelection); 
        // this.appendChild(infoContainer);


    }
}

customElements.define('o-player-info', OrbitalsPlayerInfo)