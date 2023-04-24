"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRecord = void 0;
class TeamRecord {
    constructor(record) {
        this.away = record.away;
        this.division = record.division;
        this.home = record.home;
        this.overall = record.overall;
    }
}
exports.TeamRecord = TeamRecord;
