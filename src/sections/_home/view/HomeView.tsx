import React, { useState, useEffect } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { css } from 'styled-system/css';
import Image from 'next/image';
import Iconify from 'src/components/iconify/Iconify';
import HomeList from '../list/HomeList';

const images = [
  '/assets/images/home/tubakuro.jpg',
  `/assets/images/home/star.jpg`,
  '/assets/images/home/snow.jpg',
  '/assets/images/home/tree.jpg',
];

function HomeView() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((currentImageIndex + 1) % images.length);
    }, 5000); // 画像を5秒ごとに切り替える

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex]);

  const homeViewStyle = css({
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  });

  const overlayStyle = css({
    background: 'rgba(24, 75, 101, 0.89)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1, // 画像の上に配置する
  });

  return (
    <>
      <div className={homeViewStyle}>
        {images.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            style={{
              objectFit: 'cover',
              position: 'absolute',
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
            }}
            quality={100}
          />
        ))}
        <div className={overlayStyle} />
        {/* //svgを追加 */}
        <Image
          className={css({
            position: 'absolute',
            top: '16%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          })}
          alt="500"
          src="/assets/home/sub-title.svg"
          width={350}
          height={75}
          style={{ width: '93%', height: 'auto' }}
          priority
        />
        <Image
          className={css({
            position: 'absolute',
            top: '31%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          })}
          alt="500"
          src="/assets/home/title.svg"
          width={200}
          height={75}
          style={{ width: '63%', height: 'auto' }}
          priority
        />

        <ToggleGroupDemo />
        <div
          className={css({
            position: 'absolute',
            top: '57%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', // ← 'inline-flex'から'flex'に変更
            // 左から10ピクセルのいちに配置

            width: '328px',

            zIndex: 2,
          })}
        >
          <input
            placeholder="山名・エリア・キーワード"
            type="email"
            className={css({
              flexGrow: 2, // ← 'width'を削除し'flexGrow'を追加
              height: '55px',
              borderLeftRadius: '6px',
              borderRightRadius: '0px',
              paddingLeft: '15px', // プレースホルダーの左側の余白を追加
              backgroundPosition: '20px center', // プレースホルダーの位置を変更
              _placeholder: {
                fontSize: '15px',
                fontWeight: 'semibold', // プレースホルダーテキストを太字にする
              },
            })}
          />
          <button
            type="button"
            className={css({
              flexGrow: 10, // ← 'width'を削除し'flexGrow'を追加
              height: '55px',
              borderRightRadius: '6px',
              color: 'white',
              fontWeight: 'semibold',
              fontSize: '15px',
              backgroundColor: '#FA541C',
            })}
          >
            検索
          </button>
        </div>

        <div
          className={css({
            position: 'absolute',
            top: '69%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex', // ← 'inline-flex'から'flex'に変更

            width: '328px',

            zIndex: 2,
          })}
        >
          <button
            type="button"
            className={css({
              flexGrow: 10,
              height: '55px',
              borderRadius: '6px',
              color: 'white',
              fontWeight: 'semibold',
              fontSize: '15px',
              backgroundColor: 'none',
              border: '3px solid #FFF',
              backdropFilter: 'none',
              display: 'flex', // ボタン内の要素を中央に配置するために追加
              alignItems: 'center', // ボタン内の要素を中央に配置するために追加
              justifyContent: 'center', // テキストとアイコンを水平方向に中央揃え
            })}
          >
            <Iconify
              icon="mdi:map-marker"
              width={24}
              style={{ verticalAlign: 'middle', marginRight: 7 }}
            />
            {/* 垂直方向の配置を調整 */}
            現在地から探す
          </button>
        </div>
        {/* <Button className={buttonStyle}>Click me</Button> */}
      </div>
      <div
        className={css({
          position: 'relative',
          backgroundColor: '#F5F5F5',
          height: '13%',
        })}
      >
        <div
          className={css({
            position: 'absolute', // 子divを絶対配置します
            bottom: 2,
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            width: '100%', // 全幅を確保します
          })}
        >
          おすすめの山一覧
        </div>
      </div>
      <HomeList />
    </>
  );
}

export default HomeView;

const ToggleGroupDemo = () => (
  <ToggleGroup.Root
    className={css({
      position: 'absolute',
      top: '47%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 2,
      display: 'inline-flex',
      borderRadius: '6px',
    })}
    type="single"
    defaultValue="left"
    aria-label="Text alignment"
  >
    <ToggleGroup.Item className={ToggleGroupItem()} value="left" aria-label="Left aligned">
      キーワードから探す
    </ToggleGroup.Item>
    <ToggleGroup.Item className={ToggleGroupItem()} value="center" aria-label="Center aligned">
      場所から探す
    </ToggleGroup.Item>
    <ToggleGroup.Item className={ToggleGroupItem()} value="right" aria-label="Right aligned">
      特徴から探す
    </ToggleGroup.Item>
  </ToggleGroup.Root>
);

const ToggleGroupItem = () =>
  css({
    color: 'white',
    fontSize: '12px',

    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 'normal',
    border: '2px solid #FFF',

    width: '110px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    _first: {
      borderRight: 'none',
      marginLeft: '0',
      borderTopLeftRadius: '6px',
      borderBottomLeftRadius: '6px',
    },
    _last: {
      borderLeft: 'none',
      borderTopRightRadius: '6px',
      borderBottomRightRadius: '6px',
    },
    _hover: {
      backgroundColor: 'white',
      position: 'relative',
      color: '#2B5063',
    },
    '&[data-state="on"]': {
      backgroundColor: 'white',
      position: 'relative',
      color: '#2B5063',
    },
    // _focus: {
    //   backgroundColor: 'white',
    //   position: 'relative',
    //   boxShadow: '0 0 0 2px var(--violet-7)',
    // },
  });
