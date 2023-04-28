import { FFAPI } from "../ffapi";

export function max_points(ffapi: FFAPI, week: number) {
    const teams = ffapi.getTeams(week);
    const matchup = ffapi.getMatchups(week);
}

//max_points(1);
