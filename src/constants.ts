export enum Rotation {
    LEFT,
    RIGHT
}

export enum Action {
    INCREMENT,
    DECREMENT
};

export interface Move {
    axis: 'x' | 'y';
    action: Action;
}

export interface Coordinates {
    x: number;
    y: number;
    direction: Direction;
    action?: Action;
}

export enum Direction {
    'NORTH' = 'NORTH',
    'EAST' = 'EAST',
    'SOUTH' = 'SOUTH',
    'WEST' = 'WEST'
};
