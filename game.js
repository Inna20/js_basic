'use strict';

const settings = {
  rowCount: 10,
  colCount: 10,
  startPositionX: 0,
  startPositionY: 0,
};

const player = {
  x: null,
  y: null,
  settings,

  init(startX, startY) {
    this.x = startX;
    this.y = startY;
  },

  move(direction) {
    switch (direction) {
      case 2:
        if (this.y === this.settings.colCount -1)
          this.y = this.settings.startPositionY;
        else
          this.y++;
        break;
      case 4:
        if (this.x === this.settings.startPositionX)
          this.x = this.settings.rowCount - 1;
        else
          this.x--;
        break;
      case 6:
        if (this.x === this.settings.rowCount -1)
          this.x = this.settings.startPositionX;
        else
          this.x++;
        break;
      case 8:
        if (this.y === this.settings.startPositionY)
          this.y = this.settings.colCount - 1;
        else
          this.y--;
        break;
    }
  }
};


const game = {
  settings,
  player,
  log: [], //

  run() {
    this.player.init(this.settings.startPositionX, this.settings.startPositionY);
    this.writeLog(this.settings.startPositionX, this.settings.startPositionY, 0); // Заполним нулевой элемент массива, егда еще нет ни одного шага, так как ключ - это номер шага

    while (true) {
      this.render();

      const direction = this.getDirection();

      if (direction === -1) {
        return alert('До свидания!');
      }

      this.player.move(direction);
      this.writeLog(this.player.x, this.player.y, direction);
    }
  },

  writeLog(curX, curY, curDirection) {
    this.log.push({
      x: curX,
      y: curY,
      direction: curDirection,
    })
  },

  readLog(step) {
    if (this.log[step] == undefined) {
      return console.log('Такой шаг еще не сделан');
    }
    return console.log(this.log[step]);
  },

  render() {
    let map = '';

    for (let row = 0; row < this.settings.rowCount; row++) {
      for (let col = 0; col < this.settings.colCount; col++) {
        if (this.player.y === row && this.player.x === col) {
          map += 'o '
        } else {
          map += 'x '
        }
      }
      map += '\n';
    }

    console.clear();
    console.log(map);
  },

  getDirection() {
    const availableDirections = [-1, 2, 4, 6, 8];

    while(true) {
      const direction = parseInt(prompt('Введите число, куда хотите переместиться. -1 для выхода.'));

      if (!availableDirections.includes(direction)) {
        alert(`Для перемещения необходимо ввести одно из чисел: ${availableDirections.join(', ')}.`);
        continue;
      }

      return direction;
    }
  },
};

game.run();
// Весь лог
for (let i = 1; i < game.log.length; i++) {
  console.log('Шаг '+i+': ');
  game.readLog(i);
}

//game.readLog(10);