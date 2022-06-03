"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const nexus_1 = require("nexus");
const path_1 = require("path");
exports.schema = (0, nexus_1.makeSchema)({
    types: [],
    outputs: {
        schema: (0, path_1.join)(process.cwd(), "schema.graphql"),
        typegen: (0, path_1.join)(process.cwd(), "nexus-typegen.ts"),
    },
});
