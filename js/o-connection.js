class OrbitalsConnection extends HTMLElement {

    static get observedAttributes() {
        return ['connected'];
    }

    // Only called for the disabled and open attributes due to observedAttributes
    attributeChangedCallback(name, oldValue, newValue) {
        // When the drawer is disabled, update keyboard/screen reader behavior.
        let connectionStatus = document.getElementById("connection-status");
        if (name == "connected") {
            if (newValue) {
                connectionStatus.innerText = "Connected";
            } else {
                connectionStatus.innerText = "Not connected";
            }
        }
    }

    constructor() {
        super();
    }

    connectedCallback() {
        let connectionContainer = document.createElement("div");
        connectionContainer.setAttribute("id", "connection-container");

        let connectionStatus = document.createElement("div");
        connectionStatus.innerText = "Not connected";
        connectionStatus.setAttribute("id", "connection-status");

        let connectButton = document.createElement("button");
        connectButton.innerText = "Connect"
        connectButton.setAttribute("id", "connect-button");

        connectionContainer.appendChild(connectionStatus);
        // connectionContainer.appendChild(connectButton);

        this.appendChild(connectionContainer);
    }

}

customElements.define('o-connection', OrbitalsConnection)

