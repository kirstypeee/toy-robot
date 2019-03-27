import Simulation from '../../src/simulation';
import { Direction, Rotation, Action } from '../../src/constants';

describe("Simulation", () => {
    test("Can instantiate a new simulation", () => {
        expect(new Simulation()).not.toBeNull();
    });

});

describe("Place command", () => {
    let simulation: Simulation;

    beforeEach(() => {
        simulation = new Simulation();
    })

    test("Can place a new toy robot on the table", () => {
        expect(simulation.execute(simulation, 'placeCommand', { x: 0, y: 0, direction: 'NORTH' })).toBeTruthy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual({ x: 0, y: 0, direction: 'NORTH' });
    });

    test("Can place a new toy robot on the table", () => {
        expect(simulation.execute(simulation, 'placeCommand', { x: 2, y: 3, direction: 'NORTH' })).toBeTruthy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual({ x: 2, y: 3, direction: 'NORTH' });
    });

    test("Can NOT place a new toy robot off the table", () => {
        expect(simulation.execute(simulation, 'placeCommand', { x: 5, y: 5, direction: 'NORTH' })).toBeFalsy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual(false);
    });

    test("Can handle incorrect coordinate input ", () => {
        const location = {
            x: 'meow' as unknown as number,
            y: 'yellow' as unknown as number,
            direction: Direction.NORTH
        }
        expect(simulation.execute(simulation, 'placeCommand', location)).toBeFalsy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual(false);
    });

    test("Can handle incorrect direction input ", () => {
        const location = {
            x: 0,
            y: 0,
            direction: 'BANANA' as Direction
        }
        expect(simulation.execute(simulation, 'placeCommand', location)).toBeFalsy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual(false);
    });

    test("Can handle missing parameters", () => {
        const undefinedDirection = {
            x: 0,
            y: 0,
            direction: 'BANANA' as Direction
        }
        const undefinedY = {
            x: 0,
            y: undefined as unknown as number,
            direction: Direction.NORTH
        }
        const nullX = {
            x: null as unknown as number,
            y: 0,
            direction: Direction.WEST
        }
        expect(simulation.execute(simulation, 'placeCommand', undefinedDirection)).toBeFalsy();
        expect(simulation.execute(simulation, 'placeCommand', undefinedY)).toBeFalsy();
        expect(simulation.execute(simulation, 'placeCommand', nullX)).toBeFalsy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual(false);
    });
});

describe("Move command", () => {
    let simulation: Simulation;

    beforeEach(() => {
        simulation = new Simulation();
    })

    test("Can move a bot to a position on table", () => {
        const place1 = {
            x: 3,
            y: 3,
            direction: Direction.NORTH
        }
        const place2 = {
            x: 2,
            y: 3,
            direction: Direction.NORTH
        }
        simulation.execute(simulation, 'placeCommand', place1);
        expect(simulation.execute(simulation, 'moveCommand')).toBeTruthy();
        simulation.execute(simulation, 'placeCommand', place2);
        expect(simulation.execute(simulation, 'moveCommand')).toBeTruthy();
    });

    test("Can't move a bot to a position off table, facing NORTH", () => {
        const place1 = {
            x: 4,
            y: 4,
            direction: Direction.NORTH
        }
        const place2 = {
            x: 2,
            y: 4,
            direction: Direction.NORTH
        }
        simulation.execute(simulation, 'placeCommand', place1);
        expect(simulation.execute(simulation, 'moveCommand')).toBeFalsy();
        simulation.execute(simulation, 'placeCommand', place2);
        expect(simulation.execute(simulation, 'moveCommand')).toBeFalsy();
    });

    test("Can't move a bot to a position off table, facing EAST", () => {
        const place1 = {
            x: 4,
            y: 4,
            direction: Direction.EAST
        }
        const place2 = {
            x: 4,
            y: 0,
            direction: Direction.EAST
        }
        simulation.execute(simulation, 'placeCommand', place1);
        expect(simulation.execute(simulation, 'moveCommand')).toBeFalsy();
        simulation.execute(simulation, 'placeCommand', place2);
        expect(simulation.execute(simulation, 'moveCommand')).toBeFalsy();
    });

    test("Can't move a bot to a position off table, facing SOUTH", () => {
        const place1 = {
            x: 0,
            y: 0,
            direction: Direction.SOUTH
        }
        const place2 = {
            x: 4,
            y: 0,
            direction: Direction.SOUTH
        }
        simulation.execute(simulation, 'placeCommand', place1);
        expect(simulation.execute(simulation, 'moveCommand')).toBeFalsy();
        simulation.execute(simulation, 'placeCommand', place2);
        expect(simulation.execute(simulation, 'moveCommand')).toBeFalsy();
    });

    test("Can't move a bot to a position off table, facing WEST", () => {
        const place1 = {
            x: 0,
            y: 0,
            direction: Direction.WEST
        }
        const place2 = {
            x: 0,
            y: 4,
            direction: Direction.WEST
        }
        simulation.execute(simulation, 'placeCommand', place1);
        expect(simulation.execute(simulation, 'moveCommand')).toBeFalsy();
        simulation.execute(simulation, 'placeCommand', place2);
        expect(simulation.execute(simulation, 'moveCommand')).toBeFalsy();
    });
});

describe("Turn command", () => {
    let simulation: Simulation;

    beforeEach(() => {
        simulation = new Simulation();
    })

    test("Can't turn a not bot on a table", () => {
        expect(simulation.execute(simulation, 'turnCommand', Rotation.LEFT)).toEqual(false);
    });

    test("Can turn a bot LEFT on a table", () => {
        const place = {
            x: 0,
            y: 0,
            direction: Direction.NORTH
        }
        simulation.execute(simulation, 'placeCommand', place);
        expect(simulation.execute(simulation, 'turnCommand', Rotation.LEFT)).toBeTruthy();
    });

    test("Can turn a bot RIGHT on a table", () => {
        const place = {
            x: 0,
            y: 0,
            direction: Direction.NORTH
        }
        simulation.execute(simulation, 'placeCommand', place);
        expect(simulation.execute(simulation, 'turnCommand', Rotation.RIGHT)).toBeTruthy();
    });
});

describe("Running through some example actions", () => {
    let simulation: Simulation;

    beforeEach(() => {
        simulation = new Simulation();
    })


    test("PLACE (0,0,NORTH) -> MOVE -> REPORT", () => {
        simulation.execute(simulation, 'placeCommand', { x: 0, y: 0, direction: Direction.NORTH });
        expect(simulation.execute(simulation, 'moveCommand', { axis: 'y', action: Action.INCREMENT })).toBeTruthy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual({ x: 0, y: 1, direction: 'NORTH' });
    });

    test("PLACE (0,0,NORTH) -> LEFT -> REPORT", () => {
        simulation.execute(simulation, 'placeCommand', { x: 0, y: 0, direction: Direction.NORTH });
        expect(simulation.execute(simulation, 'turnCommand', Rotation.LEFT)).toBeTruthy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual({ x: 0, y: 0, direction: 'WEST' });
    });

    test("PLACE (1,2,EAST) -> MOVE -> MOVE -> LEFT -> MOVE -> REPORT", () => {
        simulation.execute(simulation, 'placeCommand', { x: 1, y: 2, direction: Direction.EAST });
        expect(simulation.execute(simulation, 'moveCommand', { axis: 'x', action: Action.INCREMENT })).toBeTruthy();
        expect(simulation.execute(simulation, 'moveCommand', { axis: 'x', action: Action.INCREMENT })).toBeTruthy();
        expect(simulation.execute(simulation, 'turnCommand', Rotation.LEFT)).toBeTruthy();
        expect(simulation.execute(simulation, 'moveCommand', { axis: 'y', action: Action.INCREMENT })).toBeTruthy();
        expect(simulation.execute(simulation, 'reportCommand')).toEqual({ x: 3, y: 3, direction: 'NORTH' });
    });

});