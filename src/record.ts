export class TeamRecord {
    public away: IRecord;
    public division: IRecord;
    public home: IRecord;
    public overall: IRecord;
    constructor(record: ITeamRecord) {
        this.away = record.away;
        this.division = record.division;
        this.home = record.home;
        this.overall = record.overall;
    }
}

export interface ITeamRecord {
    away: IRecord;
    division: IRecord;
    home: IRecord;
    overall: IRecord;
}

interface IRecord {
    gamesBack: number;
    losses: number;
    percentage: number;
    pointsAgainst: number;
    pointsFor: number;
    streakLength: number;
    streakType: string;
    ties: number;
    wins: number;
}
