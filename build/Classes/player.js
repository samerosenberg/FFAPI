"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(player) {
        this.id = player.id;
        this.onTeamId = player.onTeamId;
        this.active = player.active;
        this.defaultPositionId = player.defaultPositionId;
        this.lineupSlotId = -1;
        this.droppable = player.droppable;
        this.eligibleSlots = player.eligibleSlots;
        this.firstName = player.firstName;
        this.fullName = player.fullName;
        this.injured = player.injured;
        this.injuryStatus = player.injuryStatus;
        this.jersey = player.jersey;
        this.lastName = player.lastName;
        this.proTeamId = player.proTeamId;
        this.seasonOutlook = player.seasonOutlook;
        this.totalStats = this.getTotalStats(player.stats);
        this.weekStats = this.getWeekStats(player.stats);
        this.weekProjections = this.getWeekProjections(player.stats);
    }
    getTotalStats(playerStats) {
        var _a;
        const totalStats = (_a = playerStats.filter((stat) => {
            return stat.scoringPeriodId === 0 && stat.statSourceId === 0;
        })[0]) !== null && _a !== void 0 ? _a : undefined;
        if (!totalStats) {
            return {};
        }
        var statmap = new Map();
        Object.keys(totalStats.stats).map((key) => {
            const mapping = ScoringIdMap[key];
            if (mapping) {
                statmap.set(mapping, totalStats.stats[key]);
            }
        });
        totalStats.stats = statmap;
        return totalStats;
    }
    getWeekStats(playerStats) {
        var _a;
        const weekStats = (_a = playerStats.filter((stat) => {
            return stat.scoringPeriodId !== 0 && stat.statSourceId === 0;
        })[0]) !== null && _a !== void 0 ? _a : undefined;
        if (!weekStats) {
            return;
        }
        var statmap = new Map();
        Object.keys(weekStats.stats).map((key) => {
            const mapping = ScoringIdMap[key];
            if (mapping) {
                statmap.set(mapping, weekStats.stats[key]);
            }
        });
        weekStats.stats = statmap;
        return weekStats;
    }
    getWeekProjections(stats) {
        var _a;
        const weekProjections = (_a = stats.filter((stat) => {
            return stat.scoringPeriodId !== 0 && stat.statSourceId === 1;
        })[0]) !== null && _a !== void 0 ? _a : undefined;
        if (!weekProjections) {
            return {};
        }
        var statmap = new Map();
        Object.keys(weekProjections.stats).map((key) => {
            const mapping = ScoringIdMap[key];
            if (mapping) {
                statmap.set(mapping, weekProjections.stats[key]);
            }
        });
        weekProjections.stats = statmap;
        return weekProjections;
    }
}
exports.Player = Player;
const ScoringIdMap = {
    "0": "passingAttempts",
    "1": "passingCompletions",
    "2": "passingIncompletions",
    "3": "passingYards",
    "4": "passingTouchdowns",
    "19": "passing2PtConversion",
    "20": "passingInterceptions",
    "23": "rushingAttempts",
    "24": "rushingYards",
    "25": "rushingTouchdowns",
    "26": "rushing2PtConversion",
    "38": "rushing200PlusYardGame",
    "41": "receivingReceptions",
    "42": "receivingYards",
    "43": "receivingTouchdowns",
    "44": "receiving2PtConversions",
    "68": "fumbles",
    "213": "receivingFirstDowns",
};
