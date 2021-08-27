class OrbitalsClient extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        var mockup = new OrbitalsMockup();
        var team = '';
        var role = 'orbital';

        var orbitalsContainer = document.createElement("div");
        orbitalsContainer.setAttribute("id", "orbitals-body");
        this.appendChild(orbitalsContainer);

        let title = document.createElement("o-title");
        orbitalsContainer.appendChild(title);

        let connection = document.createElement("o-connection");
        orbitalsContainer.appendChild(connection);

        let name_dialog = document.createElement("o-name");
        name_dialog.setAttribute("id", "name-screen");
        orbitalsContainer.appendChild(name_dialog);
        name_dialog.style.display = "none";

        let pregame_screen = document.createElement("o-pregame");
        pregame_screen.setAttribute("id", "pregame-screen");
        orbitalsContainer.appendChild(pregame_screen);
        pregame_screen.style.display = "none";

        // websockets comms

        document.addEventListener("data_received",
            e => handleIncomingMessage(e.detail));

        // var ws = new OrbitalsWebSocket(9000);
        var wso = new WebSocket("ws://" + document.domain + ":" + "9000" + "/");
        wso.onopen = function (evt) {
            console.log("WS Connected");
            connection.setAttribute("connected", true);
        }
        wso.onclose = function (evt) {
            console.log("WS not Connected")
            connection.setAttribute("connected", false);
        };

        wso.onmessage = async function (event) {
            let data = JSON.parse(await event.data);
            // console.log("ws:", data);
            const cev = new CustomEvent("data_received", {
                bubbles: true,
                composed: true,
                detail: data
            });
            document.dispatchEvent(cev);
        };

        async function send_name(name) {
            console.log("Requesting name", name)
            wso.send(JSON.stringify({
                'type': 'name-request',
                "name": name
            }))
        };

        async function request_team(team) {
            console.log("Requesting team", team)
            wso.send(JSON.stringify({
                'type': 'team-request',
                "team": team
            }))
        };

        async function request_role(role) {
            console.log("Requesting role", role)
            wso.send(JSON.stringify({
                'type': 'role-request',
                "role": role
            }))
        };

        async function request_start() {
            console.log("Requesting start")
            wso.send(JSON.stringify({
                'type': 'start-request'
            }))
        }

        // console.log("Registering event listener...  ")
        function handleIncomingMessage(data) {
            console.log("Incoming message:", data);
            if (data["type"] == "msg") {
                if (data["msg"] == "provide name") {
                    // show name screen
                    name_dialog.style.display = "block";
                    let nameInput = document.querySelector("#name-entry");
                    nameInput.focus()
                }
                else if (data["msg"] == "name accepted") {
                    name_dialog.style.display = "none";
                    // display pregame screen
                    pregame_screen.style.display = "block";
                    pregame_screen.setAttribute("name", data["name"]);
                    mockup.run_game(wso);
                }
                else if (data["msg"] == "team accepted") {
                    name_dialog.style.display = "none";
                    // display pregame screen
                    pregame_screen.style.display = "block";
                    pregame_screen.setAttribute("team", data["team"]);
                    pregame_screen.setAttribute("role", data["role"]);
                    team = data["team"];
                }
                else if (data["msg"] == "role accepted") {
                    name_dialog.style.display = "none";
                    // display pregame screen
                    pregame_screen.style.display = "block";
                    pregame_screen.setAttribute("role", data["role"]);
                    role = data["role"];
                }
            }
            else if (data["type"] == "broadcast") {
                // console.log(data["msg"]);
                var str = data["msg"]
                let status = data["status"]["game_state"];
                if (status == "WAITING_PLAYERS") {
                    pregame_screen.setAttribute("players", JSON.stringify(data["status"]["players"]))
                    pregame_screen.setAttribute("ready-start", "none");
                }
                else if (status == "WAITING_START") {
                    pregame_screen.setAttribute("players", JSON.stringify(data["status"]["players"]));
                    pregame_screen.setAttribute("blue-ready", data["status"]["start_game"]["blue"]);
                    if (role == "hub") {
                        if (data["status"]["start_game"][team] == false) {
                            // my team is ready to start
                            pregame_screen.setAttribute("ready-start", "unset");
                        } else {
                            pregame_screen.setAttribute("ready-start", "none");
                        }
                    }

                }
                // if (str.slice(-15) == "joined the game") {
                //     // Update roster
                //     pregame_screen.setAttribute("players", JSON.stringify(data["status"]["players"]))
                // }
                // else if (str.slice(-4) == "team") {
                //     pregame_screen.setAttribute("players", JSON.stringify(data["status"]["players"]))
                // }
                // else if (str.slice(-7) == "orbital") {
                //     pregame_screen.setAttribute("players", JSON.stringify(data["status"]["players"]))
                // }
                // else if (str.slice(-3) == "hub") {
                //     pregame_screen.setAttribute("players", JSON.stringify(data["status"]["players"]))
                // }
            }
            // let type = data["type"]
            // console.log("Type:" + type);
        };



        document.addEventListener("name_submitted", e => send_name(e.detail));
        document.addEventListener("team_request", e => request_team(e.detail));
        document.addEventListener("role_request", e => request_role(e.detail));
        document.addEventListener("start_request", e => request_start());
    }
}

customElements.define('orbitals-client', OrbitalsClient)