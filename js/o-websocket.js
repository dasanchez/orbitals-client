class OrbitalsWebSocket {
    constructor(port) {
        // var wso = new WebSocket("ws://" + document.domain + ":" + port + "/");

        let orbitals_client = document.querySelector("#orbitals-body");
        console.log(orbitals_client.innerHTML)

        let pregame_screen = document.querySelector("#pregame-screen");
        // websocket functions
        // {
        //     wso.onopen = function (evt) {
        //         // await connection.updateStatus()
        //         // connectionStatus.textContent = "Connected"
        //         console.log("WS Connected");
        //         let connectionStatus = document.getElementById("connection-status");
        //         connectionStatus.textContent = "Connected"

        //         // let name_dialog = document.createElement("o-name");
        //         // name_dialog.setAttribute("id", "name-screen");
        //         // orbitals_client.appendChild(name_dialog);
   
        //         // // name Entry
        //         // let nameInput = document.querySelector("#name-entry");
        //         // nameInput.addEventListener("keyup", async function (event) {
        //         //     if (event.keyCode === 13) {
        //         //         let name = nameInput.value;
        //         //         await ws.send(JSON.stringify({
        //         //             'type': 'name-request',
        //         //             "name":name
        //         //         }));
        //         //         orbitals_client.removeChild(name_dialog);
        //         //         let pregame = document.createElement("o-pregame");
        //         //         pregame.setAttribute("id","pregame-screen")                
        //         //         orbitals_client.appendChild(pregame);
        //         //         let nameLabel = document.querySelector("#player-name-label");
        //         //         nameLabel.innerText = name;
        //         //     }
        //         // });
        //         // nameInput.focus();
        //     };

        //     wso.onclose = function (event) {
        //         // connectionStatus.style.display = 'block';
        //         // connectionStatus.textContent = "Not connected"
        //         console.log("WS not Connected")
        //         // go back to cluster info screen
        //         // updateMainArea('cluster-info');
        //     };

        //     wso.onmessage = async function (event) {
        //         let data = JSON.parse(await event.data);
        //         console.log("ws:", data);
        //         const cev = new CustomEvent("datareceived", {
        //             bubbles: true,
        //             composed: true,
        //             detail: "hi!"
        //         });
        //         // document.dispatchEvent(cev);
        //         // this.dispatchEvent(new CustomEvent("datareceived", {
        //         //     bubbles: true,
        //         //     composed: true,
        //         //     detail: "hi!"
        //         // }))

                const ev = new Event("datareceived");
                document.getElementById("connection-status").dispatchEvent(ev);
        //         // if (data["msg"] == "name-accepted") {
        //         // }
        //         // this.dispatchEvent(new CustomEvent("datareceived", {
        //             // bubbles: true,
        //             // detail: {
        //             //   packet: data
        //             // }
        //         //   }))
        //         // switch (data.type) {
        //         //     case 'welcome':
        //     };
        // }
    }
}