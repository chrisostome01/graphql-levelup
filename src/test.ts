import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function getUsers() {
    const allUsers = await prisma.user.findMany();
    return allUsers
}


// async function getSpacificUsers() {
//     const allUsers = await prisma.user.findMany({
//         include: {
//             posts: true,
//             profile: true,
//         }
//     });
//     return allUsers
// }




async function getUsersWithPost() {
    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        }
    });
    return allUsers
}




async function main() {

    // await prisma.user.create({
    //     data: {
    //       name: 'Alice',
    //       email: 'alice@prisma.io',
    //       posts: {
    //         create: { title: 'Hello World' },
    //       },
    //       profile: {
    //         create: { bio: 'I like turtles' },
    //       },
    //     },
    //   })

    const allUsers = await getUsers();
    console.dir(allUsers);

    const allUsersWithPost = await getUsersWithPost();
    console.dir(allUsersWithPost);
}


main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })