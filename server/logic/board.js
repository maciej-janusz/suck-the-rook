"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChessBoard = void 0;
const pieces_1 = require("./pieces");
class ChessBoard {
    constructor(fenStr) {
        this.fields = [...Array(8)].map(() => Array(8).fill(null));
        this.readFen(fenStr);
    }
    readFen(fenStr) {
        const fenProps = fenStr.split(" ");
        if (fenProps.length < 6) {
            console.error("Invalid fen! More props required!");
            return;
        }
        const fenLines = (fenProps[0].split("").reverse()).join("").split("/");
        let y = 0;
        fenLines.forEach((line) => {
            let x = 0;
            line.split("").forEach((element) => {
                if (isNaN(Number(element))) {
                    const color = element.toUpperCase() === element;
                    this.fields[y][x] = new pieces_1.PIECES[element.toLowerCase()](color);
                    x++;
                }
                else {
                    x += Number(element);
                }
            });
            y++;
        });
    }
}
exports.ChessBoard = ChessBoard;
