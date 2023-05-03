import axios, { AxiosResponse } from "axios";
import { Team, ITeam } from "./Classes/team";
import { Player, IPlayer, IESPNPlayer } from "./Classes/player";
import { IMatchup, Matchup } from "./Classes/matchup";

export class FFAPI {
    private leagueID: string;
    private year: number;
    private cookies: { espn_s2: string; swid: string } | undefined;

    private baseURL: string = "http://fantasy.espn.com/apis/v3/games/ffl/seasons/";
    private mid: string = "/segments/0/leagues/";

    constructor(leagueID: string, year: number, cookies?: { espn_s2: string; swid: string }) {
        this.leagueID = leagueID;
        this.year = year;
        this.cookies = cookies;
    }

    public getLeagueInfo(): Promise<any> {
        const route = this.createRoute("?view=mSettings");

        return axios
            .get(route, this.axiosConfig())
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return err;
            });
    }

    public getMatchups(week: number): Promise<Matchup[]> {
        const route = this.createRoute("?view=mMatchupScore");

        return axios
            .get(route, this.axiosConfig())
            .then((response) => {
                return response.data.schedule.filter((matchup: IMatchup) => {
                    return matchup.matchupPeriodId === week;
                });
            })
            .catch((err) => {
                return err;
            });
    }

    public getTeams(week: number): Promise<Team[]> {
        const route = this.createRoute(`?scoringPeriodId=${week}&view=mRoster&view=mTeam`);

        return axios
            .get(route, this.axiosConfig())
            .then((response) => {
                return response.data.teams.map((team: ITeam) => {
                    return new Team(team, week);
                });
            })
            .catch((err) => {
                return err;
            });
    }

    public getPlayers(playerIds: [number], week: number): Promise<Player[]> {
        const route = this.createRoute(`?scoringPeriodId=${week}&view=kona_player_info`);
        const config = this.axiosConfig();
        const filters = { players: { filterIds: { value: playerIds } } };
        config.headers["x-fantasy-filter"] = JSON.stringify(filters);

        return axios
            .get(route, config)
            .then((response) => {
                return response.data.players.map((player: IESPNPlayer) => {
                    const newPlayer = new Player(player.player, week);
                    newPlayer.onTeamId = player.onTeamId;
                    return newPlayer;
                });
            })
            .catch((err) => {
                return err;
            });
    }

    private createRoute(tail: string) {
        return this.baseURL + this.year + this.mid + this.leagueID + tail;
    }

    private axiosConfig(): { [headers: string]: Headers } {
        if (this.cookies) {
            return {
                headers: {
                    Cookie: `espn_s2=${this.cookies["espn_s2"]}; SWID=${this.cookies["swid"]};`,
                },
            };
        }
        return {};
    }
}

interface Headers {
    Cookie: string;
    "x-fantasy-filter"?: {};
}
