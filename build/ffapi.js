"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const team_1 = require("./Classes/team");
const player_1 = require("./Classes/player");
class FFAPI {
    constructor(leagueID, year, cookies) {
        this.baseURL = "http://fantasy.espn.com/apis/v3/games/ffl/seasons/";
        this.mid = "/segments/0/leagues/";
        this.leagueID = leagueID;
        this.year = year;
        this.cookies = cookies;
    }
    getLeagueInfo() {
        const route = this.createRoute("?view=mSettings");
        return axios_1.default
            .get(route, this.axiosConfig())
            .then((response) => {
            return response.data;
        })
            .catch((err) => {
            return err;
        });
    }
    getMatchups(week) {
        const route = this.createRoute("?view=mMatchupScore");
        return axios_1.default
            .get(route, this.axiosConfig())
            .then((response) => {
            return response.data.schedule.filter((matchup) => {
                return matchup.matchupPeriodId === week;
            });
        })
            .catch((err) => {
            return err;
        });
    }
    getTeams(week) {
        const route = this.createRoute(`?scoringPeriodId=${week}&view=mRoster&view=mTeam`);
        return axios_1.default
            .get(route, this.axiosConfig())
            .then((response) => {
            return response.data.teams.map((team) => {
                return new team_1.Team(team);
            });
        })
            .catch((err) => {
            return err;
        });
    }
    getPlayers(playerIds, week) {
        const route = this.createRoute(`?scoringPeriodId=${week}&view=kona_player_info`);
        const config = this.axiosConfig();
        const filters = { players: { filterIds: { value: playerIds } } };
        config.headers["x-fantasy-filter"] = JSON.stringify(filters);
        return axios_1.default
            .get(route, config)
            .then((response) => {
            return response.data.players.map((player) => {
                const newPlayer = new player_1.Player(player.player);
                newPlayer.onTeamId = player.onTeamId;
                return newPlayer;
            });
        })
            .catch((err) => {
            return err;
        });
    }
    createRoute(tail) {
        return this.baseURL + this.year + this.mid + this.leagueID + tail;
    }
    axiosConfig() {
        if (this.cookies) {
            return {
                headers: {
                    Cookie: `espn_s2=${this.cookies["espn_s2"]}; SWID=${this.cookies["swid"]};`,
                },
            };
        }
        return {};
    }
}
exports.FFAPI = FFAPI;
