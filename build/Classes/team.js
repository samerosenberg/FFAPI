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
            newPlayer.lineupSlotId = poolEntry.lineupSlotId;
            return newPlayer;
        });
        this.transactionCounter = team.transactionCounter;
        this.waiverRank = team.waiverRank;
    }
    //TODO: Fix this
    getMaxPointsForWeek() {
        const roster = new Map();
        for (const [slotId, pos] of lineupSlotIds) {
            this.roster.map((player) => {
                // if (pos in roster) {
                //     roster[pos].append([
                //         player.id,
                //         player.weekStats?.appliedTotal ?? 0,
                //     ]);
                // } else {
                //     roster[pos] = [
                //         [player.id, player.weekStats?.appliedTotal ?? 0],
                //     ];
                // }
            });
        }
        return 0;
    }
}
exports.Team = Team;
const lineupSlotIds = new Map([
    [0, "QB"],
    [2, "RB"],
    [4, "WR"],
    [6, "TE"],
    [23, "FLEX"],
    [16, "D/ST"],
    [17, "K"],
]);
