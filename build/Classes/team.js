"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const record_1 = require("./record");
const player_1 = require("./player");
const roster_1 = require("./roster");
class Team {
    constructor(team, week) {
        this.abbrev = team.abbrev;
        this.currentProjectedRank = team.currentProjectedRank;
        this.divisionId = team.divisionId;
        this.draftDayProjectedRank = team.draftDayProjectedRank;
        this.id = team.id;
        this.name = team.name;
        this.owners = team.owners;
        this.playoffSeed = team.playoffSeed;
        this.points = team.points;
        this.primaryOwner = team.primaryOwner;
        this.rankCalculatedFinal = team.rankCalculatedFinal;
        this.record = new record_1.TeamRecord(team.record);
        this.roster = roster_1.Roster.rosterFromArray(team.roster.entries.map((poolEntry) => {
            const player = poolEntry.playerPoolEntry;
            const newPlayer = new player_1.Player(player.player, week);
            newPlayer.onTeamId = player.onTeamId;
            newPlayer.lineupSlotId = poolEntry.lineupSlotId;
            return newPlayer;
        }));
        this.transactionCounter = team.transactionCounter;
        this.waiverRank = team.waiverRank;
    }
    //TODO: Fix this
    getMaxPointsForWeek() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const maxRoster = Object.assign([], this.roster);
        var maxPoints = 0;
        for (const pos of lineupSlotIds) {
            for (const starter of maxRoster[pos]) {
                var maxPlayer = undefined;
                for (const player of maxRoster["BE"]) {
                    if (player.eligibleSlots.includes(starter.lineupSlotId)) {
                        if (!maxPlayer) {
                            maxPlayer = player;
                        }
                        else if (((_b = (_a = maxPlayer.weekStats) === null || _a === void 0 ? void 0 : _a.appliedTotal) !== null && _b !== void 0 ? _b : 0) < ((_d = (_c = player.weekStats) === null || _c === void 0 ? void 0 : _c.appliedTotal) !== null && _d !== void 0 ? _d : 0)) {
                            maxPlayer = player;
                        }
                    }
                }
                if (maxPlayer) {
                    if (((_f = (_e = starter.weekStats) === null || _e === void 0 ? void 0 : _e.appliedTotal) !== null && _f !== void 0 ? _f : 0) < ((_h = (_g = maxPlayer.weekStats) === null || _g === void 0 ? void 0 : _g.appliedTotal) !== null && _h !== void 0 ? _h : 0)) {
                        maxRoster[pos] = maxRoster[pos].filter((removePlayer) => {
                            return removePlayer.id !== starter.id;
                        });
                        maxRoster[pos].push(maxPlayer);
                        maxRoster["BE"] = maxRoster["BE"].filter((removePlayer) => {
                            return removePlayer.id !== (maxPlayer === null || maxPlayer === void 0 ? void 0 : maxPlayer.id);
                        });
                        maxRoster["BE"].push(starter);
                        maxPoints += (_k = (_j = maxPlayer.weekStats) === null || _j === void 0 ? void 0 : _j.appliedTotal) !== null && _k !== void 0 ? _k : 0;
                    }
                    else {
                        maxPoints += (_m = (_l = starter.weekStats) === null || _l === void 0 ? void 0 : _l.appliedTotal) !== null && _m !== void 0 ? _m : 0;
                    }
                }
                else {
                    maxPoints += (_p = (_o = starter.weekStats) === null || _o === void 0 ? void 0 : _o.appliedTotal) !== null && _p !== void 0 ? _p : 0;
                }
            }
        }
        return maxRoster;
    }
}
exports.Team = Team;
const lineupSlotIds = ["QB", "RB", "WR", "TE", "FLEX", "DST", "K"];
const posToID = {
    QB: 0,
    RB: 2,
    WR: 4,
    TE: 6,
    FLEX: 23,
    DST: 16,
    K: 17,
    BE: 20,
};
