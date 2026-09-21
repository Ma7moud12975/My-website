import { create } from 'zustand';

type SceneState = {
  stage: number;
  reducedMotion: boolean;
  paused: boolean;
  setStage: (stage: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  setPaused: (paused: boolean) => void;
};

export const useSceneStore = create<SceneState>(set => ({
  stage: 0,
  reducedMotion: false,
  paused: false,
  setStage: stage => set({ stage }),
  setReducedMotion: reducedMotion => set({ reducedMotion }),
  setPaused: paused => set({ paused }),
}));
