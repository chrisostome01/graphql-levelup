import { extendType, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
    name:"User",
    definition(t){
        t.nonNull.int("id"),
        t.nonNull.string("email"),
        t.nonNull.string("Password")
    }
})



export const userQuery = extendType({
    type:"Query",
    definition(t){
        t.nonNull.list.nonNull.field("user",{
            type:"User",
            resolve(parent,arg,context,info){
                return context.prisma.user.findMany()
            }
        })
    }
})

