const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postsToCreate = [
  {
    id: 1,
    title: 'Ini Judul',
    content: 'Ini Content',
  },
  {
    id: 2,
    title: 'Ini Judul kedua',
    content: 'Ini content kedua',
  },
];

const seed = async (posts) => {
  console.log('Creating Posts...');

  await Promise.all(
    posts.map((post) =>
      prisma.post.upsert({
        where: { id: post.id },
        update: post,
        create: post,
      })
    )
  );
};

seed(postsToCreate)
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  })
  .finally(() => {
    prisma.$disconnect();
  });
