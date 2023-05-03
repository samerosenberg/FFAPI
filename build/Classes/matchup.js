"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matchup = void 0;
class Matchup {
    constructor(matchup) {
        this.away = matchup.away;
        this.home = matchup.home;
        this.id = matchup.id;
        this.matchupPeriodId = matchup.matchupPeriodId;
        this.playoffTierType = matchup.playoffTierType;
        this.winner = matchup.winner;
    }
}
exports.Matchup = Matchup;
