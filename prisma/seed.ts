// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      password: '123456',
      username: 'Test',
      address: 'Saudi Arabia, Jeddah',
      gender: 'male',
      phoneNumber: '7654567853',
      dateOfBirth: new Date('1991-09-24'),
    },
  });

  /*   const todo = await prisma.todo.upsert({
    where: { todoItem: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      todoItem: "What's new in Prisma? (Q1/22)",
      
    },
  });
 */
  console.log({ user });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
