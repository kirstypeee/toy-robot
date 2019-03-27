import inquirer from "inquirer";

const commands = ['PLACE', 'MOVE', 'LEFT', 'RIGHT', 'REPORT', new inquirer.Separator(), 'EXIT'];
const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
export const actionList = [{
    type: 'list',
    name: 'command',
    message: 'Choose the action you would like the Robot to take',
    choices: commands
}];
export const selectX = [{
    type: 'input',
    name: 'x',
    message: 'Please provide the X coordinate for the robot',
}];
export const selectY = [{
    type: 'input',
    name: 'y',
    message: 'Please provide the Y coordinate for the robot',
}];
export const selectDirection = [{
    type: 'list',
    name: 'direction',
    message: 'Please provide the direction for the robot',
    choices: directions,
}];
