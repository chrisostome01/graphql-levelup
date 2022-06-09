import { extendType, nonNull, stringArg } from "nexus"
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";


export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("signup", { 
            type: "AuthPayload",  
            args: {  
                email: nonNull(stringArg()), 
                password: nonNull(stringArg())
            },
            async resolve(parent, args, context) {
                const { email } = args;
                const password = await bcrypt.hash(args.password, 10);
                const user = await context.prisma.user.create({
                    data: { email, Password: password },
                });
                const token = jwt.sign({ userId: user.id }, "process.env.APP_SECRET");
                return {
                    token,
                    user,
                };
            },
        });
        t.nonNull.field("login",{
            type:"AuthPayload",
            args:{
                email: nonNull(stringArg()),
                password: nonNull(stringArg())
            },
            async resolve(parent,args,context){
                const { email , password } = args;
                
                // search the user with email 
                const user = await context.prisma.user.findUnique({
                    where: {
                        email
                    }
                })

                if(!user){
                    throw new Error("User does not exist")
                }
                
                const valid = await bcrypt.compare(password,user.Password);

                if(!valid){
                    throw new Error("Invalid password")
                }

                const token = jwt.sign({userId: user.id},"process.env.APP_SECRET")

                return{
                    token,
                    user
                }
            }
        })
    },
});
