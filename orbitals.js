{ // UI variables
    var orangeHubIcon = document.getElementById('orange-hub-icon'),
        orangeOrbIcon = document.getElementById('orange-orb-icon'),
        blueHubIcon = document.getElementById('blue-hub-icon'),
        blueOrbIcon = document.getElementById('blue-orb-icon');

    // status bar
    var statusBar = document.getElementById('status-bar'),
        stateContainer = document.getElementById('state-container'),
        gamePrompt = document.getElementById('state-text'),
        guessInfoArea = document.getElementById('state-bottom-half'),
        currentHint = document.getElementById('current-hint'),
        guessesLeft = document.getElementById('guesses-left'),
        turnContainer = document.getElementById('turn-container'),
        timerLabel = document.getElementById('timer'),

        mainArea = document.getElementById('mainArea'),

        // cluster info area
        clusterInfo = document.getElementById('cluster-info'),
        sectorSelection = document.getElementById('sector-selection'),


        // data entry area
        dataEntryArea = document.getElementById('player-data-entry'),
        nameEntry = document.getElementById('name-entry'),
        nameInput = document.getElementById('name-input'),
        sendNameButton = document.getElementById('name-send'),
        nameResponse = document.getElementById('name-response'),
        teamSelection = document.getElementById('team-selection'),
        teamPrompt = document.getElementById('team-prompt'),
        orangeTeamButton = document.getElementById('orange-team-button'),
        blueTeamButton = document.getElementById('blue-team-button'),
        teamResponse = document.getElementById('team-response'),
        roleSelection = document.getElementById('role-selection'),
        rolePrompt = document.getElementById('role-prompt'),
        rootButton = document.getElementById('root-button'),
        roleResponse = document.getElementById('role-response'),
        readyArea = document.getElementById('ready-area'),
        startButton = document.getElementById('start-button'),

        // word board
        wordBoard = document.getElementById('word-board'),
        wordButtons = document.querySelectorAll('.word-box'),

        // message display
        messageDisplay = document.getElementById('message-display'),
        chatBox = document.getElementById('chat-box'),
        messageContainer = document.getElementById('message-container'),
        lastMessageContainer = document.getElementById('last-message-container'),
        lastMessage = document.getElementById('last-message'),

        // sector info
        sectorInfo = document.getElementById('sector-info'),
        connectionStatus = document.getElementById('connection-status'),
        playerList = document.getElementById('player-list'),
        orangeTeam = document.getElementById('orange-team'),
        blueTeam = document.getElementById('blue-team'),
        userId = document.getElementById('user-id'),
        teamId = document.getElementById('team-id'),
        nameId = document.getElementById('name-id'),

        // comms area
        comms = document.getElementById('comms-area'),
        messageArea = document.getElementById('message-area'),
        hintSubmission = document.getElementById('hint-submission-comms'),
        hintResponse = document.getElementById('hint-response-comms'),
        replayArea = document.getElementById('replay-area'),

        // message area
        messageInput = document.getElementById('message-input'),
        sendMessageButton = document.getElementById('send-message-button'),

        // hint submission
        hintInput = document.getElementById('hint-input'),
        guessRange = document.getElementById('guess-range'),
        guessCount = document.getElementById('guess-count-label'),
        rootSubmitButton = document.getElementById('root-submit-button'),

        // hint response
        approveButton = document.getElementById('approve-button'),
        rejectButton = document.getElementById('reject-button'),

        // replay area
        replayButton = document.getElementById('replay-button');

    // nav area
    gameButton = document.getElementById('game-button');
    commsButton = document.getElementById('comms-button');
    sectorButton = document.getElementById('sector-button');
}

{ // player variables
    // var websocket = new WebSocket("ws://127.0.0.1:9001/");
    var websocket = new WebSocket("ws://localhost:9001/");
    var gameOn = false;
    var sector = '';
}

// utility functions
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

{ // UI events 
    gameButton.onclick = function () {
        if (gameOn) {
            updateMainArea('word-board');
            gameButton.style.backgroundColor = '#333';
            commsButton.style.backgroundColor = '#111';
            sectorButton.style.backgroundColor = '#111';
            gameButton.blur();
        }
        // else {
        // updateMainArea('data-entry');
        // }
        // gameButton.style.backgroundColor = '#333';
        // commsButton.style.backgroundColor = '#111';
        // sectorButton.style.backgroundColor = '#111';
        // gameButton.blur();
    }

    commsButton.onclick = function () {
        updateMainArea('message-display');
        gameButton.style.backgroundColor = '#111';
        commsButton.style.backgroundColor = '#333';
        sectorButton.style.backgroundColor = '#111';
        commsButton.blur();
    }

    sectorButton.onclick = function () {
        updateMainArea('sector-info');
        
        gameButton.style.backgroundColor = '#111';
        commsButton.style.backgroundColor = '#111';
        sectorButton.style.backgroundColor = '#333';
        sectorButton.blur();
    }

    nameInput.addEventListener("keyup", async function (event) {
        if (event.keyCode === 13) {
            nameInput.blur();
            sendNameButton.click();
            // var nameRequest = JSON.stringify({
            //     'type': 'name-request',
            //     'name': nameInput.value
            // });
            // nameInput.blur();
            // await websocket.send(nameRequest);
        } else {
            if (nameResponse.parentNode === nameEntry) {
                nameEntry.removeChild(nameResponse);
            }
        }
    });

    sendNameButton.onclick = async function (event) {
        var nameRequest = JSON.stringify({
            'type': 'name-request',
            'name': nameInput.value
        });
        sendNameButton.blur();
        await websocket.send(nameRequest);
    }

    orangeTeamButton.onclick = async function (event) {
        orangeTeamButton.blur();
        await websocket.send(JSON.stringify({
            'type': 'team-request',
            'team': 'O'
        }));
    };

    blueTeamButton.onclick = async function (event) {
        blueTeamButton.blur();
        await websocket.send(JSON.stringify({
            'type': 'team-request',
            'team': 'B'
        }));
    };

    rootButton.onclick = async function (event) {
        rootButton.blur();
        await websocket.send(JSON.stringify({
            'type': 'source-request'
        }));
    };

    startButton.onclick = async function (event) {
        await websocket.send(JSON.stringify({
            'type': 'ready'
        }));
        startButton.blur();
    }

    messageInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            sendMessageButton.click();
        }
    });

    sendMessageButton.onclick = async function (event) {
        sendMessageButton.blur();
        await websocket.send(JSON.stringify({
            'type': 'message',
            'message': messageInput.value
        }));
        messageInput.value = '';
    };

    hintInput.addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            rootSubmitButton.click();
        }
    });

    guessRange.oninput = async function (event) {
        guessCount.textContent = guessRange.value;
    };

    rootSubmitButton.onclick = async function (event) {
        await websocket.send(JSON.stringify({
            'type': 'hint',
            'hint': hintInput.value,
            'guesses': guessRange.value
        }));
        hintInput.value = '';
    };

    approveButton.onclick = async function (event) {
        await websocket.send(JSON.stringify({
            'type': 'hint-response',
            'response': true
        }));
    };

    rejectButton.onclick = async function (event) {
        await websocket.send(JSON.stringify({
            'type': 'hint-response',
            'response': false
        }));
    };

    wordButtons.forEach(element => {
        element.onclick = async function (event) {
            await websocket.send(JSON.stringify({
                'type': 'guess',
                'guess': event.target.textContent
            }));
        };
    });

    replayButton.onclick = async function (event) {
        await websocket.send(JSON.stringify({
            'type': 'replay'
        }));
    };
}

{ // layout content management
    function updateStatusBar(status) {
        // status will contain (as applicable):
        // game state
        // prompt
        // hint info
        // turn info

        // top half
        gamePrompt.textContent = status['prompt'];

        // lower half
        if (status['showHint']) {
            guessInfoArea.style.visibility = 'visible';
            // populate hint area
            currentHint.textContent = status['hint'];
            guessesLeft.textContent = status['guesses'];
        } else {
            guessInfoArea.style.visibility = 'hidden';
        }

        // turn indicator
        if (status['showTurn']) {
            if (turnContainer.parentNode != statusBar) {
                statusBar.appendChild(turnContainer);
                stateContainer.style.width = '75%';
            }
        } else {
            if (turnContainer.parentNode === statusBar) {
                statusBar.removeChild(turnContainer);
                stateContainer.style.width = '100%';
            }
        }

        // set color of current team
        switch (status['turn']) {
            case 'N':
                turnContainer.style.backgroundColor = '#bbb';
                break;
            case 'B':
                turnContainer.style.backgroundColor = '#40acff';
                break;
            case 'O':
                turnContainer.style.backgroundColor = 'orange';
                break;
            default:
                break;
        }
    }

    function updateTimer(time) {
        if (time > 0) {
            timerLabel.textContent = ':' + time;
        } else {
            timerLabel.textContent = '';
        }
    }

    function updateMainArea(area) {
        while (mainArea.firstChild) {
            mainArea.removeChild(mainArea.firstChild);
        }
        mainArea.style.height = '57%';
        lastMessageContainer.style.visibility = 'visible';
        switch (area) {
            case 'word-board':
                mainArea.appendChild(wordBoard);
                break;
            case 'sector-info':
                if (sector) {
                mainArea.appendChild(sectorInfo);
                }
                else {
                    mainArea.appendChild(clusterInfo);
                }
                break;
            case 'cluster-info':
                mainArea.appendChild(clusterInfo);
                break;
            case 'message-display':
            default:
                mainArea.appendChild(messageDisplay);
                mainArea.style.height = '62%';
                lastMessageContainer.style.visibility = 'hidden';
                chatBox.scrollTop = chatBox.scrollHeight;
                break;
        }
    }

    function updateSectorSelection(clusterData) {
        // generate a sector entry for each element in clusterData
        // populate player list

        while (sectorSelection.firstChild) {
            sectorSelection.removeChild(sectorSelection.removeChild);
        }

        clusterData.forEach(function (element) {
            console.log("Sector name:" + element.name);

            // create a sector container
            var sectorContainer = document.createElement("div");
            var sectorName = document.createElement("div");
            var sectorDetails = document.createElement("div");
            var sectorOrange = document.createElement("div");
            var sectorCentre = document.createElement("div");
            var sectorBlue = document.createElement("div");
            var joinButton = document.createElement("button");

            sectorName.textContent = element.name;
            sectorName.className = 'sector-name';
            sectorContainer.appendChild(sectorName);

            sectorOrange.className = 'sector-orange';
            sectorDetails.appendChild(sectorOrange);
            
            joinButton.textContent = 'Join';
            joinButton.className = 'join-button';
            
            sectorCentre.appendChild(joinButton);
            sectorCentre.className = 'sector-centre';
            sectorDetails.appendChild(sectorCentre);

            sectorBlue.className = 'sector-blue';
            sectorDetails.appendChild(sectorBlue);

            sectorDetails.className = 'sector-details';
            
            sectorContainer.appendChild(sectorDetails);

            sectorSelection.appendChild(sectorContainer);
            
            
            // var playerEntry = document.createElement("div");
            // var playerName = document.createElement("div");
            // var containerClass = "player-entry";
            // var playerReady = element.ready;
            // var team = element.team;
            // playerEntry.appendChild(playerName);

            // if (team === 'O') {
            //     if (element.src) {
            //         containerClass = containerClass + " orange-border-on";
            //         if (playerReady) {
            //             orangeHubIcon.style.visibility = 'visible';
            //         }
            //     }
            //     else {
            //         containerClass = containerClass + " orange-border-off";
            //     }
            // } else if (team === 'B') {
            //     if (element.src) {
            //         containerClass = containerClass + " blue-border-on";
            //         if (element.ready) {
            //             blueHubIcon.style.visibility = 'visible';
            //         }
            //     }
            //     else {
            //         containerClass = containerClass + " blue-border-off";
            //     }
            // } else {
            //     containerClass = containerClass + " neutral-border-off";
            // }
            // playerEntry.setAttribute("class", containerClass);
            // playerName.setAttribute("class", "player-name");
            // playerName.innerHTML = element.name;
            // if (team === 'B')
            //     blueTeam.appendChild(playerEntry);
            // else if (team === 'O')
            //     orangeTeam.appendChild(playerEntry);
        });

    }

    function updateDataEntry(playerStatus, ready = false) {
        nameEntry.style.visibility = 'hidden';
        teamSelection.style.visibility = 'hidden';
        roleSelection.style.visibility = 'hidden';
        readyArea.style.visibility = 'hidden';
        switch (playerStatus) {
            case 'name-entry':
                nameEntry.style.visibility = 'visible';
                nameInput.focus();
                break;
            case 'team-selection':
                nameEntry.style.visibility = 'visible';
                teamSelection.style.visibility = 'visible';
                break;
            case 'role-selection':
                nameEntry.style.visibility = 'visible';
                teamSelection.style.visibility = 'visible';
                roleSelection.style.visibility = 'visible';
                break;
            case 'ready-area':
                nameEntry.style.visibility = 'visible';
                teamSelection.style.visibility = 'visible';
                roleSelection.style.visibility = 'visible';
                readyArea.style.visibility = 'visible';
                if (ready) {
                    startButton.style.backgroundColor = '#ddd';
                    startButton.style.color = '#111';
                    startButton.disabled = true;
                } else {
                    startButton.style.backgroundColor = 'inherit';
                    startButton.style.color = '#ddd';
                    startButton.disabled = false;
                }
                break;
            default:
                break;
        }
    }

    function updateWordBoard(enableWords) {
        wordButtons.forEach(element => {
            if (enableWords) {
                element.disabled = false;
            } else {
                element.disabled = true;
            }
        });
    }

    function newMessage(message) {
        var senderId = document.createElement("span");
        if (message['team'] === 'O') {
            senderId.setAttribute("class", "message-sender orange-sender");
        } else if (message['team'] === 'B') {
            senderId.setAttribute("class", "message-sender blue-sender");
        }
        senderId.textContent = message['sender'] + ": ";

        var messageText = document.createElement("span");
        messageText.setAttribute("class", "message-text");
        messageText.textContent = message['message'];

        var chatMessage = document.createElement("div");
        chatMessage.setAttribute("class", "chat-message");
        chatMessage.appendChild(senderId);
        chatMessage.appendChild(messageText);
        messageContainer.appendChild(chatMessage);

        chatBox.scrollTop = chatBox.scrollHeight;

        while (lastMessage.firstChild) {
            lastMessage.removeChild(lastMessage.firstChild)
        }
        var clonedMessage = chatMessage.cloneNode(true);
        lastMessage.appendChild(clonedMessage);

    }

    function updateCommsArea(area) {
        while (comms.firstChild) {
            comms.removeChild(comms.firstChild);
        }
        switch (area) {
            case 'message':
                if (replayButton.parentNode === messageArea) {
                    messageArea.removeChild(replayButton)
                }
                messageInput.style.width = '80%';
                comms.appendChild(messageArea);
                break;
            case 'hint-submission':
                comms.appendChild(hintSubmission);
                break;
            case 'hint-response':
                comms.appendChild(hintResponse);
                break;
            case 'replay':
                if (replayButton.parentNode != messageArea) {
                    messageArea.insertBefore(replayButton, messageInput);
                }
                messageInput.style.width = '55%';
                comms.appendChild(messageArea);
                break;
            default:
                break;
        }
    }

    function setupUI() {
        startStatus = {};
        startStatus['state'] = 'waiting-players';
        startStatus['prompt'] = 'Waiting for players';
        startStatus['show-hint'] = false;
        startStatus['turn'] = 'N';
        startStatus['show-turn'] = false;

        // status bar
        updateStatusBar(startStatus);
        updateTimer(0);
        // main area
        updateMainArea('cluster-info');
        updateDataEntry();
        if (nameResponse.parentNode === nameEntry) {
            nameEntry.removeChild(nameResponse);
        }
        if (teamResponse.parentNode === teamSelection) {
            teamSelection.removeChild(teamResponse);
        }
        if (roleResponse.parentNode === roleSelection) {
            roleSelection.removeChild(roleResponse);
        }
        // comms area
        startStatus['comms'] = 'message';
        updateCommsArea(startStatus['comms']);
        guessCount.textContent = guessRange.value;

        // nav area
        commsButton.style.visibility = 'hidden';
        sectorButton.click();
    }

    // viewport fixes and scrolling behaviour
    document.addEventListener(
        "DOMContentLoaded",
        function () {

            let viewheight = window.innerHeight;
            let viewwidth = window.innerWidth;
            let viewport = document.querySelector("meta[name=viewport]");
            viewport.setAttribute(
                "content",
                "height=" +
                viewheight +
                ", width=" +
                viewwidth +
                ", initial-scale=1.0"
            );
        },
        false
    );

    if (/Android/.test(navigator.appVersion)) {
        window.addEventListener("resize", function () {
            if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA") {
                document.activeElement.scrollIntoView({
                    block: "end",
                    inline: "end"
                });
            }
        })
    }
}

// websocket functions
{
    websocket.onopen = function (evt) {
        // connectionStatus.textContent = "";
        // updateMainArea('data-entry');
        connectionStatus.style.display = 'none';
    };

    websocket.onclose = function (event) {
        connectionStatus.textContent = "NOT ";
    };

    websocket.onmessage = async function (event) {
        data = JSON.parse(event.data);
        console.log(data);
        switch (data.type) {
            case 'sectors':
                {
                    updateSectorSelection(data.sectors);
                }
                break;
            case 'response':
                {
                    if (data.msg === 'name-accepted') {
                        nameInput.className = "neutral-border-off";
                        nameInput.disabled = true;

                        if (sendNameButton.parentNode === nameEntry) {
                            nameEntry.removeChild(sendNameButton);
                        }
                        updateDataEntry('team-selection');
                        commsButton.style.visibility = 'visible';
                    } else if (data.msg === 'name-not-accepted') {
                        nameResponse.textContent = data.reason;
                        if (nameResponse.parentNode === nameEntry) {
                            nameEntry.removeChild(nameResponse);
                        }
                        nameEntry.appendChild(nameResponse);
                        nameInput.focus();
                    } else if (data.msg === 'team-accepted') {
                        if (teamSelection.parentNode === dataEntryArea) {
                            dataEntryArea.removeChild(teamSelection);
                        }
                        team = data.team;
                        if (team === 'O') {
                            nameInput.className = "orange-border-off";
                            rootButton.className += " orange-border-on";
                        } else if (team === 'B') {
                            nameInput.className = "blue-border-off";
                            rootButton.className += " blue-border-on";
                        }
                        orangeTeamButton.disabled = true;
                        blueTeamButton.disabled = true;
                    } else if (data.msg === 'team-rejected') {
                        teamResponse.textContent = data.reason;
                        if (teamResponse.parentNode === teamSelection) {
                            teamSelection.removeChild(teamResponse);
                        }
                        teamSelection.appendChild(teamResponse);
                    } else if (data.msg === 'source-accepted') {
                        if (roleSelection.parentNode === dataEntryArea) {
                            dataEntryArea.removeChild(roleSelection);
                        }
                        rootButton.style.backgroundColor = '#ddd';
                        rootButton.disabled = true;
                        if (team === 'O') {
                            nameInput.className += " orange-border-on";
                        } else if (team === 'B') {
                            nameInput.className += " blue-border-on";
                        }
                    } else if (data.msg === 'source-rejected') {
                        roleResponse.textContent = data.reason;
                        if (roleResponse.parentNode === roleSelection) {
                            roleSelection.removeChild(roleResponse);
                        }
                        roleSelection.appendChild(roleResponse);
                    }
                }
                break;
            case 'players':
                {
                    while (orangeTeam.firstChild) {
                        orangeTeam.removeChild(orangeTeam.firstChild);
                    };
                    while (blueTeam.firstChild) {
                        blueTeam.removeChild(blueTeam.firstChild);
                    };

                    orangeHubIcon.style.visibility = 'hidden';
                    blueHubIcon.style.visibility = 'hidden';

                    // populate player list
                    data.players.forEach(function (element) {

                        var playerEntry = document.createElement("div");
                        var playerName = document.createElement("div");
                        var containerClass = "player-entry";
                        var playerReady = element.ready;
                        var team = element.team;
                        playerEntry.appendChild(playerName);

                        if (team === 'O') {
                            if (element.src) {
                                containerClass = containerClass + " orange-border-on";
                                if (playerReady) {
                                    orangeHubIcon.style.visibility = 'visible';
                                }
                            }
                            else {
                                containerClass = containerClass + " orange-border-off";
                            }
                        } else if (team === 'B') {
                            if (element.src) {
                                containerClass = containerClass + " blue-border-on";
                                if (element.ready) {
                                    blueHubIcon.style.visibility = 'visible';
                                }
                            }
                            else {
                                containerClass = containerClass + " blue-border-off";
                            }
                        } else {
                            containerClass = containerClass + " neutral-border-off";
                        }
                        playerEntry.setAttribute("class", containerClass);
                        playerName.setAttribute("class", "player-name");
                        playerName.innerHTML = element.name;
                        if (team === 'B')
                            blueTeam.appendChild(playerEntry);
                        else if (team === 'O')
                            orangeTeam.appendChild(playerEntry);
                    });
                }
                break;
            case 'state':
                {
                    state = data.state;
                    if (state === 'waiting-players') {
                        // if (gameOn) {
                        // gameOn = false;
                        // updateStatusBar(data);
                        // updateMainArea('data-entry');
                        // }
                        updateStatusBar(data);
                        updateMainArea('sector-info');
                        var dataEntry = data.entry;
                        updateDataEntry(dataEntry);
                        updateCommsArea('message');
                    } else if (state === 'waiting-start') {
                        // if (gameOn) {
                        // gameOn = false;
                        // updateStatusBar(data);
                        // updateMainArea('sector-info');
                        // }
                        updateStatusBar(data);
                        updateMainArea('sector-info');
                        var dataEntry = data.entry;
                        updateStatusBar(data);
                        updateDataEntry(dataEntry, data.ready);
                    } else if (state === 'game-start') {
                        gameOn = true;
                        updateStatusBar(data);
                        updateMainArea('word-board');
                        if (data.updateComms == true)
                            updateCommsArea(data.comms)
                        gameButton.click();
                    } else if (state === 'hint-submission' || state === 'hint-response') {
                        updateStatusBar(data);
                        if (data.updateComms) {
                            updateCommsArea(data.comms);
                        }
                    } else if (data.state === 'guess-submission') {
                        updateStatusBar(data);
                        // enable guesses
                        updateWordBoard(data.enableGuesses);
                        if (data.updateComms) {
                            updateCommsArea(data.comms);
                        }
                    } else if (data.state === 'game-over') {
                        orangeHubIcon.style.visibility = 'hidden';
                        blueHubIcon.style.visibility = 'hidden';
                        updateStatusBar(data);
                        if (data.updateComms) {
                            updateCommsArea(data.comms);
                        }
                        startButton.style.backgroundColor = 'inherit';
                        startButton.style.color = '#ddd';
                        startButton.disabled = false;
                    }
                }
                break;
            case 'words':
                console.log("words: " + data);
                var dataArray = data.words;
                var wordCount = dataArray.length;
                for (var index = 0; index < wordCount; ++index) {
                    var currentWord = dataArray[index].word;
                    wordButtons[index].textContent = currentWord;
                    if (dataArray[index].team === '-') {
                        wordButtons[index].disabled = false;
                        wordButtons[index].setAttribute('class', 'word-box');
                    }
                }
                break;
            case 'keys':
                for (var index = 0; index < data.keywords.length; ++index) {
                    wordButtons[index].textContent = data.keywords[index].word;
                    if (data.keywords[index].team === 'B') {
                        wordButtons[index].setAttribute('class', 'word-box blue-border-on');
                    } else if (data.keywords[index].team === 'O') {
                        wordButtons[index].setAttribute('class', 'word-box orange-border-on');
                    }
                }
                break;
            case 'guess':
                var guessWord = data.word;
                var wordTeam = data.wordTeam;
                var guesserTeam = data.guesserTeam;

                // update button display:
                for (var index = 0; index < wordButtons.length; ++index) {
                    if (wordButtons[index].textContent === guessWord) {
                        wordButtons[index].disabled = true;
                        if (wordTeam === 'O') {
                            wordButtons[index].setAttribute('class', 'word-box-orange');
                        } else if (wordTeam === 'B') {
                            wordButtons[index].setAttribute('class', 'word-box-blue');
                        } else if (wordTeam === 'N') {
                            wordButtons[index].setAttribute('class', 'word-box-neutral');
                        }
                    }
                }
                var message = {};
                message['sender'] = data.guesser;
                message['team'] = guesserTeam;
                message['message'] = "[GUESSED \"" + guessWord + "\"]";
                newMessage(message);
                guessesLeft.textContent = data.guesses;
                break;
            case 'time':
                if (data.time === 0) {
                    timerLabel.textContent = '';
                } else {
                    timerLabel.textContent = ":" + data.time;
                }
                break;
            case 'msg':
                msg = {}
                msg['sender'] = data.sender;
                msg['team'] = data.team;
                msg['message'] = data.msg;
                newMessage(msg);
                break;
            case 'replay-ack':
                updateCommsArea('message');
                break;
        } // end switch data type
    }; // end websocket onmessage
} // end websocket functions

setupUI();