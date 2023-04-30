import { Player } from "./player";

export class Roster {
    public QB: Player[] = [];
    public RB: Player[] = [];
    public WR: Player[] = [];
    public TE: Player[] = [];
    public FLEX: Player[] = [];
    public DST: Player[] = [];
    public K: Player[] = [];
    public BE: Player[] = [];
    [key: string]: Player[];

    public static rosterFromArray(playerArray: Player[]) {
        const roster = new Roster();
        playerArray.map((player: Player) => {
            const pos = lineupSlotId[player.lineupSlotId];
            if (pos in roster) {
                roster[pos].push(player);
            }
        });
        return roster;
    }

    public static rosterFromMap(playerMap: Map<string, Player[]>) {}
}

const lineupSlotId: Record<number, string> = {
    0: "QB",
    2: "RB",
    4: "WR",
    6: "TE",
    23: "FLEX",
    16: "DST",
    17: "K",
    20: "BE",
};
