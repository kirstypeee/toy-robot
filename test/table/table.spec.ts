import Table from '../../src/table';

describe("Table", () => {
    test("Can instantiate a new table", () => {
        expect(new Table()).not.toBeNull();
    });
});

describe("Out of bounds", () => {
    test("returns false for allowed values (0)", () => {
        const table = new Table();
        expect(table.outOfBounds(0)).toBeFalsy();
    });
    test("returns true for non-allowed values (5)", () => {
        const table = new Table();
        expect(table.outOfBounds(5)).toBeTruthy();
    });
});
