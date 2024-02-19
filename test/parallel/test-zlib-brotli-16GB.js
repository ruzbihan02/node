'use strict';

const common = require('../common');
const { createBrotliDecompress } = require('node:zlib');
const strictEqual = require('node:assert').strictEqual;

// This tiny HEX string is a 16GB file.
// This test verifies that the stream actually stops.
/* eslint-disable max-len */
const content = 'cfffff7ff82700e2b14020f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c32200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bffcfffff7ff82700e2b00040f7fe9ffffffff04f00c4610180eefd3fffffffe19f0088c30200ddfb7ffeffffc33f0110870500baf7fffcffff877f02200e0b0074effff9ffff0fff04401c1600e8defff3ffff1ffe0980382c00d0bdffe7ffff3ffc1300715800a07bff3f';

const buf = Buffer.from(content, 'hex');

const decoder = createBrotliDecompress();
decoder.end(buf);

// We need to wait to verify that the libuv thread pool had time
// to process the data and the buffer is not empty.
setTimeout(common.mustCall(() => {
  // There is only one chunk in the buffer
  strictEqual(decoder._readableState.buffer.length, 1);
}), common.platformTimeout(500));
