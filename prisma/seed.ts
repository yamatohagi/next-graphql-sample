import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: '初めてのボルダリング',
        content: '初めてボルダリングをやってみたいと思います。一緒に行ってくれる方を探しています。',
      },
      {
        title: 'リードクライミングパートナー募集',
        content: '週末のリードクライミングのパートナーを探しています。経験者優先です。',
      },
    ],
  });

  await prisma.postLike.createMany({
    data: [
      {
        userId: '1',
        postId: 1,
      },
      {
        userId: '1',
        postId: 1,
      },
    ],
  });

  await prisma.postReply.createMany({
    data: [
      {
        title: 'いいですね',
        content: '一緒に登りましょう',
        postId: 1,
      },
    ],
  });

  await prisma.postReplyLike.createMany({
    data: [
      {
        userId: '1',
        postReplyId: 1,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
