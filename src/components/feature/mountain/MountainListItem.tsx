import React, { useState, useEffect } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { css } from 'styled-system/css';

import Iconify from 'src/components/iconify/Iconify';
import { Grid, Stack } from '@mui/material';
import Image from 'src/components/image/Image';

function MountainListItem() {
  const m = {
    name: '木曽駒ヶ岳',
    height: 1000,
    prefecture: 'nagano',
    image: '/assets/images/mock/kisokoma.jpg',
  };

  return (
    <div style={{ marginTop: 1 }}>
      <Grid container>
        <Grid item xs={12} sm={12} sx={{ mb: '0.5%' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '2%' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>{m.name}</div>
            <div
              style={{
                marginTop: '1.3%',
                marginLeft: 'auto',
                marginRight: 'auto',
                fontSize: '70%',
                fontWeight: 'bold',
              }}
            >
              - 高尾山よりコースタイム短いのに景色はアルプス -
            </div>
          </div>
        </Grid>

        <Grid item xs={5} sm={5}>
          <div
            className={css({
              marginLeft: '1%',
              fontSize: '70%',
              color: '#6D6D6D',
              fontStyle: 'normal',
              fontWeight: 350,
              lineHeight: '100%',
              display: 'flex',
            })}
          >
            <Iconify icon="mdi:map-marker" width="7%" sx={{ mr: 0.3 }} />
            長野県、中央アルプス
          </div>
        </Grid>
        <Grid item xs={7} sm={7}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              className={css({
                fontSize: '70%',
                color: '#6D6D6D',
                fontStyle: 'normal',
                fontWeight: 350,
                lineHeight: '100%',
                display: 'flex',
              })}
            >
              <Iconify icon="mdi:mountain" width="0.8rem" sx={{ marginRight: 0.3 }} />
              百名山
            </div>
            <div
              className={css({
                fontSize: '70%',
                color: '#6D6D6D',
                fontStyle: 'normal',
                fontWeight: 350,
                lineHeight: '100%',
                display: 'flex',
                marginRight: '1.5rem',
              })}
            >
              <Iconify icon="material-symbols:elevation" width="0.8rem" sx={{ marginRight: 0.3 }} />
              標高：2,956 m
            </div>
          </div>
        </Grid>
        <Grid item xs={5} sm={5}>
          <div
            style={{
              marginTop: '3%',
              marginLeft: '3%',
              overflow: 'hidden',
              width: '100%',
              height: '110px',
              flexShrink: 0,
              borderRadius: 3,
            }}
          >
            <Image
              src={m.image}
              alt="500"
              sx={{ height: '100%', objectFit: 'cover', objectPosition: '1000% 500%' }}
            />
          </div>
        </Grid>
        <Grid item xs={7} sm={7}>
          <div
            style={{
              fontSize: '80%',
              marginLeft: '4%',
              marginTop: '3%',
              overflow: 'hidden',
              height: '110px',
            }}
          >
            長野県南部に連なる中央アルプス（木曽山脈）の最高峰。登山者の多くが利用するロープウェイ・千畳敷駅がメインの登山口となる。標高約2600ｍ、日本最高地点の駅前に広がる千畳敷は、日本でも有数のお花畑だ。ここから山頂へは、急登こそあるものの通過困難箇所はなく、天気が安定していれば初級者でもそう苦労せず山頂を踏めることだろう
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div
            style={{
              marginTop: '3%',
              marginBottom: '20%',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '97%',
              height: '0.5px',
              background: '#EDEDED',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default MountainListItem;
