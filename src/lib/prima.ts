import { PrismaClient } from "../generated/client.js";



export const prisma = new PrismaClient({
    log: [ 'error', 'query' ],
    errorFormat: 'pretty'
})