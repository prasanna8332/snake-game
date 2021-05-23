import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'snake-game-prasanna';
  snakeGround: Array<{ turn: boolean; id: number }> = [];
  headPosition = { turn: true, id: 3 };
  snakePositions = [
    { turn: true, id: 0 },
    { turn: true, id: 1 },
    { turn: true, id: 2 },
    { turn: true, id: 3 },
  ];

  ngOnInit() {
    for (let i = 0; i < 50; i++) {
      this.snakeGround.push({ turn: false, id: i });
    }
    console.log(this.snakeGround);
    this.snakeGround[this.headPosition.id].turn = true;
    setInterval(() => {
      this.startGame();
    }, 200)
  }

  startGame(): void {
    const nextPosition = { ...this.headPosition };
    nextPosition.id = nextPosition.id + 1;
    this.snakePositions.push(nextPosition);
    this.headPosition = nextPosition;
    this.snakePositions.shift();
    if (this.snakePositions[this.snakePositions.length - 1].id === 51) {
      this.snakePositions = [
        { turn: true, id: 0 },
        { turn: true, id: 1 },
        { turn: true, id: 2 },
        { turn: true, id: 3 },
      ];
      this.headPosition = { turn: true, id: 3 };
    }
    const snakePositionsIds = this.snakePositions.map((pixel) => pixel.id);
    this.snakeGround.forEach((pixel) => {
      pixel.turn = snakePositionsIds.includes(pixel.id)
    })
  }
}
