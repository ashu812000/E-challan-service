const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


// the default context of prisma
const defaultCtx = {
    prisma: prisma,
}

module.exports = {
    defaultCtx: defaultCtx
}