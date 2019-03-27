import ToyRobot from '../../src/toyRobot';
import { Direction, Action } from '../../src/constants';

describe("Toy Robot Setup", () => {
    test("Can instantiate a new toy robot", () => {
        expect(new ToyRobot()).not.toBeNull();
    });
});

describe("Placing a toy robot", () => {
    let bot: ToyRobot;

    beforeEach(() => {
        bot = new ToyRobot();
    })

    test("Can place a new toy robot on the table", () => {
        bot.place({ x: 0, y: 0, direction: Direction.NORTH });
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'NORTH' });
    });
});

describe("Moving a toy robot", () => {
    let bot: ToyRobot;

    beforeEach(() => {
        bot = new ToyRobot();
    })

    test("Cannot move a bot that isn't on the table", () => {
        expect(bot.move({axis: 'x', action: Action.INCREMENT})).toBeFalsy();
    });

    test("Can move a bot that is on the table facing NORTH", () => {
        const location = {
            x: 0,
            y: 1,
            direction: 'NORTH'
        }
        bot.place({ x: 0, y: 0, direction: Direction.NORTH });
        expect(bot.move({axis: 'y', action: Action.INCREMENT})).toBeTruthy();
        expect(bot.report()).toEqual(location);
    });

    test("Can move a bot that is on the table facing EAST", () => {
        const location = {
            x: 1,
            y: 0,
            direction: 'EAST'
        }
        bot.place({ x: 0, y: 0, direction: Direction.EAST });
        expect(bot.move({axis: 'x', action: Action.INCREMENT})).toBeTruthy();
        expect(bot.report()).toEqual(location);
    });

    test("Can move a bot that is on the table facing SOUTH", () => {
        const location = {
            x: 0,
            y: 0,
            direction: 'SOUTH'
        }
        bot.place({ x: 0, y: 1, direction: Direction.SOUTH });
        expect(bot.move({axis: 'y', action: Action.DECREMENT})).toBeTruthy();
        expect(bot.report()).toEqual(location);
    });

    test("Can move a bot that is on the table facing WEST", () => {
        const location = {
            x: 0,
            y: 0,
            direction: 'WEST'
        }
        bot.place({ x: 1, y: 0, direction: Direction.WEST });
        expect(bot.move({axis: 'x', action: Action.DECREMENT})).toBeTruthy();
        expect(bot.report()).toEqual(location);
    });
});

describe("Turning a toy robot left", () => {
    let bot: ToyRobot;

    beforeEach(() => {
        bot = new ToyRobot();
    })

    test("Cannot change direction of a bot that isn't on the table", () => {
        expect(bot.turnLeft()).toBeFalsy();
        expect(bot.report()).toEqual(false);
    });

    test("Turning left changes from NORTH to WEST", () => {
        bot.place({ x: 0, y: 0, direction: Direction.NORTH });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'WEST' });
    });

    test("Turning right changes from EAST to NORTH", () => {
        bot.place({ x: 0, y: 0, direction: Direction.EAST });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'NORTH' });
    });

    test("Turning right changes from SOUTH to EAST", () => {
        bot.place({ x: 0, y: 0, direction: Direction.SOUTH });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'EAST' });
    });

    test("Turning right changes from WEST to SOUTH", () => {
        bot.place({ x: 0, y: 0, direction: Direction.WEST });
        expect(bot.turnLeft()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'SOUTH' });
    });
});

describe("Turning a toy robot right", () => {
    let bot: ToyRobot;

    beforeEach(() => {
        bot = new ToyRobot();
    })

    test("Cannot change direction of a bot that isn't on the table", () => {
        expect(bot.turnRight()).toBeFalsy();
    });

    test("Turning right changes from NORTH to EAST", () => {
        bot.place({ x: 0, y: 0, direction: Direction.NORTH });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'EAST' });
    });

    test("Turning right changes from EAST to SOUTH", () => {
        bot.place({ x: 0, y: 0, direction: Direction.EAST });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'SOUTH' });
    });

    test("Turning right changes from SOUTH to WEST", () => {
        bot.place({ x: 0, y: 0, direction: Direction.SOUTH });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'WEST' });
    });

    test("Turning right changes from WEST to NORTH", () => {
        bot.place({ x: 0, y: 0, direction: Direction.WEST });
        expect(bot.turnRight()).toBeTruthy();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'NORTH' });
    });
});

describe("Reporting location of toy robot", () => {
    let bot: ToyRobot;

    beforeEach(() => {
        bot = new ToyRobot();
    })

    test("Cannot report location of a bot that isn't on the table", () => {
        expect(bot.report()).toBeFalsy();
    });

    test("Can report location of a bot that is on the table", () => {
        const location = {
            x: 0,
            y: 0,
            direction: 'NORTH'
        }
        bot.place({ x: 0, y: 0, direction: Direction.NORTH });
        expect(bot.report()).toEqual(location);
    });

    test("Can report different location of a bot that is on the table", () => {
        const location = {
            x: 1,
            y: 4,
            direction: Direction.WEST
        }
        bot.place(location);
        expect(bot.report()).toEqual(location);
    });
});

describe("Running through some example actions", () => {
    let bot: ToyRobot;

    beforeEach(() => {
        bot = new ToyRobot();
    })

    test("PLACE (0,0,NORTH) -> MOVE -> REPORT", () => {
        bot.place({ x: 0, y: 0, direction: Direction.NORTH });
        bot.move({axis: 'y', action: Action.INCREMENT});
        expect(bot.report()).toEqual({ x: 0, y: 1, direction: 'NORTH' });
    });

    test("PLACE (0,0,NORTH) -> LEFT -> REPORT", () => {
        bot.place({ x: 0, y: 0, direction: Direction.NORTH });
        bot.turnLeft();
        expect(bot.report()).toEqual({ x: 0, y: 0, direction: 'WEST' });
    });

    test("PLACE (1,2,EAST) -> MOVE -> MOVE -> LEFT -> MOVE -> REPORT", () => {
        bot.place({ x: 1, y: 2, direction: Direction.EAST });
        bot.move({axis: 'x', action: Action.INCREMENT});
        bot.move({axis: 'x', action: Action.INCREMENT});
        bot.turnLeft();
        bot.move({axis: 'y', action: Action.INCREMENT});
        expect(bot.report()).toEqual({ x: 3, y: 3, direction: 'NORTH' });
    });

});