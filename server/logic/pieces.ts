import { type Fields } from "./board";

type Cords = {
  x: number;
  y: number;
};

class ChessPiece {
  color: boolean;
  value?: number;
  allMoves?: (fields: Fields, cords: Cords) => Cords[];

  constructor(color: boolean) {
    this.color = color;
  }
}

class LinearPiece extends ChessPiece {
  linearMoves = (
    fields: Fields,
    cords: Cords,
    xMove: number,
    yMove: number
  ): Cords[] => {
    let moves: Cords[] = [];
    let { x, y } = cords;
    x += xMove;
    y += yMove;

    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      const piece = fields[y][x];
      if (!piece) {
        moves.push({ x, y });
      } else {
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
class PrimitivePiece extends ChessPiece {
  primitiveMoves = (
    fields: Fields,
    cords: Cords,
    xMove: number,
    yMove: number
  ): Cords[] => {
    let moves: Cords[] = [];
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
class PawnPiece extends ChessPiece {
  pawnMoves = (fields: Fields, cords: Cords, xMove: number): Cords[] => {
    let moves: Cords[] = [];

    let { x, y } = cords;
    const yMove = this.color ? 1 : 0;

    x += xMove;
    y += yMove;

    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
      const piece = fields[y][x];
      if (!piece) {
        moves.push({ x, y });
      } else {
        if (xMove !== 0 && piece.color !== this.color) moves.push({ x, y });
      }
    }

    return moves;
  };

  startMove = (fields: Fields, cords: Cords): Cords[] => {
    let moves: Cords[] = [];

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

class Pawn extends PawnPiece {
  value = 1;
  allMoves = (fields: Fields, cords: Cords): Cords[] => {
    const moves = [
      ...this.pawnMoves(fields, cords, -1),
      ...this.pawnMoves(fields, cords, 0),
      ...this.pawnMoves(fields, cords, 1),
      ...this.startMove(fields, cords),
    ];

    return moves;
  };

  constructor(color: boolean) {
    super(color);
  }
}
class Rook extends LinearPiece {
  value = 5;
  allMoves = (fields: Fields, cords: Cords): Cords[] => {
    const moves = [
      ...this.linearMoves(fields, cords, 1, 0),
      ...this.linearMoves(fields, cords, -1, 0),
      ...this.linearMoves(fields, cords, 0, 1),
      ...this.linearMoves(fields, cords, 0, -1),
    ];

    return moves;
  };
}
class Bishop extends LinearPiece {
  value = 3;
  allMoves = (fields: Fields, cords: Cords): Cords[] => {
    const moves = [
      ...this.linearMoves(fields, cords, 1, 1),
      ...this.linearMoves(fields, cords, -1, -1),
      ...this.linearMoves(fields, cords, 1, -1),
      ...this.linearMoves(fields, cords, -1, 1),
    ];

    return moves;
  };
}
class Queen extends LinearPiece {
  value = 9;
  allMoves = (fields: Fields, cords: Cords): Cords[] => {
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
class Knight extends PrimitivePiece {
  value = 3;
  allMoves = (fields: Fields, cords: Cords): Cords[] => {
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
class King extends PrimitivePiece {
  value = Number.POSITIVE_INFINITY;
  allMoves = (fields: Fields, cords: Cords): Cords[] => {
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

const PIECES: { [id: string]: typeof ChessPiece } = {
  r: Rook,
  b: Bishop,
  q: Queen,
  n: Knight,
  k: King,
  p: Pawn,
} as const;

export { ChessPiece, Rook, Bishop, Queen, Knight, King, Pawn, PIECES };
