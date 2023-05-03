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
exports.max_points = void 0;
const ffapi_1 = require("../ffapi");
const leagueInfo_json_1 = __importDefault(require("../leagueInfo.json"));
function max_points(ffapi, week) {
    return __awaiter(this, void 0, void 0, function* () {
        const teams = yield ffapi.getTeams(week);
        const matchups = yield ffapi.getMatchups(week);
        matchups.map((matchup) => {
            const awayTeam = teams[matchup.away.teamId - 1];
            const homeTeam = teams[matchup.home.teamId - 1];
            console.log("Matchup Id: ", matchup.id);
            console.log("Team: ", awayTeam.name);
            console.log("\tPoints Scored: ", matchup.away.totalPoints);
            console.log("\tMax Points: ", awayTeam.getMaxPointsForWeek().points);
            console.log("Team: ", homeTeam.name);
            console.log("\tPoints Scored: ", matchup.home.totalPoints);
            console.log("\tMax Points: ", homeTeam.getMaxPointsForWeek().points);
            console.log();
        });
    });
}
exports.max_points = max_points;
const testAPI = new ffapi_1.FFAPI(leagueInfo_json_1.default.leagueID, 2022, {
    espn_s2: leagueInfo_json_1.default.espn_s2,
    swid: leagueInfo_json_1.default.swid,
});
max_points(testAPI, 1);
