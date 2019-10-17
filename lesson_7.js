"use strict";

const settings = {
  rowsCount: 21,
  colsCount: 21,
  speed: 2,
  winFoodCount: 50,
  scoreElemId: 'score',
};

const config = {
  settings,
  init(userSettings) {
    Object.assign(this.settings, userSettings);
  },

  getRowsCount() {
    return this.settings.rowsCount;
  },

  getColsCount() {
    return this.settings.colsCount;
  },

  getSpeed() {
    return this.settings.speed;
  },

  getWinFoodCount() {
    return this.settings.winFoodCount;
  },

  validate() {
    const result = {
      isValid: true,
      errors: [],
    };

    if (this.settings.rowsCount < 10 || this.settings.rowsCount > 30) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
    }

    if (this.settings.colsCount < 10 || this.settings.colsCount > 30) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
    }

    if (this.settings.speed < 1 || this.settings.speed > 10) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
    }

    if (this.settings.winFoodCount < 5 || this.settings.winFoodCount > 50) {
      result.isValid = false;
      result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
    }

    return result;
  },
  getScoreElemId() {
    return this.settings.scoreElemId;
  }
};

const map = {
  cells: null,
  usedCells: null,

  init(rowsCount, colsCount) {
    const table = document.getElementById('game');
    table.innerHTML = '';

    this.cells = {}; // {x1_y1: td, x1_y2: td}
    this.usedCells = [];

    for (let row = 0; row < rowsCount; row++) {
      const tr = document.createElement('tr');
      tr.classList.add('row');
      table.appendChild(tr);

      for (let col = 0; col < colsCount; col++) {
        const td = document.createElement('td');
        td.classList.add('cell');

        this.cells[`x${col.toString()}_y${row.toString()}`] = td;
        tr.appendChild(td);
      }
    }
  },

  render(snakePointsArray, foodPoint) {
    for (const cell of this.usedCells) {
      cell.className = 'cell';
    }

    this.usedCells = [];

    snakePointsArray.forEach((point, idx) => {
      const snakeCell = this.cells[`x${point.x}_y${point.y}`];
      if (snakeCell) {
        snakeCell.classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
        this.usedCells.push(snakeCell);
      }
    });

    const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
    foodCell.classList.add('food');
    this.usedCells.push(foodCell);
  },
};

const snake = {
  body: null,
  direction: null,
  lastStepDirection: null,
  meetWall: false,
  config,

  init(startBody, direction) {
    this.body = startBody;
    this.direction = direction;
    this.lastStepDirection = direction;
  },

  getBody() {
    return this.body;
  },

  getLastStepDirection() {
    return this.lastStepDirection;
  },

  isOnPoint(point) {
    return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
  },

  makeStep() {
    this.lastStepDirection = this.direction;
    if (!this.meetWall) {
      this.body.unshift(this.getNextStepHeadPoint()); // [p3, p2, p1] // [p4, p3, p2]
      this.body.pop();
    } else { // змейка с противоположной стороны
      this.resetBodyAfterWall();
      this.meetWall = false;
    }
  },

  growUp() {
    const lastBodyIdx = this.body.length - 1;
    const lastBodyPoint = this.body[lastBodyIdx];
    const lastBodyPointClone = Object.assign({}, lastBodyPoint);
    this.body.push(lastBodyPoint);
  },

  getNextStepHeadPoint() {
    const firstPoint = this.body[0];

    switch(this.direction) {
      case 'up':
        return {x: firstPoint.x, y: firstPoint.y - 1};
      case 'right':
        return {x: firstPoint.x + 1, y: firstPoint.y};
      case 'down':
        return {x: firstPoint.x, y: firstPoint.y + 1};
      case 'left':
        return {x: firstPoint.x - 1, y: firstPoint.y};
    }
  },
  resetBodyAfterWall() {
    const firstPoint = this.body[0];
    let x,y;

    switch(this.direction) {
      case 'up':
        x = firstPoint.x;
        y = this.config.getRowsCount() - 1;
        for (let i = 0; i < this.body.length; i++) {
          this.body[i] = {x: x, y: y};
          y++;
        }
        break;
      case 'right':
        x = 0;
        y = firstPoint.y;
        for (let i = 0; i < this.body.length; i++) {
          this.body[i] = {x: x, y: y};
          x--;
        }
        break;
        //return {x: 0, y: firstPoint.y};
      case 'down':
        x = firstPoint.x;
        y = 0;
        for (let i = 0; i < this.body.length; i++) {
          this.body[i] = {x: x, y: y};
          y--;
        }
        break;
      case 'left':
        x = this.config.getColsCount() - 1;
        y = firstPoint.y;
        for (let i = 0; i < this.body.length; i++) {
          this.body[i] = {x: x, y: y};
          x++;
        }
        break;
      //  return {x: this.config.colsCount(), y: firstPoint.y};
    }
  },

  setDirection(direction) {
    this.direction = direction;
  },
};

const food = {
  x: null,
  y: null,

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  },

  setCoordinates(point) {
    this.x = point.x;
    this.y = point.y;
  },

  isOnPoint(point) {
    return this.x === point.x && this.y === point.y;
  },
};

const status = {
  condition: null,

  setPlaying() {
    this.condition = 'playing';
  },

  setStopped() {
    this.condition = 'stopped';
  },

  setFinished() {
    this.condition = 'finished';
  },

  isPlaying() {
    return this.condition === 'playing';
  },

  isStopped() {
    return this.condition === 'stopped';
  },
};

const score = {
  scoreElem: null,

  init(scoreElemId) {
    this.scoreElem = document.getElementById(scoreElemId);
    this.render(0);
  },

  render(points) {
    this.scoreElem.innerHTML = `Набранные очки: ${points}`;
  },

  reset() {
    if (this.scoreElem)
      this.scoreElem.innerHTML = '';
  }
};

function game(config,
              map,
              snake,
              food,
              status,
              score) {

  let tickInterval= null;

  function reset() {
    stop();
    snake.init(getStartSnakeBody(), 'up');
    food.setCoordinates(getRandomFreeCoordinates());
    score.reset();
    render();
  }

  function play() {
    status.setPlaying();
    tickInterval = setInterval(() => tickHandler(), 1000 / config.getSpeed());
    setPlayButton('Стоп');
    score.init(config.getScoreElemId());
  }

  function stop() {
    status.setStopped();
    clearInterval(tickInterval);
    setPlayButton('Старт');
  }

  function finish() {
    status.setFinished();
    clearInterval(tickInterval);
    setPlayButton('Игра закончена', true);
  }

  function meetWall() {
    snake.meetWall = true;
  }

  function tickHandler() {
    if (!canMakeStep()) {
      meetWall();
    }

    if (food.isOnPoint(snake.getNextStepHeadPoint())) {
      snake.growUp();
      food.setCoordinates(getRandomFreeCoordinates());
      score.render(getCurrentPoints());

      if (isGameWon()) {
        finish();
      }
    }

    snake.makeStep();
    render();
  }

  function setPlayButton(textContents, isDisabled = false) {
    const playButton = document.getElementById('playButton');

    playButton.textContent = textContents;
    isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
  }

  function getStartSnakeBody() {
    return [
      {
        x: Math.floor(config.getColsCount() / 2),
        y: Math.floor(config.getRowsCount() / 2),
      }
    ];
  }

  function setEventHandlers() {
    document.getElementById('playButton').addEventListener('click', () => {
      playClickHandler();
    });
    document.getElementById('newGameButton').addEventListener('click', () => {
      newGameClickHandler();
    });
    document.addEventListener('keydown', event => keyDownHandler(event));
  }

  function render() {
    map.render(snake.getBody(), food.getCoordinates());
  }

  function getRandomFreeCoordinates() {
    const exclude = [food.getCoordinates(), ...snake.getBody()];

    while (true) {
      const rndPoint = {
        x: Math.floor(Math.random() * config.getColsCount()),
        y: Math.floor(Math.random() * config.getRowsCount()),
      };

      if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) {
        return rndPoint;
      }
    }
  }

  function playClickHandler() {
    if (status.isPlaying()) {
      stop();
    } else if (status.isStopped()) {
      play();
    }
  }

  function newGameClickHandler() {
    reset();
  }

  function keyDownHandler(event) {
    if (!status.isPlaying()) return;

    const direction = getDirectionByCode(event.code);

    if (canSetDirection(direction)) {
      snake.setDirection(direction);
    }
  }

  function getDirectionByCode(code) {
    switch (code) {
      case 'KeyW':
      case 'ArrowUp':
        return 'up';
      case 'KeyD':
      case 'ArrowRight':
        return 'right';
      case 'KeyS':
      case 'ArrowDown':
        return 'down';
      case 'KeyA':
      case 'ArrowLeft':
        return 'left';
      default:
        return '';
    }
  }

  function canSetDirection(direction) {
    const lastStepDirection = snake.getLastStepDirection();

    return direction === 'up' && lastStepDirection !== 'down' ||
        direction === 'right' && lastStepDirection !== 'left' ||
        direction === 'down' && lastStepDirection !== 'up' ||
        direction === 'left' && lastStepDirection !== 'right';
  }

  function isGameWon() {
    return snake.getBody().length > config.getWinFoodCount();
  }

  function canMakeStep() {
    const nextHeadPoint = snake.getNextStepHeadPoint();

    return !snake.isOnPoint(nextHeadPoint) &&
        nextHeadPoint.x < config.getColsCount() &&
        nextHeadPoint.y < config.getRowsCount() &&
        nextHeadPoint.x >= 0 &&
        nextHeadPoint.y >= 0;
  }

  function getCurrentPoints() {
    return snake.getBody().length - 1;
  }

  return {
    init(userSettings) {
      config.init(userSettings);
      const validation = config.validate();

      if (!validation.isValid) {
        for (const err of validation.errors) {
          console.error(err);
        }
        return;
      }

      map.init(config.getRowsCount(), config.getColsCount());

      setEventHandlers();
      reset();
    }
  };
}

const myGame = game(config, map, snake, food, status, score);
window.addEventListener('load', () => myGame.init({speed: 5, winFoodCount: 7}));