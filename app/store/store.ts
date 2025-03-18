import { create } from 'zustand'

interface TunerState {
  closeValue: number;
  order: number;
  centsOff: number;
  selected: number;
  frequency: number | null;
  note:  string | null;
  updateStore: (...args: any) => void;
  notes: INote[]
}

interface INote {
  note: string;
  frequency: number;
}

export const useTunerStore = create<TunerState>()((set) => ({
  closeValue: 10,
  order: 0,
  centsOff: 0,
  selected: 0,
  frequency: null,
  note:  "C",
  updateStore: (newData) => set((state) => ({
    ...state,
    ...newData
  })),
  notes: [
    { note: "C", frequency: 65.41 },
    { note: "C#", frequency: 69.3 },
    { note: "D", frequency: 73.42 },
    { note: "D#", frequency: 77.78 },
    { note: "E", frequency: 82.41 },
    { note: "F", frequency: 87.31 },
    { note: "F#", frequency: 92.5 },
    { note: "G", frequency: 98.0 }, 
    { note: "G#", frequency: 103.83 },
    { note: "A", frequency: 110.0 },
    { note: "A#", frequency: 116.54 },
    { note: "B", frequency: 123.47 },
    { note: "C", frequency: 130.81 },
    { note: "C#", frequency: 138.59 },
    { note: "D", frequency: 146.83 },
    { note: "D#", frequency: 155.56 },
    { note: "E", frequency: 164.81 },
    { note: "F", frequency: 174.61 },
    { note: "F#", frequency: 185.0 },
    { note: "G", frequency: 196.0 },
    { note: "G#", frequency: 207.65 },
    { note: "A", frequency: 220.0 },
    { note: "A#", frequency: 233.08 },
    { note: "B", frequency: 246.94 },
    { note: "C", frequency: 261.63 },
    { note: "C#", frequency: 277.18 },
    { note: "D", frequency: 293.66 },
    { note: "D#", frequency: 311.13 },
    { note: "E", frequency: 329.63 },
    { note: "F", frequency: 349.23 },
    { note: "F#", frequency: 369.99 },
    { note: "G", frequency: 392.0 },
    { note: "G#", frequency: 415.3 },
    { note: "A", frequency: 440.0 },
    { note: "A#", frequency: 466.16 },
    { note: "B", frequency: 493.88 },
    { note: "C", frequency: 523.25 },
    { note: "C#", frequency: 554.37 },
    { note: "D", frequency: 587.33 },
    { note: "D#", frequency: 622.25 },
    { note: "E", frequency: 659.25 },
    { note: "F", frequency: 698.46 },
    { note: "F#", frequency: 739.99 },
    { note: "G", frequency: 783.99 },
    { note: "G#", frequency: 830.61 },
    { note: "A", frequency: 880.0 },
    { note: "A#", frequency: 932.33 },
    { note: "B", frequency: 987.77 },
    { note: "C", frequency: 1046.5 },
  ],
}))