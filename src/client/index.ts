import inquirer from 'inquirer';
import Simulation from '../simulation';
import { actionList, selectX, selectY, selectDirection } from './commands';
import { Rotation } from '../constants';

const logger = require('../../utils/log');

const simulation = new Simulation();

interface ICoordindate {
    x?: number,
    y?: number
}

let coordinates: ICoordindate = {};

function validateXCoordinate(input: any) {
    const xcoord = parseInt(input);
    if (isNaN(xcoord)) {
        return 'Please provide a number.';
    }
    coordinates.x = xcoord;
    return true;
}

function validateYCoordinate(input: any) {
    const ycoord = parseInt(input);
    if (isNaN(ycoord)) {
        return 'Please provide a number.';
    }
    coordinates.y = ycoord;
    return true;
}

function validatePlacement(input: any) {
    if (coordinates.x !== undefined
        && coordinates.y !== undefined
        && simulation.execute(simulation, 'placeCommand', { x: coordinates.x, y: coordinates.y, direction: input })) {
        return {
            level: 'SUCCESS',
            message: `Placing the robot on the table at ${coordinates.x}, ${coordinates.y} facing ${input}`
        }
    }
    else {
        coordinates = {};
        return {
            level: 'OI',
            message: "You can't place me here!"
        }
    }
}

async function start() {
    logger.log(
        {
            level: "BEGIN",
            message: 'Hello! I am a toy robot and next to me is a 5x5 table. I can MOVE one square at a time, turn LEFT or RIGHT and REPORT my own location. If you want to interact with me, make sure to PLACE me on the table first.'
        }
    );
    mainMenu();
}

async function mainMenu() {
    await inquirer
        .prompt(actionList)
        .then(processInput)
}

async function processInput(answer: any) {
    if (answer.command === "PLACE") {
        await placeX();
    }
    if (answer.command === "MOVE") {
        await move();
    }
    if (answer.command === "LEFT") {
        await left();
    }
    if (answer.command === "RIGHT") {
        await right();
    }
    if (answer.command === 'REPORT') {
        await report();
    }
    if (answer.command === 'EXIT') {
        logger.log({ level: 'END', message: `Thanks for playing!` });
    }
}

async function report() {
    const report = simulation.execute(simulation, 'reportCommand');
    if (report) {
        logger.log({ level: 'REPORT', message: `X: ${report.x}, Y: ${report.y}, DIRECTION: ${report.direction}` });
    } else {
        logger.log({ level: 'REPORT', message: `There is nothing to report...` });
    }
    mainMenu();
}

async function placeX() {
    await inquirer
        .prompt(selectX)
        .then(async (answer: any) => {
            const isValid = validateXCoordinate(answer.x);
            if (isValid === true) {
                await placeY();
            } else {
                logger.log({ level: 'OOPS', message: isValid });
                placeX();
            }
        })
}

async function placeY() {
    await inquirer
        .prompt(selectY)
        .then((answer: any) => {
            const isValid = validateYCoordinate(answer.y);
            if (isValid === true) {
                placeDirection();
            } else {
                logger.log({ level: 'OOPS', message: isValid });
                placeY();
            }
        })
}

async function placeDirection() {
    await inquirer
        .prompt(selectDirection)
        .then((answer: any) => {
            const isValid = validatePlacement(answer.direction);
            logger.log(isValid);
            mainMenu();
        })
}

async function move() {
    const canMove = simulation.execute(simulation, 'moveCommand');
    if (canMove) {
        logger.log({ level: 'SUCCESS', message: `I have moved one square.` });
    } else {
        logger.log({ level: 'OI', message: `You can't move me there!` });
    }
    mainMenu();
}

async function left() {
    const didTurnLeft = simulation.execute(simulation, 'turnCommand', Rotation.LEFT);
    if (didTurnLeft) {
        logger.log({ level: 'SUCCESS', message: `I've turned 90 degrees to the left.` });
    } else {
        logger.log({ level: 'OI', message: `I can't turn, am I on the table?` });
    }
    mainMenu();
}

async function right() {
    const didTurnRight = simulation.execute(simulation, 'turnCommand', Rotation.RIGHT);
    if (didTurnRight) {
        logger.log({ level: 'SUCCESS', message: `I've turned 90 degrees to the right.` });
    } else {
        logger.log({ level: 'OI', message: `I can't turn, am I on the table?` });
    }
    mainMenu();
}

module.exports = start;