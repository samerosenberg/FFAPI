"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const record_1 = require("./record");
const player_1 = require("./player");
class Team {
    constructor(team) {
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
        this.roster = team.roster.entries.map((poolEntry) => {
            const player = poolEntry.playerPoolEntry;
            const newPlayer = new player_1.Player(player.player);
            newPlayer.onTeamId = player.onTeamId;
            return newPlayer;
        });
        this.transactionCounter = team.transactionCounter;
        this.waiverRank = team.waiverRank;
    }
}
exports.Team = Team;
