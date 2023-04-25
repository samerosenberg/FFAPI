import { FFAPI } from "./ffapi";
import leagueInfo from "./leagueInfo.json";

const testAPI = new FFAPI(leagueInfo.leagueID, 2022, {
    espn_s2: leagueInfo.espn_s2,
    swid: leagueInfo.swid,
});

async function testGetLeagueInfo() {
    const league = await testAPI.getLeagueInfo();
    console.log(league);
}

//testGetLeagueInfo();

async function testGetMatchups(): Promise<void> {
    const matchups = await testAPI.getMatchups();
    console.log(matchups);
}

//testGetMatchups();

async function testGetTeams(): Promise<void> {
    const teams_week3 = await testAPI.getTeams(3);
    console.log(teams_week3[0].roster);
}

testGetTeams();

async function testGetTeamsRoster(): Promise<void> {
    const teams_week1 = await testAPI.getTeams(3);
    //console.log(teams_week1.teams[0]);
    const roster = teams_week1.teams[0].roster;
    const roster_names = [];
    for (const player of roster.entries) {
        const player_name = await testAPI.getPlayers([player.playerId], 1);
        roster_names.push(player_name.players[0].player.fullName);
    }
    console.log(roster_names);

    const teams_week19 = await testAPI.getTeams(4);
    const roster_week19 = teams_week19.teams[0].roster;
    const roster_names_week19 = [];
    for (const player of roster_week19.entries) {
        const player_name = await testAPI.getPlayers([player.playerId], 1);
        roster_names_week19.push(player_name.players[0].player.fullName);
    }
    //console.log(teams_week19.teams[0]);
    console.log(roster_names_week19);
}

//testGetTeamsRoster();

async function testGetPlayers(): Promise<void> {
    const players = await testAPI.getPlayers([2976212], 5);
    console.log(players[0]);
    //console.log("002022:", players[0].player.stats[1].stats);
    //console.log("weekly:", players.players[0].player.stats[2].stats); //scoring period === week && stateSourceId === 0: points scored
    //console.log("1120221:", players.players[0].player.stats[4].stats); //scoring period === week && statSourceId === 1: projections
}

//testGetPlayers();
