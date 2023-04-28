"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.max_points = void 0;
function max_points(ffapi, week) {
    const teams = ffapi.getTeams(week);
    const matchup = ffapi.getMatchups(week);
}
exports.max_points = max_points;
//max_points(1);
