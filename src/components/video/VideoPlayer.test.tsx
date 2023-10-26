import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';
import chalk from 'chalk';
import { Data } from '../../types';

const data: Data = {
  ticker: [],
  events: [
    {
      id: '0b1be716-bd45-4f2e-ad39-4482e89a2105',
      time: 5,
      type: 'goal',
      player: 'Buddy Cullen',
      distanceOfShot: 20,
      newScore: {
        home: 1,
        away: 0,
      },
    },
    {
      id: '343738e5-7c11-4b48-9d28-7d3d66823744',
      time: 12,
      type: 'card',
      cardType: 'red',
      player: 'Roydon Vernon',
    },
    {
      id: '436d934b-1923-4028-a0cb-6d9aa12f09e9',
      time: 30,
      type: 'goal',
      player: 'Buddy Cullen',
      distanceOfShot: 13,
      newScore: {
        home: 1,
        away: 1,
      },
    },
  ],
};

beforeEach(() => {
  jest.useFakeTimers();
});

test('Videoplayer structure checking', () => {
  render(<VideoPlayer data={data} />);
  const video = screen.getByTestId('video-player') as HTMLVideoElement;

  // Check for video and if it has a src attribute
  expect(video).toBeInTheDocument();
  expect(video.src).toBeTruthy();

  // Check if controls and timeline are rendered
  expect(screen.getByTestId('controls')).toBeInTheDocument();
  expect(screen.getByTestId('timeline')).toBeInTheDocument();

  console.log(chalk.green('VideoPlayer structure checking passed'));
});
