class OrbitalsConnection extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {

        let connectionContainer = document.createElement("div");
        connectionContainer.setAttribute("id","connection-container");

        let connectionStatus = document.createElement("div");
        connectionStatus.innerText = "Not connected";
        connectionStatus.setAttribute("id","connection-status");

        let connectButton = document.createElement("button");
        connectButton.innerText = "Connect"
        connectButton.setAttribute("id","connect-button");
        
        connectionContainer.appendChild(connectionStatus);
        // connectionContainer.appendChild(connectButton);

        this.appendChild(connectionContainer);
        
        
      }
    

    // async updateStatus() {
    //     console.log("Hello from the Connections element");
    // }
}

customElements.define('o-connection', OrbitalsConnection)

