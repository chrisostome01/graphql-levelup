/* eslint-disable prefer-const */
import { extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Card = objectType({
    name: "Card",
    definition(t){
        t.nonNull.int("id"),
        t.nonNull.string("description"),
        t.nonNull.string("title"),
        t.field("topic",{
            type:"Topic",
            resolve(parent,args,context){
                return context.prisma.card.findUnique({ where: { id: parent.id } }).topic();
            }
        })
    }
})


export const cardQuery = extendType(
    {
        type: "Query",
        definition(t){
            t.nonNull.list.nonNull.field("card",{
                type:"Card",
                resolve(parent,args, context, info){
                    return context.prisma.card.findMany();
                }
            })
        }
    }    
)

export const CardMutation = extendType({
    type:"Mutation",
    definition(t){
        t.nonNull.field("post",{
            type:"Card",
            args:{
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                topicId: nonNull(intArg())
            },
            resolve(parent,args,context){
                const { description, title , topicId } = args;
                const addCard = context.prisma.card.create({
                    data:{
                        description,
                        title,
                        topicId
                    }
                })
                return addCard
            }
        })
        t.nonNull.field("updateCard",{
            type:"Card",
            args:{
                id: nonNull(intArg()),
                title: nonNull(stringArg()),
                description: nonNull(stringArg()),
                topicId: nonNull(intArg())
            },
            resolve(parent,args,context){
                const { description, title , topicId , id } = args;
                const addCard = context.prisma.card.update({
                    where: {
                        id
                    },
                    data:{
                        description,
                        title,
                        topicId
                    }
                })
                return addCard
            }
        })
        t.nonNull.field("deleteCard", {
            type:"Card",
            args:{
                id: nonNull(intArg())
            },
            resolve(parent,args,context){
                const { id } = args;
                return context.prisma.card.delete({
                    where:{
                        id
                    }
                })                
            }
        })
    }
})
