
//	a = JSON.parse(JSON.stringify(a));

/*
forsøg at sætte brik
hvis den ikke kan være der
  så roter brik
  hvis alle former for brik er testet
    så flyt brik til ny position reset form
 ellers sæt brikken
*/

class Puzzle {

	board;
	pieces;
	position = [[]];
	piece = 0;
	solution;

	constructor() {
		for ( let a = 0; a < 10; a++ ) this.resetPosition(a);

		this.pieces = this.setPieces();
		this.board = this.makeBoard();

		//this.placePieces();
		//this.visualizeBoard2();

		for ( let a = 0; a < 1000000; a++ ) this.next();
		this.visualizeBoardConsole();
	}

	next( show ) { 
		if ( !this.nextLocationPiece( this.piece ) ) { 
			this.resetPosition( this.piece );
			this.removePiece( --this.piece ); 
			this.nextLocation( this.piece );
		} 
		else { 
			this.piece++; 
		} 
		if ( show == 'y' ) this.visualizeBoard(); 
	}

	nextLocationPiece( p ) {
		for ( let a = 0; a < 10000; a++ ) {
			if ( this.putPiece( this.position[p][1], this.position[p][0], p, this.position[p][2] ) ) {
				this.savePosition(p);
				return true;
			}
			else {
				if ( !this.nextLocation( p ) ) {
					this.loadPosition(p);
					break;
				}
			}
		}
		return false;
	}

	savePosition( p ) {
		for ( let c = 0; c < 3; c++ ) this.position[p][c+3] = this.position[p][c];		
	}

	loadPosition( p ) {
		for ( let c = 0; c < 3; c++ ) this.position[p][c] = this.position[p][c+3];
	}

	resetPosition( p ) {
		this.position[p] = [0,0,0,0,0,0];
	}

	nextLocation( p ) {
		if ( ++this.position[p][2] > 7 ) {
			this.position[p][2] = 0;
			if ( ++this.position[p][1] > 7 ) {
				this.position[p][1] = 0;
				if ( ++this.position[p][0] > 7 ) {
					this.position[p][0] = 0;
					return false;
				}
			}
		}
		return true;
	}

	removePiece( p ) {
		for ( let a = 0; a < this.pieces[p][this.position[p][2]].length; a++ ) {
			for ( let b = 0; b < this.pieces[p][this.position[p][2]][0].length; b++ ) {
				if ( this.pieces[p][this.position[p][2]][a][b] == '*' ) this.board[this.position[p][1]+b][this.position[p][0]+a] = ' '; 
			}
		}
	}

	putPiece( x, y, piece, position) {
		if ( x + this.pieces[piece][position][0].length > 8 || y + this.pieces[piece][position].length > 8 ) return false;
		for ( let c = 0; c < 2; c++ ) {
			for ( let a = 0; a < this.pieces[piece][position].length; a++ ) {
				for ( let b = 0; b < this.pieces[piece][position][0].length; b++ ) {
					if ( c == 0 ) { 
						if ( this.pieces[piece][position][a][b] == '*' && this.board[x+b][y+a] !== ' ' ) return false;
					}
					else {
						if ( this.pieces[piece][position][a][b] == '*' ) this.board[x+b][y+a] = piece; 
					}	

				}
			}
		}
		return true;
	}

	makeBoard() {
		let board = [
			[' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' '],
			[' ',' ',' ',' ',' ',' ',' ',' '],
		];
		return board;
	}

	visualizeBoardConsole() {
		for ( let a = 0; a < 8; a ++ ) {
			let line = '';
			for ( let b = 0; b < 8; b++ ) {
				line += this.board[b][a];
			}
			console.log(line);
		}
	}

	makeAllPieces(pieces) {
		return pieces;
	}

	setPieces() {
		let pieces = [
			[
				[
					"*****",
					"**   "
				],
				[
					"**",
					"**",
					" *",
					" *",
					" *",
				],
				[
					"   **",
					"*****"
				],
				[
					"* ",
					"* ",
					"* ",
					"**",
					"**",
				],
				[
					"*****",
					"   **"
				],
				[
					" *",
					" *",
					" *",
					"**",
					"**",
				],
				[
					"**   ",
					"*****"
				],
				[
					"**",
					"**",
					"* ",
					"* ",
					"* ",
				],
			],
			[
				[
					"***",
					"*  ",
					"*  ",
				],
				[
					"***",
					"  *",
					"  *",
				],
				[
					"  *",
					"  *",
					"***",
				],
				[
					"*  ",
					"*  ",
					"***",
				],
				[
					"***",
					"  *",
					"  *",
				],
				[
					"  *",
					"  *",
					"***",
				],
				[
					"*  ",
					"*  ",
					"***",
				],
				[
					"***",
					"*  ",
					"*  ",
				],
			],
			[
				[
					"****",
					"****",
				],
				[
					"**",
					"**",
					"**",
					"**",
				],
				[
					"****",
					"****",
				],
				[
					"**",
					"**",
					"**",
					"**",
				],
				[
					"****",
					"****",
				],
				[
					"**",
					"**",
					"**",
					"**",
				],
				[
					"****",
					"****",
				],
				[
					"**",
					"**",
					"**",
					"**",
				],
			],
			[
				[
					"**",
					"* ",
					"* ",
				],
				[
					"***",
					"  *",
				],
				[
					" *",
					" *",
					"**",
				],
				[
					"*  ",
					"***",
				],
				[
					"**",
					" *",
					" *",
				],
				[
					"  *",
					"***",
				],
				[
					"* ",
					"* ",
					"**",
				],
				[
					"***",
					"*  ",
				],
			],
			[
				[
					"*  ",
					"*  ",
					"***",
					"  *",
					"  *",
				],
				[
					"  ***",
					"  *  ",
					"***  ",
				],
				[
					"*  ",
					"*  ",
					"***",
					"  *",
					"  *",
				],
				[
					"  ***",
					"  *  ",
					"***  ",
				],
				[
					"  *",
					"  *",
					"***",
					"*  ",
					"*  ",
				],
				[
					"***  ",
					"  *  ",
					"  ***",
				],
				[
					"  *",
					"  *",
					"***",
					"*  ",
					"*  ",
				],
				[
					"***  ",
					"  *  ",
					"  ***",
				],
			],
			[
				[
					"***",
					"*  ",
					"*  ",
					"*  ",
				],
				[
					"****",
					"   *",
					"   *",
				],
				[
					"  *",
					"  *",
					"  *",
					"***",
				],
				[
					"*   ",
					"*   ",
					"****",
				],
				[
					"***",
					"  *",
					"  *",
					"  *",
				],
				[
					"   *",
					"   *",
					"****",
				],
				[
					"*  ",
					"*  ",
					"*  ",
					"***",
				],
				[
					"****",
					"*   ",
					"*   ",
				],
			],
			[
				[
					"***",
					"** ",
				],
				[
					"**",
					"**",
					" *",
				],
				[
					" **",
					"***",
				],
				[
					"* ",
					"**",
					"**",
				],
				[
					"***",
					" **",
				],
				[
					" *",
					"**",
					"**",
				],
				[
					"** ",
					"***",
				],
				[
					"**",
					"**",
					"* ",
				],
			],
			[
				[
					"***",
					"***",
					"** ",
				],
				[
					"***",
					"***",
					" **",
				],
				[
					" **",
					"***",
					"***",
				],
				[
					"** ",
					"***",
					"***",
				],
				[
					"***",
					"***",
					" **",
				],
				[
					" **",
					"***",
					"***",
				],
				[
					"** ",
					"***",
					"***",
				],
				[
					"***",
					"***",
					"** ",
				],
			],
			[
				[
					"****",
					"**  ",
				],
				[
					"**",
					"**",
					" *",
					" *",
				],
				[
					"  **",
					"****",
				],
				[
					"* ",
					"* ",
					"**",
					"**",
				],
				[
					"****",
					"  **",
				],
				[
					" *",
					" *",
					"**",
					"**",
				],
				[
					"**  ",
					"****",
				],
				[
					"**",
					"**",
					"* ",
					"* ",
				],
			],
			[
				[
					"****",
					"**  ",
					"**  ",
				],
				[
					"***",
					"***",
					"  *",
					"  *",
				],
				[
					"  **",
					"  **",
					"****",
				],
				[
					"*  ",
					"*  ",
					"***",
					"***",
				],
				[
					"****",
					"  **",
					"  **",
				],
				[
					"  *",
					"  *",
					"***",
					"***",
				],
				[
					"**  ",
					"**  ",
					"****",
				],
				[
					"***",
					"***",
					"*  ",
					"*  ",
				],
			],
		];
		return this.makeAllPieces( pieces );
	}

	//visualizeBoard();


	// mirrorPiece();
	// rotatePiece();
	// putPieceBoard();
	// makeAllPieces();


	// -------------------------------------------------------------------



}

var puzzle = new Puzzle();

