import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'snake-game-prasanna';
  groundSize = 130;
  snakeSpeed = 1500;
  headPosition = { turn: true, id: 19 };
  nextPosition = 0;
  onGoingGame: any;
  outline = new Map();
  snakeDirection = "ArrowRight";
  snakeGround: Array<{ turn: boolean; id: number }> = [];
  snakePositions = [
    { turn: true, id: 14 },
    { turn: true, id: 15, color: "primary" },
    { turn: true, id: 16 },
    { turn: true, id: 16 },
    { turn: true, id: 18 },
    { turn: true, id: 19 },
  ];

  ngOnInit() {
    this.makeGround();
    this.makeOutLine();
  }

  makeOutLine() {
    const width = 13;
    const height = 10;

    const bottomLineInitValue = (width * (height - 1)) + 1

    for (let i = 0; i < (width * height); i++) {
      if (i < width || i >= bottomLineInitValue) {
        this.outline.set(i, true);
      } else {
        const reminder = i % width
        if (reminder == 0 || reminder == width - 1) {
          this.outline.set(i, true);
        } else {
          this.outline.set(i, false);
        }
      }
    }


  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.key === "Enter") {
      this.nextPosition = 1;
      this.onGoingGame = setInterval(() => { this.startGame() }, this.snakeSpeed);
      return;
    }
    if (event.key === "r") {
      clearInterval(this.onGoingGame);
      return;
    }
    if (event.key === "ArrowDown") {
      if (this.snakeDirection === "ArrowUp") return;
      this.snakeDirection = event.key;
      this.nextPosition = 13;
      this.validateSnakeSelfBite();
      // clearInterval(this.onGoingGame);
      return;
    }
    if (event.key === "ArrowUp") {
      if (this.snakeDirection === "ArrowDown") return;
      this.snakeDirection = event.key;
      this.nextPosition = -13;
      this.validateSnakeSelfBite();
      // clearInterval(this.onGoingGame);
      return;
    }
    if (event.key === "ArrowRight") {
      if (this.snakeDirection === "ArrowLeft") return;
      this.snakeDirection = event.key;
      this.nextPosition = 1;
      this.validateSnakeSelfBite();
      // clearInterval(this.onGoingGame);
      return;
    }
    if (event.key === "ArrowLeft") {
      if (this.snakeDirection === "ArrowRight") return;
      this.snakeDirection = event.key;
      this.nextPosition = -1;
      this.validateSnakeSelfBite();
      // clearInterval(this.onGoingGame);
      return;
    }
  }

  validateSnakeSelfBite() {
    if (this.snakePositions.map(position => position.id).includes(this.getNextPosition().id) || this.outline.get(this.headPosition.id)) {
      window.alert("game over da thambi");
    }
  }
  
  // validateOnOutline(position: number): boolean {
  //   return this.outline.get(position);
  // }


  makeGround(): void {
    for (let i = 0; i < this.groundSize; i++) {
      this.snakeGround.push({ turn: false, id: i });
    }
  }

  startGame(): void {
    const snakePositionsIds = this.calculateTheSnakePositions();
    this.validateSnakeSelfBite();
    this.resetTheGame();
    this.turnSnakePositionsOn(snakePositionsIds);
  }

  getNextPosition() {
    const nextPosition = { ...this.headPosition };
    nextPosition.id = nextPosition.id + this.nextPosition;
    return nextPosition;
  }

  calculateTheSnakePositions(): number[] {
    const nextPosition = this.getNextPosition();
    this.snakePositions.push(nextPosition);
    this.headPosition = nextPosition;
    this.snakePositions.shift();
    const snakePositionsIds = this.snakePositions.map((pixel) => pixel.id);
    return snakePositionsIds;
  }

  turnSnakePositionsOn(snakePositionsIds: number[]) {
    this.snakeGround.forEach((pixel) => {
      pixel.turn = snakePositionsIds.includes(pixel.id)
    })
  }

  resetTheGame() {
    if (this.snakePositions[this.snakePositions.length - 1].id === this.snakeGround.length) {
      this.snakePositions = [
        { turn: true, id: 0 },
        { turn: true, id: 1 },
        { turn: true, id: 2 },
        { turn: true, id: 3 },
      ];
      this.headPosition = { turn: true, id: 3 };
    }
  }
}
