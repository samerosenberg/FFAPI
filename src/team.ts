import { TeamRecord, ITeamRecord } from "./record";
import { Player, IESPNPlayer } from "./player";

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
    public roster: Player[];
    public transactionCounter: ITransactionCounter;
    public waiverRank: number;

    constructor(team: ITeam) {
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
        this.roster = team.roster.entries.map((poolEntry: IPlayerPoolEntry) => {
            const player = poolEntry.playerPoolEntry;
            const newPlayer = new Player(player.player);
            newPlayer.onTeamId = player.onTeamId; // can we include current slot too
            return newPlayer;
        });
        this.transactionCounter = team.transactionCounter;
        this.waiverRank = team.waiverRank;
    }
}

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
    playerPoolEntry: IESPNPlayer;
}

interface ITransactionCounter {
    acquisitions: number;
    drops: number;
    trades: number;
}
