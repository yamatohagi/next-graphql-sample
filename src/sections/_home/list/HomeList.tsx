import React, { useState, useEffect, Fragment } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { css } from 'styled-system/css';
import Image from 'next/image';
import Iconify from 'src/components/iconify/Iconify';
import MountainListItem from 'src/components/feature/mountain/MountainListItem';

function HomeList() {
  const ms = [
    {
      name: 'tubakuro',
      height: 1000,
      prefecture: 'nagano',
      image: '/assets/images/home/tubakuro.jpg',
    },
  ];

  return (
    <div
      className={css({
        marginTop: '1.5rem',
        marginBottom: '3rem',
        paddingTop: '1.5rem',
      })}
    >
      {ms.map((m, i) => (
        <Fragment key={i}>
          <MountainListItem />
        </Fragment>
      ))}
    </div>
  );
}

export default HomeList;
