import { atom } from 'jotai';
import { Data } from '../types';

export const playingAtom = atom(false);
export const mutedAtom = atom(false);
export const volumeAtom = atom(0.5);
export const dataAtom = atom<Data>({} as Data);
export const sourceAtom = atom('');
