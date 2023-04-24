"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ffapi_1 = require("./ffapi");
const leagueInfo_json_1 = __importDefault(require("./leagueInfo.json"));
const testAPI = new ffapi_1.FFAPI(leagueInfo_json_1.default.leagueID, 2022, {
    espn_s2: leagueInfo_json_1.default.espn_s2,
    swid: leagueInfo_json_1.default.swid,
});
function testGetLeagueInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        const league = yield testAPI.getLeagueInfo();
        console.log(league);
    });
}
//testGetLeagueInfo();
function testGetMatchups() {
    return __awaiter(this, void 0, void 0, function* () {
        const matchups = yield testAPI.getMatchups();
        console.log(matchups);
    });
}
//testGetMatchups();
function testGetTeams() {
    return __awaiter(this, void 0, void 0, function* () {
        const teams_week3 = yield testAPI.getTeams(3);
        console.log(teams_week3);
    });
}
//testGetTeams();
function testGetTeamsRoster() {
    return __awaiter(this, void 0, void 0, function* () {
        const teams_week1 = yield testAPI.getTeams(3);
        //console.log(teams_week1.teams[0]);
        const roster = teams_week1.teams[0].roster;
        const roster_names = [];
        for (const player of roster.entries) {
            const player_name = yield testAPI.getPlayers([player.playerId], 1);
            roster_names.push(player_name.players[0].player.fullName);
        }
        console.log(roster_names);
        const teams_week19 = yield testAPI.getTeams(4);
        const roster_week19 = teams_week19.teams[0].roster;
        const roster_names_week19 = [];
        for (const player of roster_week19.entries) {
            const player_name = yield testAPI.getPlayers([player.playerId], 1);
            roster_names_week19.push(player_name.players[0].player.fullName);
        }
        //console.log(teams_week19.teams[0]);
        console.log(roster_names_week19);
    });
}
//testGetTeamsRoster();
function testGetPlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        const players = yield testAPI.getPlayers([2976212], 4);
        console.log(players[0]);
        //console.log("002022:", players[0].player.stats[1].stats);
        //console.log("weekly:", players.players[0].player.stats[2].stats); //scoring period === week && stateSourceId === 0: points scored
        //console.log("1120221:", players.players[0].player.stats[4].stats); //scoring period === week && statSourceId === 1: projections
    });
}
testGetPlayers();
