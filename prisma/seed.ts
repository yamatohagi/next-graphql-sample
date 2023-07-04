import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.createMany({
    data: [
      {
        title: '初めてのボルダリング',
        content: '初めてボルダリングをやってみたいと思います。一緒に行ってくれる方を探しています。',

        gymId: 1,
        experienceMonths: 1, // example values
        belayMonths: 5,
        grade: '11A',
      },
      {
        title: 'リードクライミングパートナー募集',
        content: '週末のリードクライミングのパートナーを探しています。経験者優先です。',

        gymId: 2,
        experienceMonths: 2, // example values
        belayMonths: 6,
        grade: '11B',
      },
      {
        title: 'ボルダリングとリードの両方を楽しみたい',
        content:
          'ボルダリングとリードの両方をやってみたいです。同じように考えている方、一緒に行きませんか？',

        gymId: 3,
        experienceMonths: 3, // example values
        belayMonths: 7,
        grade: '11C',
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
