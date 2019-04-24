const fs = require('fs');

jest.mock('fs', () => ({
  existsSync: jest.fn(() => false),
  mkdirSync: jest.fn(() => true),
  writeFileSync: jest.fn((path, contents) => ({
    path,
    contents,
  })),
}));

// process.argv = 'yarn component test-component'.split(' ');
const cli = require('.');

describe('cli', () => {
  const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
  const consoleWarnSpy = jest.spyOn(console, 'warn');

  it("tries to write if the file doesn't exist", () => {
    writeFileSyncSpy.mockClear();

    cli(['test-component']);

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(3);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
  });

  it("doesn't try to write if the file exists", () => {
    writeFileSyncSpy.mockClear();
    fs.existsSync.mockReturnValue(true);

    cli(['test-component']);

    expect(writeFileSyncSpy).toHaveBeenCalledTimes(0);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(3);
  });
});
