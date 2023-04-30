import { TeamRecord, ITeamRecord } from "./record";
import { Player, IESPNPlayer } from "./player";
import { Roster } from "./roster";
import { start } from "repl";

export class Team {
    public abbrev: string;
    public currentProjectedRank: number;
    public divisionId: number;
    public draftDayProjectedRank: 7;
    public id: number;
    public name: string;
    public owners: string[];
    public playoffSeed: number;
    public points: number;
    public primaryOwner: string;
    public rankCalculatedFinal: number;
    public record: TeamRecord;
    public roster: Roster;
    public transactionCounter: ITransactionCounter;
    public waiverRank: number;

    constructor(team: ITeam, week: number) {
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
        this.record = new TeamRecord(team.record);
        this.roster = Roster.rosterFromArray(
            team.roster.entries.map((poolEntry: IPlayerPoolEntry) => {
                const player = poolEntry.playerPoolEntry;
                const newPlayer = new Player(player.player, week);
                newPlayer.onTeamId = player.onTeamId;
                newPlayer.lineupSlotId = poolEntry.lineupSlotId;
                return newPlayer;
            })
        );
        this.transactionCounter = team.transactionCounter;
        this.waiverRank = team.waiverRank;
    }

    //TODO: Fix this
    public getMaxPointsForWeek(): Roster {
        const maxRoster = Object.assign([], this.roster);
        var maxPoints = 0;

        for (const pos of lineupSlotIds) {
            for (const starter of maxRoster[pos]) {
                var maxPlayer: Player | undefined = undefined;
                for (const player of maxRoster["BE"]) {
                    if (player.eligibleSlots.includes(starter.lineupSlotId)) {
                        if (!maxPlayer) {
                            maxPlayer = player;
                        } else if ((maxPlayer.weekStats?.appliedTotal ?? 0) < (player.weekStats?.appliedTotal ?? 0)) {
                            maxPlayer = player;
                        }
                    }
                }
                if (maxPlayer) {
                    if ((starter.weekStats?.appliedTotal ?? 0) < (maxPlayer.weekStats?.appliedTotal ?? 0)) {
                        maxRoster[pos] = maxRoster[pos].filter((removePlayer) => {
                            return removePlayer.id !== starter.id;
                        });
                        maxRoster[pos].push(maxPlayer);
                        maxRoster["BE"] = maxRoster["BE"].filter((removePlayer: Player) => {
                            return removePlayer.id !== maxPlayer?.id;
                        });
                        maxRoster["BE"].push(starter);
                        maxPoints += maxPlayer.weekStats?.appliedTotal ?? 0;
                    } else {
                        maxPoints += starter.weekStats?.appliedTotal ?? 0;
                    }
                } else {
                    maxPoints += starter.weekStats?.appliedTotal ?? 0;
                }
            }
        }

        return maxRoster;
    }
}

const lineupSlotIds = ["QB", "RB", "WR", "TE", "FLEX", "DST", "K"];

const posToID: Record<string, number> = {
    QB: 0,
    RB: 2,
    WR: 4,
    TE: 6,
    FLEX: 23,
    DST: 16,
    K: 17,
    BE: 20,
};

export interface ITeam {
    abbrev: string;
    currentProjectedRank: number;
    divisionId: number;
    draftDayProjectedRank: 7;
    id: number;
    name: string;
    owners: string[];
    playoffSeed: number;
    points: number;
    primaryOwner: string;
    rankCalculatedFinal: number;
    record: ITeamRecord;
    roster: { entries: IPlayerPoolEntry[] };
    transactionCounter: ITransactionCounter;
    waiverRank: number;
}

interface IPlayerPoolEntry {
    lineupSlotId: number;
    playerPoolEntry: IESPNPlayer;
}

interface ITransactionCounter {
    acquisitions: number;
    drops: number;
    trades: number;
}
