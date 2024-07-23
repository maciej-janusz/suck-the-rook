"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PIECES = exports.Pawn = exports.King = exports.Knight = exports.Queen = exports.Bishop = exports.Rook = exports.ChessPiece = void 0;
class ChessPiece {
    constructor(color) {
        this.color = color;
    }
}
exports.ChessPiece = ChessPiece;
class LinearPiece extends ChessPiece {
    constructor() {
        super(...arguments);
        this.linearMoves = (fields, cords, xMove, yMove) => {
            let moves = [];
            let { x, y } = cords;
            x += xMove;
            y += yMove;
            while (x >= 0 && x < 8 && y >= 0 && y < 8) {
                const piece = fields[y][x];
                if (!piece) {
                    moves.push({ x, y });
                }
                else {
                    if (piece.color !== this.color) {
                        moves.push({ x, y });
                    }
                    return moves;
                }
                x += xMove;
                y += yMove;
            }
            return moves;
        };
    }
}
class PrimitivePiece extends ChessPiece {
    constructor() {
        super(...arguments);
        this.primitiveMoves = (fields, cords, xMove, yMove) => {
            let moves = [];
            let { x, y } = cords;
            x += xMove;
            y += yMove;
            if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                const piece = fields[y][x];
                if (!piece || piece.color !== this.color) {
                    moves.push({ x, y });
                }
            }
            return moves;
        };
    }
}
class PawnPiece extends ChessPiece {
    constructor() {
        super(...arguments);
        this.pawnMoves = (fields, cords, xMove) => {
            let moves = [];
            let { x, y } = cords;
            const yMove = this.color ? 1 : 0;
            x += xMove;
            y += yMove;
            if (x >= 0 && x < 8 && y >= 0 && y < 8) {
                const piece = fields[y][x];
                if (!piece) {
                    moves.push({ x, y });
                }
                else {
                    if (xMove !== 0 && piece.color !== this.color)
                        moves.push({ x, y });
                }
            }
            return moves;
        };
        this.startMove = (fields, cords) => {
            let moves = [];
            const { x, y } = cords;
            const yMove = this.color ? 1 : 0;
            const yBase = this.color ? 1 : 6;
            if (y === yBase) {
                const piece1 = fields[x][y + yMove];
                const piece2 = fields[x][y + 2 * yMove];
                if (piece1 === null && piece2 === null) {
                    moves.push({ x: x, y: y + 2 * yMove });
                }
            }
            return moves;
        };
    }
}
class Pawn extends PawnPiece {
    constructor(color) {
        super(color);
        this.value = 1;
        this.allMoves = (fields, cords) => {
            const moves = [
                ...this.pawnMoves(fields, cords, -1),
                ...this.pawnMoves(fields, cords, 0),
                ...this.pawnMoves(fields, cords, 1),
                ...this.startMove(fields, cords),
            ];
            return moves;
        };
    }
}
exports.Pawn = Pawn;
class Rook extends LinearPiece {
    constructor() {
        super(...arguments);
        this.value = 5;
        this.allMoves = (fields, cords) => {
            const moves = [
                ...this.linearMoves(fields, cords, 1, 0),
                ...this.linearMoves(fields, cords, -1, 0),
                ...this.linearMoves(fields, cords, 0, 1),
                ...this.linearMoves(fields, cords, 0, -1),
            ];
            return moves;
        };
    }
}
exports.Rook = Rook;
class Bishop extends LinearPiece {
    constructor() {
        super(...arguments);
        this.value = 3;
        this.allMoves = (fields, cords) => {
            const moves = [
                ...this.linearMoves(fields, cords, 1, 1),
                ...this.linearMoves(fields, cords, -1, -1),
                ...this.linearMoves(fields, cords, 1, -1),
                ...this.linearMoves(fields, cords, -1, 1),
            ];
            return moves;
        };
    }
}
exports.Bishop = Bishop;
class Queen extends LinearPiece {
    constructor() {
        super(...arguments);
        this.value = 9;
        this.allMoves = (fields, cords) => {
            const moves = [
                ...this.linearMoves(fields, cords, 1, 0),
                ...this.linearMoves(fields, cords, -1, 0),
                ...this.linearMoves(fields, cords, 0, 1),
                ...this.linearMoves(fields, cords, 0, -1),
                ...this.linearMoves(fields, cords, 1, 1),
                ...this.linearMoves(fields, cords, -1, -1),
                ...this.linearMoves(fields, cords, 1, -1),
                ...this.linearMoves(fields, cords, -1, 1),
            ];
            return moves;
        };
    }
}
exports.Queen = Queen;
class Knight extends PrimitivePiece {
    constructor() {
        super(...arguments);
        this.value = 3;
        this.allMoves = (fields, cords) => {
            const moves = [
                ...this.primitiveMoves(fields, cords, 1, 2),
                ...this.primitiveMoves(fields, cords, 1, -2),
                ...this.primitiveMoves(fields, cords, -1, 2),
                ...this.primitiveMoves(fields, cords, -1, -2),
                ...this.primitiveMoves(fields, cords, 2, 1),
                ...this.primitiveMoves(fields, cords, 2, -1),
                ...this.primitiveMoves(fields, cords, -2, 1),
                ...this.primitiveMoves(fields, cords, -2, -1),
            ];
            return moves;
        };
    }
}
exports.Knight = Knight;
class King extends PrimitivePiece {
    constructor() {
        super(...arguments);
        this.value = Number.POSITIVE_INFINITY;
        this.allMoves = (fields, cords) => {
            const moves = [
                ...this.primitiveMoves(fields, cords, 1, 1),
                ...this.primitiveMoves(fields, cords, 1, 0),
                ...this.primitiveMoves(fields, cords, 1, -1),
                ...this.primitiveMoves(fields, cords, 0, 1),
                ...this.primitiveMoves(fields, cords, 0, -1),
                ...this.primitiveMoves(fields, cords, -1, 1),
                ...this.primitiveMoves(fields, cords, -1, 0),
                ...this.primitiveMoves(fields, cords, -1, -1),
            ];
            return moves;
        };
    }
}
exports.King = King;
const PIECES = {
    r: Rook,
    b: Bishop,
    q: Queen,
    n: Knight,
    k: King,
    p: Pawn,
};
exports.PIECES = PIECES;
