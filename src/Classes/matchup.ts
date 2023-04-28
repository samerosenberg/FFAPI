import { KeyPairKeyObjectResult } from "crypto";
import { ITeam } from "./team";

export class Matchup {}

export interface IMatchup {
    away: IBoxScore;
    home: IBoxScore;
    id: number;
    matchupPeriodId: number;
    playoffTierType: string;
    winner: string;
}

interface IBoxScore {
    cumulativeScores: object;
    pointsByScoringPeriod: object;
    teamId: number;
    totalPoints: number;
}
