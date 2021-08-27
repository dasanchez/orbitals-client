class OrbitalsMockup {
    constructor() {
        this.player2 = new WebSocket("ws://" + document.domain + ":" + "9000" + "/");
        this.player3 = new WebSocket("ws://" + document.domain + ":" + "9000" + "/");
        this.player4 = new WebSocket("ws://" + document.domain + ":" + "9000" + "/");
    }

    request_name(socket, name) {
        socket.send(JSON.stringify({
            'type': 'name-request',
            "name": name
        }))
    };

    request_team(socket, team) {
        socket.send(JSON.stringify({
            'type': 'team-request',
            "team": team
        }))
    };

    request_role(socket, role) {
        socket.send(JSON.stringify({
            'type': 'role-request',
            "role": role
        }))
    };

    request_start(socket) {
        console.log("Requesting start from mockup...");
        socket.send(JSON.stringify({
            'type': 'start-request'
        }))
    };

    run_game(wso) {
        this.request_name(this.player2, "Bob");
        this.request_team(this.player2, "blue");
        this.request_name(this.player3, "Claire");
        this.request_team(this.player3, "orange");
        this.request_role(this.player3, "hub");
        this.request_name(this.player4, "Dale");
        this.request_team(this.player4, "orange");

        this.request_team(wso, "blue");
        this.request_role(wso, "hub");

        console.log("Calling function...")
        this.request_start(this.player3);

    };

}