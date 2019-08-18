#!/usr/bin/env node

require('../utilities/Global');

// setup Jasmine
import Jasmine from 'jasmine';

const jasmine = new Jasmine({});
jasmine.loadConfig({
  spec_dir: 'dist-server/server/spec',
  spec_files: ['**/*[sS]pec.js'],
  helpers: ['helpers/**/*.js'],
  random: false,
  seed: null,
  stopSpecOnExpectationFailure: false
});

// jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5; // 5m for debugging
// jasmine.jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 15; // 15s

// setup console reporter
const JasmineConsoleReporter = require('jasmine-console-reporter');
const reporter = new JasmineConsoleReporter({
  colors: 1,           // (0|false)|(1|true)|2
  cleanStack: 1,       // (0|false)|(1|true)|2|3
  verbosity: 4,        // (0|false)|1|2|(3|true)|4|Object
  listStyle: 'indent', // "flat"|"indent"
  timeUnit: 'ms',      // "ms"|"ns"|"s"
  timeThreshold: {ok: 500, warn: 1000, ouch: 3000}, // Object|Number
  activity: true,
  emoji: true,         // boolean or emoji-map object
  beep: true
});

// initialize and execute
jasmine.env.clearReporters();
jasmine.addReporter(reporter);
jasmine.execute();
