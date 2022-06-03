import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from "../graphql";

export const schema = makeSchema({
  types, // 1
  outputs: {
    schema: join(process.cwd(), "src/schema/schema.graphql"), // 2
    typegen: join(process.cwd(), "src/schema/nexus-typegen.ts"), // 3
  },
  contextType: {  
    module: join(process.cwd(), "src/context.ts"),  // 1
    export: "Context",  // 2
  }
})
