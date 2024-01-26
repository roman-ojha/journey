import React from 'react';
import * as S from './References.styles';
import { FacebookOutlined, GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>
        Made by{' '}
        <a href="https://github.com/roman-ojha/journey" target="_blank" rel="noreferrer">
          Journey{' '}
        </a>
        in 2024 &copy;.
      </S.Text>
      <S.Icons>
        <a href="https://github.com/roman-ojha/journey" target="_blank" rel="noreferrer">
          <GithubOutlined />
        </a>
        <a href="https://twitter.com/roman__ojha" target="_blank" rel="noreferrer">
          <TwitterOutlined />
        </a>
        <a href="https://www.facebook.com/razz.Roman.5/" target="_blank" rel="noreferrer">
          <FacebookOutlined />
        </a>
        <a href="https://www.linkedin.com/in/roman-ojha-3b8bb2209/" target="_blank" rel="noreferrer">
          <LinkedinOutlined />
        </a>
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
