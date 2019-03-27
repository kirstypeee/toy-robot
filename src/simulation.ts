import Table from "./table";
import ToyRobot from "./toyRobot";
import { Rotation, Direction, Action, Move, Coordinates } from "./constants";

interface Simulation {
    table: Table;
    robot: ToyRobot;
}

class Simulation {
    constructor() {
        this.table = new Table();
        this.robot = new ToyRobot();
    }

    public execute(subject: any, command: string, params?: any) {
        return subject[command](params);
    }

    private executeOnRobot(command: string, params?: Coordinates | Move) {
        return this.execute(this.robot, command, params);
    }

    private placeCommand({ x, y, direction }: Coordinates) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            return false;
        }
        if (typeof direction !== 'string' || !(Object.keys(Direction).includes(direction))) {
            return false;
        }
        if (this.table.outOfBounds(x) || this.table.outOfBounds(y)) {
            return false;
        } else {
            return this.executeOnRobot('place', { x, y, direction })
        }
    }

    private moveCommand() {
        if (!this.executeOnRobot('report')) {
            return false;
        }
        const { x, y, direction } = this.executeOnRobot('report');
        switch (direction) {
            case (Direction.NORTH):
                if (this.table.outOfBounds(y + 1)) {
                    return false;
                }
                else {
                    return this.executeOnRobot('move', { axis: 'y', action: Action.INCREMENT });
                }
            case (Direction.EAST):
                if (this.table.outOfBounds(x + 1)) {
                    return false;
                }
                else {
                    return this.executeOnRobot('move', { axis: 'x', action: Action.INCREMENT });
                }
            case (Direction.SOUTH):
                if (this.table.outOfBounds(y - 1)) {
                    return false;
                }
                else {
                    return this.executeOnRobot('move', { axis: 'y', action: Action.DECREMENT });
                }
            case (Direction.WEST):
                if (this.table.outOfBounds(x - 1)) {
                    return false;
                }
                else {
                    return this.executeOnRobot('move', { axis: 'x', action: Action.DECREMENT });
                }
        }
    }

    private turnCommand(rotation: Rotation) {
        if (rotation === Rotation.LEFT) {
            return this.executeOnRobot('turnLeft');
        }
        if (rotation === Rotation.RIGHT) {
            return this.executeOnRobot('turnRight');
        }
    }

    private reportCommand() {
        return this.executeOnRobot('report');
    }
}

export default Simulation;