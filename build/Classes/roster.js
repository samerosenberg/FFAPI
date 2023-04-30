"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roster = void 0;
class Roster {
    constructor() {
        this.QB = [];
        this.RB = [];
        this.WR = [];
        this.TE = [];
        this.FLEX = [];
        this.DST = [];
        this.K = [];
        this.BE = [];
    }
    static rosterFromArray(playerArray) {
        const roster = new Roster();
        playerArray.map((player) => {
            const pos = lineupSlotId[player.lineupSlotId];
            if (pos in roster) {
                roster[pos].push(player);
            }
        });
        return roster;
    }
    static rosterFromMap(playerMap) { }
}
exports.Roster = Roster;
const lineupSlotId = {
    0: "QB",
    2: "RB",
    4: "WR",
    6: "TE",
    23: "FLEX",
    16: "DST",
    17: "K",
    20: "BE",
};
