const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const crud = require('./crud');



async function main() {
    await crud.read();

    await crud.create();
    await crud.read();

    await crud.update();
    await crud.read();

    await crud.deletee();
    await crud.read();
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })