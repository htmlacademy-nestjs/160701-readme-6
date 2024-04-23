import { PrismaClient, PostType } from '@prisma/client';
import { fakerRU as faker } from '@faker-js/faker';

function createRandomPost() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence({ min: 1, max: 5 }),
    type: faker.helpers.arrayElement(Object.values(PostType)),
    authorId: faker.string.uuid(),
    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
      name: faker.lorem.word(),
    })),
    comments: Array.from(
      { length: faker.number.int({ min: 0, max: 5 }) },
      () => ({
        userId: faker.string.uuid(),
        message: faker.lorem.sentence(),
      })
    ),
  };
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = faker.helpers.multiple(createRandomPost, {
    count: 5,
  });

  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        title: post.title,
        type: post.type,
        authorId: post.authorId,
        tags: post.tags ? { create: post.tags } : undefined,
        comments: post.comments
          ? {
              create: post.comments,
            }
          : undefined,
      },
    });
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
