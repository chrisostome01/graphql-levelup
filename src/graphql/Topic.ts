import { arg, extendType, intArg, nonNull, objectType, stringArg  } from "nexus";

export const Topic = objectType({
    name: "Topic",
    definition(t){
        t.nonNull.int("id"),
        t.nonNull.string("topicName"),
        t.nonNull.list.nonNull.field("cards",{
            type:"Card",
            resolve(parent,args,context){
                return context.prisma.topic.findUnique({ where: { id: parent.id } }).cards();
            }
        })
    }
})


/* =============== fetching data =================== */

export const topicQuery = extendType(
    {
        type: "Query",
        definition(t){
            t.nonNull.list.nonNull.field("topic",{
                type:"Topic",
                resolve(parent,args,context,info){
                    return context.prisma.topic.findMany();
                }
            })
        }
    }
    
)

/* =============== creating new topic =================== */

export  const TopicMutation = extendType(
    {
        type: "Mutation",
        definition(t){
            t.nonNull.field("newTopic",{
                type:"Topic",
                args:{
                    topicName: nonNull(stringArg()),
                },
                resolve(parent,args,context){
                    const { topicName } = args;
                    return context.prisma.topic.create({
                        data:{
                            topicName: topicName
                        }
                    });
                }
            })
            t.nonNull.field("updateTopic",{
                type:"Topic",
                args:{
                    id: nonNull(intArg()),
                    topicName: nonNull(stringArg())
                },
                resolve(parent,args,context){
                    const { id , topicName } = args;
                    return context.prisma.topic.update({
                        where:{
                            id
                        },
                        data:{
                            topicName
                        }
                    })
                }
            })
        }
    }
)