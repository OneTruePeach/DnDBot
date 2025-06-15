const Player = require(`./Player`);

class Guild {
    constructor (guild) {
        //0699 is Hollow Pantheon
        //2528 is Hollow Explorers
        this.Id = guild.id;
        this.Name = guild.name;
        this.VcId = resolveVCID(this.Id);
        this.PrivilegedUsers = resolvePrivilegedUsers(this.Id);
        this.SimpleSongs = resolveSimpleSongs(this.Id);
        this.AllSongs = resolveSongs(this.Id);
        this.Players = resolvePlayers(this.Id);
        this.BGMAudioPlayer = resolveBGMAudioPlayer(this.Id);
        this.RCAudioPlayer = resolveRCAudioPlayer(this.Id);
        this.sessionActive = resolveSessionActive(this.Id);
    }
}

function resolveVCID(id) {
    switch (id) {
        case "1185383286437060699":
            return "1185383287556952223";
        case "1169816876570902528":
            return "1169817038915641405";
    }
}

function resolvePrivilegedUsers(id) {
    switch (id) {
        case "1185383286437060699":
            return ["203542663851409409", "200297075882065921", "342841062399672320"];
        case "1169816876570902528":
            return ["203542663851409409", "200297075882065921"];
    }
}

function resolveSimpleSongs(id) {
    switch (id) {
        case "1185383286437060699":
            return [
                [ "Default BGM",               "casual" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
              ];
        case "1169816876570902528":
            return [
                [ "Default BGM",               "casual" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
              ];
    }
}

function resolveSongs(id) {
    switch (id) {
        case "1185383286437060699":
            return [
                [ "Casual",                    "casual" ],
                [ "Combat",                    "combat" ],
                [ "Combat 2",                "combat-2" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
            ];
        case "1169816876570902528":
            return [
                [ "Casual",                    "casual" ],
                [ "Casual (new)",          "casual-new" ],
                [ "Sadge",                        "sad" ],
                [ "Spooky",                    "spooky" ],
                [ "Upbeat",                    "upbeat" ],
                [ "Chill Overview",    "overview-chill" ],
                [ "Combat",                    "combat" ],
                [ "Combat 2",                "combat-2" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
                [ "Midnight Sky",        "midnight-sky" ],
                [ "Duvroth general",          "duvroth" ],
                [ "Flint general",              "flint" ],
                [ "Kallayo and Flint",  "kallayo-flint" ],
                [ "Kallayo mom",          "kallayo-mom" ],
                [ "Kallayo stressed",  "kallayo-stress" ],
                [ "Tezar",              "kallayo-tezar" ],
                [ "Tezar death",  "kallayo-tezar-death" ],
                [ "Kiraya peaceful",  "kiraya-at-peace" ],
                [ "Kiraya mom",            "kiraya-mom" ],
                [ "Kiraya shop/tavern",   "kiraya-shop" ],
                [ "Kiraya sombre",      "kiraya-sombre" ],
                [ "Meadow general",            "meadow" ],
                [ "Sovia peaceful",       "sovia-happy" ],
                [ "Zh\'era happy",        "zhera-happy" ],
                [ "Zh\'era sombre",      "zhera-sombre" ],
            ];
    }
}

function resolvePlayers(id) {
    switch (id) {
        case "1185383286437060699":
            return [
                new Player("Affinity", "1185383287712120884", "342841062399672320",
                    []
                ),
                new Player("Osso", "1185383287712120887", "892434649991753761",
                    []
                ),
                new Player("Valinei", "1185383287712120888", "215996509810851840",
                    []
                ),
            ];
        case "1169816876570902528":
            return [
                new Player("Bielze", "1266938080833830942", "175803105613447169",
                    []
                ),
                new Player("Duvroth", "1169820256122982471", "289214778398736386",
                    [[ "Duvroth general", "duvroth" ],]
                ),
                new Player("Flint", "1169820458045149305", "322485420833112077",
                    [[ "Flint general", "flint" ]
                    [ "Flint and Kallayo",  "kallayo-flint" ],]
                ),
                new Player("Kallayo", "1169820207682953247", "195982074614644737",
                    [[ "Kallayo mom", "kallayo-mom" ],
                    [ "Kallayo stressed", "kallayo-stress" ],
                    [ "Tezar", "kallayo-tezar" ],
                    [ "Tezar death", "kallayo-tezar-death" ],]
                ),
                new Player("Kiraya", "1169820404433571892", "200297075882065921",
                    [[ "Kiraya peaceful", "kiraya-at-peace" ],
                    [ "Kiraya mom", "kiraya-mom" ],
                    [ "Kiraya shop/tavern", "kiraya-shop" ],
                    [ "Kiraya sombre", "kiraya-sombre" ],]
                ),
                new Player("Meadow", "1169820364222759064", "260643778820308992",
                    [[ "Meadow general", "meadow" ],]
                ),
                new Player("Sovia", "1266925525104988190", "321453182029004800",
                    [[ "Sovia peaceful", "sovia-happy" ],]
                ),
                new Player("Zh\'Era", "1169820169401532437", "827473044054081566",
                    [[ "Zh\'era happy", "zhera-happy" ],
                    [ "Zh\'era sombre", "zhera-sombre" ],]
                ),
            ];
    }
}

function resolveBGMAudioPlayer(id) {
    switch (id) {
        case "1185383286437060699":
            return global.HollowPantheonBGMAudioPlayer;
        case "1169816876570902528":
            return global.HollowHeartsBGMAudioPlayer;
    }
}

function resolveRCAudioPlayer(id) {
    switch (id) {
        case "1185383286437060699":
            return global.HollowPantheonRCAudioPlayer;
        case "1169816876570902528":
            return global.HollowHeartsRCAudioPlayer;
    }
}

function resolveSessionActive(id) {
    switch (id) {
        case "1185383286437060699":
            return global.hollowPantheonSessionActive;
        case "1169816876570902528":
            return global.hollowHeartsSessionActive;
    }
}

module.exports = Guild;
