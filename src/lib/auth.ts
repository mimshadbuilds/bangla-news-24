import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { database, mongoClient } from "@/lib/db";

export const auth = betterAuth({
        emailAndPassword: { 
        enabled: true, 
    },

    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    
    database: mongodbAdapter(database, {
        client: mongoClient,
    })
})