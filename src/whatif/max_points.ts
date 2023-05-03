import { Matchup } from "../Classes/matchup";
import { FFAPI } from "../ffapi";
import leagueInfo from "../leagueInfo.json";

export async function max_points(ffapi: FFAPI, week: number) {
    const teams = await ffapi.getTeams(week);
    const matchups = await ffapi.getMatchups(week);

    matchups.map((matchup: Matchup) => {
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
}

const testAPI = new FFAPI(leagueInfo.leagueID, 2022, {
    espn_s2: leagueInfo.espn_s2,
    swid: leagueInfo.swid,
});

max_points(testAPI, 1);
