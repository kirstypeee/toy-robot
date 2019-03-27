import { processInput } from '../../src/client/index';
const winston = require('winston');
const spyLogger = require('winston-spy');
const sinon = require('sinon');

var spy = sinon.spy();


describe("Client", () => {
    beforeAll(() => {
        winston.remove(winston.transports.Console);
        winston.add(winston.transports.spyLogger, { spy: spy });
    });
    test("Can process input", async () => {
        await processInput('PLACE');
        expect(spy.calledOnce);
        expect(spy.calledWith('SUCESS', '', ''));
    });

});