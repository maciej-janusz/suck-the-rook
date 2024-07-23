import { ChessPiece, PIECES } from "./pieces";
type Fields = (null | ChessPiece)[][];

class ChessBoard {
  fields: ChessPiece[][];

  constructor(fenStr: string) {
    this.fields = [...Array(8)].map(() => Array(8).fill(null));
    this.readFen(fenStr)
  }

  readFen(fenStr: string) {
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
          this.fields[y][x] = new PIECES[element.toLowerCase()](color);
          x ++;
        } else {
          x += Number(element);
        }
      });

      y ++;
    });
  }
}

export { type Fields, ChessBoard };