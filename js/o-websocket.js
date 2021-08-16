class OrbitalsWebSocket {
    constructor(port) {
        var ws = new WebSocket("ws://" + document.domain + ":" + port + "/");

        let orbitals_client = document.querySelector("#orbitals-body");
        console.log(orbitals_client.innerHTML)

        let pregame_screen = document.querySelector("#pregame-screen");
        // websocket functions
        {
            ws.onopen = function (evt) {
                // await connection.updateStatus()
                // connectionStatus.textContent = "Connected"
                console.log("WS Connected");
                let connectionStatus = document.getElementById("connection-status");
                connectionStatus.textContent = "Connected"

                let name_dialog = document.createElement("o-name");
                name_dialog.setAttribute("id", "name-screen");
                orbitals_client.appendChild(name_dialog);
   
                // name Entry
                let nameInput = document.querySelector("#name-entry");
                nameInput.addEventListener("keyup", async function (event) {
                    if (event.keyCode === 13) {
                        let name = nameInput.value;
                        await ws.send(JSON.stringify({
                            'type': 'name-request',
                            "name":name
                        }));
                        orbitals_client.removeChild(name_dialog);
                        let pregame = document.createElement("o-pregame");
                        pregame.setAttribute("id","pregame-screen")                
                        orbitals_client.appendChild(pregame);
                        let nameLabel = document.querySelector("#player-name-label");
                        nameLabel.innerText = name;
                    }
                });
                nameInput.focus();
            };

            ws.onclose = function (event) {
                // connectionStatus.style.display = 'block';
                // connectionStatus.textContent = "Not connected"
                console.log("WS not Connected")
                // go back to cluster info screen
                // updateMainArea('cluster-info');
            };

            ws.onmessage = async function (event) {
                let data = JSON.parse(await event.data);
                console.log(data);
                if (data["msg"] == "name-accepted") {
                }

                // switch (data.type) {
                //     case 'welcome':
            };
        }
    }
}