import { addColors, createLogger, format, transports } from 'winston';

const myCustomLevels = {
    levels: {
        BEGIN: 0,
        SUCCESS: 1,
        OOPS: 2,
        OI: 3,
        REPORT: 4,
        END: 5
    },
    colors: {
        BEGIN: 'white',
        SUCCESS: 'green',
        OOPS: 'yellow',
        OI: 'red',
        REPORT: 'white',
        END: 'White'
    }
};

const logger = createLogger({
    level: 'BEGIN',
    levels: myCustomLevels.levels,
    format: format.json(),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            ),
            level: 'REPORT'
        })
    ]
});

addColors(myCustomLevels.colors);

module.exports = logger;