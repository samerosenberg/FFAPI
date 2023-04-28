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
            newPlayer.onTeamId = player.onTeamId;
            newPlayer.lineupSlotId = poolEntry.lineupSlotId;
            return newPlayer;
        });
        this.transactionCounter = team.transactionCounter;
        this.waiverRank = team.waiverRank;
    }

    //TODO: Fix this
    public getMaxPointsForWeek(): number {
        const roster = new Map<string, Map<number, number>[]>();
        for (const [slotId, pos] of lineupSlotIds) {
            this.roster.map((player) => {
                // if (pos in roster) {
                //     roster[pos].append([
                //         player.id,
                //         player.weekStats?.appliedTotal ?? 0,
                //     ]);
                // } else {
                //     roster[pos] = [
                //         [player.id, player.weekStats?.appliedTotal ?? 0],
                //     ];
                // }
            });
        }
        return 0;
    }
}

const lineupSlotIds = new Map<number, string>([
    [0, "QB"],
    [2, "RB"],
    [4, "WR"],
    [6, "TE"],
    [23, "FLEX"],
    [16, "D/ST"],
    [17, "K"],
]);

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
