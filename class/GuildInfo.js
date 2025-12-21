const Player = require(`./Player`);

class Guild {
    constructor (guild) {
        //0699 is Hollow Pantheon
        //2528 is Hollow Explorers
        //9088 is Night City
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
        case "1424625749389869088":
            return "1424625750883045399";
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
        case "1424625749389869088":
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
                [ "Casual 2",              "casual-new" ],
                [ "Sad",                          "sad" ],
                [ "Spooky",                    "spooky" ],
                [ "Upbeat",                    "upbeat" ],
                [ "Combat",                    "combat" ],
                [ "Combat 2",                "combat-2" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
            ];
        case "1169816876570902528":
            return [
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
                [ "Casual",                "casual-new" ],
                [ "Sadge",                        "sad" ],
                [ "Spooky",                    "spooky" ],
                [ "Chill Overview",    "overview-chill" ],
                [ "General Combat",    "combat-general" ],
                [ "Urgent Combat",      "combat-urgent" ],
                [ "Epic Combat",          "combat-epic" ],
                [ "Midnight Sky",        "midnight-sky" ],
                [ "Adevage",                  "adevage" ],
                [ "Arth",                        "arth" ],
                [ "Court of Dawn",      "court-of-dawn" ],
                [ "Desert (Day)",          "desert-day" ],
                [ "Desert (Night)",      "desert-night" ],
                [ "Insilit",                  "insilit" ],
                [ "Osiris",                    "osiris" ],
                [ "Seld",                        "seld" ],
                [ "Rosch",                      "rosch" ],
                [ "Duvroth (General)",        "duvroth" ],
                [ "Flint (General)",            "flint" ],
                [ "Kallayo and Flint",  "kallayo-flint" ],
                [ "Kallayo (About Mom)",  "kallayo-mom" ],
                [ "Kallayo (Stressed)","kallayo-stress" ],
                [ "Tezar",              "kallayo-tezar" ],
                [ "Tezar (Death)","kallayo-tezar-death" ],
                [ "Kiraya (Peaceful)","kiraya-at-peace" ],
                [ "Kiraya (About Mom)",    "kiraya-mom" ],
                [ "Kiraya shop",          "kiraya-shop" ],
                [ "Kiraya (Sombre)",    "kiraya-sombre" ],
                [ "Meadow (General)",          "meadow" ],
                [ "Meadow Music Box", "meadow-music-box"],
                [ "Sovia (Peaceful)",     "sovia-happy" ],
                [ "Zh\'era (Happy)",      "zhera-happy" ],
                [ "Zh\'era (Sombre)",    "zhera-sombre" ],
            ];
        case "1424625749389869088":
            return [
                [ "Cyberpunk Vibe",            "casual" ],
                [ "Play",                        "play" ],
                [ "Pause",                      "pause" ],
            ]
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
                    [ "Tezar death", "kallayo-tezar-death" ],
                    [ "Flint and Kallayo",  "kallayo-flint" ],]
                ),
                new Player("Kiraya", "1169820404433571892", "200297075882065921",
                    [[ "Kiraya peaceful", "kiraya-at-peace" ],
                    [ "Kiraya mom", "kiraya-mom" ],
                    [ "Kiraya shop/tavern", "kiraya-shop" ],
                    [ "Kiraya sombre", "kiraya-sombre" ],]
                ),
                new Player("Meadow", "1169820364222759064", "260643778820308992",
                    [[ "Meadow general", "meadow" ],
                    [ "Meadow Music Box", "meadow-music-box" ],]
                ),
                new Player("Sovia", "1266925525104988190", "321453182029004800",
                    [[ "Sovia peaceful", "sovia-happy" ],]
                ),
                new Player("Zh\'Era", "1169820169401532437", "827473044054081566",
                    [[ "Zh\'era happy", "zhera-happy" ],
                    [ "Zh\'era sombre", "zhera-sombre" ],]
                ),
            ];
        case "1424625749389869088":
            return [
                new Player("Hanaya", "1426001969608396930", "200297075882065921",
                    []
                ),
                new Player("Mouse", "1426002217021997086", "260643778820308992",
                    []
                ),
                new Player("Hanmi", "1426002067511840808", "203542663851409409",
                    []
                ),
                new Player("Dex", "1430312566315421826", "175803105613447169",
                    []
                ),
                new Player("Blue", "1426001759612174396", "195982074614644737",
                    []
                ),
                new Player("Sparky", "1426001798044319845", "322485420833112077",
                    []
                ),
                new Player("Bai", "1426018958175109120", "321453182029004800",
                    []
                ),
                new Player("Jonno", "1426002276132065380", "289214778398736386",
                    []
                ),
            ];
    }
}

function resolveBGMAudioPlayer(id) {
    switch (id) {
        case "1185383286437060699":
            return global.HollowPantheonBGMAudioPlayer;
        case "1169816876570902528":
            return global.HollowExplorersBGMAudioPlayer;
        case "1424625749389869088":
            return global.NightCityBGMAudioPlayer;
    }
}

function resolveRCAudioPlayer(id) {
    switch (id) {
        case "1185383286437060699":
            return global.HollowPantheonRCAudioPlayer;
        case "1169816876570902528":
            return global.HollowExplorersRCAudioPlayer;
        case "1424625749389869088":
            return global.NightCityRCAudioPlayer;
    }
}

function resolveSessionActive(id) {
    switch (id) {
        case "1185383286437060699":
            return global.hollowPantheonSessionActive;
        case "1169816876570902528":
            return global.hollowExplorersSessionActive;
        case "1424625749389869088":
            return global.nightCitySessionActive;
    }
}

module.exports = Guild;
