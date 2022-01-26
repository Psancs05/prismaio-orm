const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

id = 0;
//? Helper function
async function getId() {
    const user = await prisma.user.findUnique({
        where: {
            email: 'alice@prisma.io',
        },
    });
    id = user.id;
    //console.log(user.id);
}

//! Read
async function read() {
    const allUsers = await prisma.user.findMany()
    const allProfiles = await prisma.profile.findMany()
    const allPosts = await prisma.post.findMany()
    console.log("----- Founded Users -----")
    console.log(allUsers)
    console.log("----- Founded Profiles -----")
    console.log(allProfiles)
    console.log("----- Founded Posts -----")
    console.log(allPosts)
    console.log("----------")
}

//! Create
async function create() {
    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@prisma.io',
            posts: {
                create: { title: 'Hello World' },
            },
            profile: {
                create: { bio: 'I like turtles' },
            },
        },
    })

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    })
    //console.dir(allUsers, { depth: null })
}



//! Update
async function update() {
    await getId();
    const post = await prisma.user.update({
        where: { id: id },
        data: { name: 'Bob' },
    })
    //console.log(post)
}

//! Delete
async function deletee() {
    await getId();
    const deletePosts = prisma.post.deleteMany()
    const deleteProfile = prisma.profile.deleteMany()
    const deleteUsers = prisma.user.deleteMany()

    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([deleteProfile, deletePosts, deleteUsers])
}

module.exports = { read, create, update, deletee }
