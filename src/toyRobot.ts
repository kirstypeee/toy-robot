import { Direction, Action, Coordinates, Move } from "./constants";

interface Position {
    x: number;
    y: number;
}

interface ToyRobot {
    currentPosition: Position | undefined;
    currentDirection: Direction | undefined;
}

class ToyRobot {
    constructor() {
        this.currentPosition = undefined;
        this.currentDirection = undefined;
    }

    public place({x, y, direction}: Coordinates) {
        this.currentPosition = { x, y };
        this.currentDirection = direction;
        return true;
    }

    public move({axis, action}: Move) {
        if (this.currentPosition) {
            if (action === Action.INCREMENT) {
                ++this.currentPosition[axis];
            }
            if (action === Action.DECREMENT) {
                --this.currentPosition[axis];
            }
            return true;
        }
    }

    public turnRight() {
        if (!this.currentPosition || !this.currentDirection) {
            return false;
        }
        else {
            const directions = Object.keys(Direction);
            let index = directions.indexOf(this.currentDirection);
            if (index === directions.indexOf(Direction.WEST)) {
                this.currentDirection = Direction.NORTH;
            } else {
                const newDirection = directions[++index as number] as Direction;
                this.currentDirection = Direction[newDirection];
            }
            return true;
        }
    }

    public turnLeft() {
        if (!this.currentPosition || !this.currentDirection) {
            return false;
        }
        else {
            const directions = Object.keys(Direction);
            let index = directions.indexOf(this.currentDirection);
            if (index === directions.indexOf(Direction.NORTH)) {
                this.currentDirection = Direction.WEST;
            } else {
                const newDirection = directions[--index as number] as Direction;
                this.currentDirection = Direction[newDirection];
            }
            return true;
        }
    }

    public report() {
        if (!this.currentPosition || !this.currentDirection) {
            return false;
        }
        else {
            return {
                ...this.currentPosition,
                direction: this.currentDirection
            }
        }
    }
}

export default ToyRobot;