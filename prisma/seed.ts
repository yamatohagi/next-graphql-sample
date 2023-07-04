import { PrismaClient, ClimbingType } from '@prisma/client';
import { TURBO_TRACE_DEFAULT_MEMORY_LIMIT } from 'next/dist/shared/lib/constants';

const prisma = new PrismaClient();

async function main() {
  const gyms = await prisma.gym.createMany({
    data: [
      {
        name: 'パンプ1',
        image: 'https://example.com/gym1.jpg',
        climbingType: ClimbingType.BOULDER,
      },
      {
        name: 'パンプ2',
        image: 'https://example.com/gym2.jpg',
        climbingType: ClimbingType.LEAD,
      },
      {
        name: 'パンプ3',
        image: 'https://example.com/gym3.jpg',
        climbingType: ClimbingType.BOTH,
      },
    ],
  });

  const gymImpPost = await prisma.gymImpPost.createMany({
    data: [
      {
        userName: 'John Doe',
        title: 'pump2は辛すぎる',
        content: '全然歯が立たなかったです。。',
        gymId: 2,
      },
      {
        userName: 'もつ',
        title: '何とか',
        content: '辛かったがテクニカルで面白い！',
        gymId: 2,
      },
    ],
  });

  const gymImpPostLike = await prisma.gymImpPostLike.createMany({
    data: [
      {
        userId: 'ba4485fb-d976-3df1-414d-7ad587f8ed61',
        gymImpPostId: 1,
      },
      {
        userId: '967de4f7-a857-c5ff-0b2d-8abf95eab7c3',
        gymImpPostId: 2,
      },
    ],
  });

  const gymLike = await prisma.gymLike.createMany({
    data: [
      {
        userId: 'ba4485fb-d976-3df1-414d-7ad587f8ed61',
        gymId: 1,
      },
      {
        userId: '967de4f7-a857-c5ff-0b2d-8abf95eab7c3',
        gymId: 2,
      },
    ],
  });

  const posts = await prisma.post.createMany({
    data: [
      {
        title: '初めてのボルダリング',
        content: '初めてボルダリングをやってみたいと思います。一緒に行ってくれる方を探しています。',
        climbingType: ClimbingType.BOULDER,
        gymId: 1,
        experienceMonths: 1, // example values
        belayMonths: 5,
        grade: '11A',
      },
      {
        title: 'リードクライミングパートナー募集',
        content: '週末のリードクライミングのパートナーを探しています。経験者優先です。',
        climbingType: ClimbingType.LEAD,
        gymId: 2,
        experienceMonths: 2, // example values
        belayMonths: 6,
        grade: '11B',
      },
      {
        title: 'ボルダリングとリードの両方を楽しみたい',
        content:
          'ボルダリングとリードの両方をやってみたいです。同じように考えている方、一緒に行きませんか？',
        climbingType: ClimbingType.BOTH,
        gymId: 3,
        experienceMonths: 3, // example values
        belayMonths: 7,
        grade: '11C',
      },
    ],
  });

  const replies = await prisma.reply.createMany({
    data: [
      {
        userName: 'John Doe',
        title: 'My First Reply',
        content: 'いいですね、興味があります',
        postId: 1,
      },
      {
        userName: 'もつ',
        title: '私も',
        content: 'みんなで登りましょう！',
        postId: 1,
      },
    ],
  });

  const preferredDayAndTimes = await prisma.preferredDayAndTime.createMany({
    data: [
      {
        dayAndTime: '12',
        postId: 1,
      },
      {
        dayAndTime: '32',
        postId: 1,
      },
      {
        dayAndTime: '61',
        postId: 2,
      },
      {
        dayAndTime: '01',
        postId: 2,
      },
      {
        dayAndTime: '02',
        postId: 3,
      },
    ],
  });

  const postLike = await prisma.postLike.createMany({
    data: [
      {
        userId: 'ba4485fb-d976-3df1-414d-7ad587f8ed61',
        postId: 1,
      },
      {
        userId: '967de4f7-a857-c5ff-0b2d-8abf95eab7c3',
        postId: 1,
      },
    ],
  });

  const viewHistory = await prisma.viewHistory.createMany({
    data: [
      {
        userId: 'ba4485fb-d976-3df1-414d-7ad587f8ed61',
        postId: 1,
      },
      {
        userId: '967de4f7-a857-c5ff-0b2d-8abf95eab7c3',
        postId: 1,
      },
    ],
  });

  const Tozanguthi = await prisma.tozanguthi.createMany({
    data: [
      {
        tozangutiName: '千畳敷カール',
        uphillTime: 105,
        downhillTime: 105,
        uphillDistance: 1750,
        downhillDistance: 1750,
        nigiyaka: 5,
        view: 5,
        toilet: '有',
        vendingMachin: '有',
        store: '有',
        mycar: '不可',
        lastStopByCar: '菅の台バスセンター',
        entranceTime: 40,
        transportation: '路線バス、ロープウェイ',
        remark: '土日は混む',
      },
    ],
  });

  const Mountain = await prisma.mountain.createMany({
    data: [
      {
        name: '木曽駒ヶ岳',
        nameKana: 'きそこまがたけ',
        postalCode: 3994301,
        prefecture: '長野県',
        address1: '木曽郡上松町',
        address2: '',
        address3: '',
        hyakumeizanStatus: true,
        MountainPeak: 2956,
        appealPoint: '高尾山よりコースタイム短いのに景色はアルプス。コスパ良き!',
        description:
          '長野県南部に連なる中央アルプス（木曽山脈）の最高峰。登山者の多くが利用するロープウェイ・千畳敷駅がメインの登山口となる。標高約2600ｍ、日本最高地点の駅前に広がる千畳敷は、日本でも有数のお花畑だ。ここから山頂へは、急登こそあるものの通過困難箇所はなく、天気が安定していれば初級者でもそう苦労せず山頂を踏めることだろう。コース沿いには中央アルプス固有種のコマウスユキソウ（ヒメウスユキソウ）が咲き、時間があれば中央アルプス唯一の氷河湖、濃ヶ池に立ち寄るのもいい。山頂周辺と宝剣岳北面には計５軒の山小屋もあって天気急変の際などは安心だが、一気に高度が上がるので高山病には注意が必要。水分をたっぷり摂ることとゆっくり歩くことが高山病を防ぐコツだ。なお、宝剣岳はクサリ場が連続する。岩場が苦手な人は立ち入らないように。',
      },
    ],
  });

  console.log('Created gyms:', gyms);
  console.log('Created gymImpPost:', gymImpPost);
  console.log('Created gymImpPostLike:', gymImpPostLike);
  console.log('Created gymLike:', gymLike);
  console.log('Created posts:', posts);
  console.log('Created preferredDayAndTimes:', preferredDayAndTimes);
  console.log('Created postLike:', postLike);
  console.log('Created replies:', replies);
  console.log('Created viewHistory:', viewHistory);
  console.log('Created tozanguti:', Tozanguthi);
  console.log('Created tozanguti:', Mountain);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
