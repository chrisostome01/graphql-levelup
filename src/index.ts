import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { context } from "./context";   

import { schema } from "./schema/schema";
export const server = new ApolloServer({
    schema,
    introspection: true,                                      
    plugins: [ApolloServerPluginLandingPageLocalDefault()],  
    context:context
});


const port = process.env.PORT || 3000;
server.listen({port}).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});