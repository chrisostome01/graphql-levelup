"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardMutation = exports.cardQuery = exports.Card = void 0;
const nexus_1 = require("nexus");
exports.Card = (0, nexus_1.objectType)({
    name: "Card",
    definition(t) {
        t.nonNull.int("id"),
            t.nonNull.string("description"),
            t.nonNull.string("title");
        t.nonNull.int("topicId");
    }
});
exports.cardQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("card", {
            type: "Card",
            resolve(parent, args, context, info) {
                return context.prisma.card.findMany();
            }
        });
    }
});
exports.CardMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("post", {
            type: "Card",
            args: {
                title: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                description: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                topicId: (0, nexus_1.nonNull)((0, nexus_1.intArg)())
            },
            resolve(parent, args, context) {
                const { description, title, topicId } = args;
                const addCard = context.prisma.card.create({
                    data: {
                        description,
                        title,
                        topicId
                    }
                });
                return addCard;
            }
        });
    }
});
