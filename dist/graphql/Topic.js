"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicQuery = exports.Topic = void 0;
const nexus_1 = require("nexus");
exports.Topic = (0, nexus_1.objectType)({
    name: "Topic",
    definition(t) {
        t.nonNull.int("id"),
            t.nonNull.string("topicName");
    }
});
exports.topicQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("topic", {
            type: "Topic",
            resolve(parent, args, context, info) {
                return context.prisma.topic.findMany();
            }
        });
    }
});
