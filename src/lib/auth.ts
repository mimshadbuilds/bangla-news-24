import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
// import { Resend } from 'resend';


const client = new MongoClient(process.env.MONGODB_URL!);
const database = client.db('news24-auth-db');

// const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
        emailAndPassword: { 
        enabled: true, 
    },
    
    database: mongodbAdapter(database, {
        client,
    })
})