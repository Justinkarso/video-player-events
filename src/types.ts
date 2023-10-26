type UUID = string;

interface TickerItem {
  id: UUID;
  body: string;
}

interface Score {
  home: number;
  away: number;
}

type EventType = 'goal' | 'card' | 'endHalf' | 'endGame';

interface BaseEvent {
  id: UUID;
  time: number;
  type: EventType;
}

interface GoalEvent extends BaseEvent {
  type: 'goal';
  player: string;
  distanceOfShot: number;
  newScore: Score;
}

interface CardEvent extends BaseEvent {
  type: 'card';
  cardType: 'red' | 'yellow';
  player: string;
}

interface EndHalfEvent extends BaseEvent {
  type: 'endHalf';
}

interface EndGameEvent extends BaseEvent {
  type: 'endGame';
}

export type GameEvent = GoalEvent | CardEvent | EndHalfEvent | EndGameEvent;

export interface Data {
  ticker: TickerItem[];
  events: GameEvent[];
}
