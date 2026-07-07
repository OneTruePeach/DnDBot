class Guild {
    constructor (guild) {
        //0699 is Hollow Pantheon
        //2528 is Hollow Explorers
        //9088 is Night City
        //2720 is testing server
        this.Id = guild.id;
        this.Name = guild.name;
        this.VcId = resolveVCID(this.Id);
        this.PrivilegedUsers = resolvePrivilegedUsers(this.Id);
        this.SimpleSongs = resolveSimpleSongs(this.Id);
        this.AllSongs = resolveSongs(this.Id);
        this.BGMAudioPlayer = resolveBGMAudioPlayer(this.Id);
        this.sessionActive = resolveSessionActive(this.Id);
    }
}

function resolveVCID(id) {
    switch (id) {
        case "1185383286437060699":
            return "1185383287556952223";
        case "1169816876570902528":
            return "1169817038915641405";
        case "1424625749389869088":
            return "1424625750883045399";
        case "493641527592222720":
            return "493641527592222728"
    }
}

function resolvePrivilegedUsers(id) {
    switch (id) {
        case "1185383286437060699":
            return ["203542663851409409", "200297075882065921", "342841062399672320"];
        case "1169816876570902528":
            return ["203542663851409409", "200297075882065921"];
        case "1424625749389869088":
            return ["200297075882065921", "827473044054081566"];
        case "493641527592222720":
            return ["200297075882065921"];
    }
}

function resolveSimpleSongs(id) {
    switch (id) {
        case "1185383286437060699":
            return [
                [ "Spooky",                    "spooky" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
            ];
        case "1169816876570902528":
            return [
                [ "Spooky",                    "spooky" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
            ];
        case "1424625749389869088":
            return [
                [ "Spooky",                    "spooky" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
            ];
        case "493641527592222720":
            return [
                [ "Spooky",                    "spooky" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
            ];
    }
}

function resolveSongs(id) {
    switch (id) {
        case "1185383286437060699":
            return [
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
                [ "Spooky",                    "spooky" ],
            ];
        case "1169816876570902528":
            return [
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
                [ "Spooky",                    "spooky" ],
            ];
        case "1424625749389869088":
            return [
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
                [ "Spooky",                    "spooky" ],
            ];
        case "493641527592222720":
            return [
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
                [ "Spooky",                    "spooky" ],
            ];
    }
}

function resolveBGMAudioPlayer(id) {
    switch (id) {
        case "1185383286437060699":
            return global.AmbienceBotHollowPantheonBGMAudioPlayer;
        case "1169816876570902528":
            return global.AmbienceBotHollowExplorersBGMAudioPlayer;
        case "1424625749389869088":
            return global.AmbienceBotNightCityBGMAudioPlayer;
        case "493641527592222720":
            return global.AmbienceBotTestingBGMAudioPlayer;
    }
}

function resolveSessionActive(id) {
    switch (id) {
        case "1185383286437060699":
            return global.ambienceBotHollowPantheonSessionActive;
        case "1169816876570902528":
            return global.ambienceBotHollowExplorersSessionActive;
        case "1424625749389869088":
            return global.ambienceBotNightCitySessionActive;
        case "493641527592222720":
            return global.ambienceBotTestingSessionActive;
    }
}

module.exports = Guild;