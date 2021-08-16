class OrbitalsClient extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        var orbitalsContainer = document.createElement("div");
        orbitalsContainer.setAttribute("id", "orbitals-body");
        this.appendChild(orbitalsContainer);

        let title = document.createElement("o-title");
        orbitalsContainer.appendChild(title);

        let connection = document.createElement("o-connection");
        orbitalsContainer.appendChild(connection);

        // let name_dialog = document.createElement("o-name");
        // name_dialog.setAttribute("id", "name-screen");


        // orbitalsContainer.appendChild(name_dialog);

        // let btn = document.querySelector("#connect-button");
        // connection.statusChange("Disconnected");

        
        let ws = new OrbitalsWebSocket(9000);

        // name Entry
        // let nameInput = document.querySelector("#name-entry");
        // nameInput.addEventListener("keyup", async function (event) {
        //     if (event.keyCode === 13) {
        //         let name = nameInput.value;
        //         orbitalsContainer.removeChild(name_dialog);
        //         orbitalsContainer.appendChild(pregame);
        //         let nameLabel = document.querySelector("#player-name-label");
        //         nameLabel.innerText = name;
        //     }
        // });
        // nameInput.focus();


        // let websocket = new WebSocket("ws://" + document.domain + ":9000/");
        // // websocket functions
        // {
        //     websocket.onopen = function (evt) {
        //         // await connection.updateStatus()
        //         connectionStatus.textContent = "Connected"
        //     };

        //     websocket.onclose = function (event) {
        //         // connectionStatus.style.display = 'block';
        //         connectionStatus.textContent = "Not connected"
        //         // go back to cluster info screen
        //         // updateMainArea('cluster-info');

        //     };
        // }
    }
}

customElements.define('orbitals-client', OrbitalsClient)