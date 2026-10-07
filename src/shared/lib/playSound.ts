import { useSoundStore } from './soundStore';

const soundFiles = {
  bet: '/sounds/bet.mp3',
  generic: '/sounds/generic.mp3',
  makeBet: '/sounds/make-bet.mp3',
  match: '/sounds/match.mp3',
  plinkoKnock: '/sounds/plinko-knock.mp3',
  pocket: '/sounds/pocket.mp3',
  revealed: '/sounds/revealed.mp3',
  rolling: '/sounds/rolling.mp3',
  roulette: '/sounds/roulette.mp3',
  score: '/sounds/score.mp3',
  selected: '/sounds/selected.mp3',
  starShine: '/sounds/star-shine.mp3',
  throw: '/sounds/throw.mp3',
  tick: '/sounds/tick.mp3',
  winDialog: '/sounds/win-dialog.mp3',
  win: '/sounds/win.mp3',
} as const;

export type SoundName = keyof typeof soundFiles;

const cache = new Map<string, HTMLAudioElement>();

/**
 * Returns a cached HTMLAudioElement for the given src, creating one on first access.
 * Caching avoids repeated DOM element creation for the same sound file.
 */
function getAudio(src: string): HTMLAudioElement {
  const existing = cache.get(src);

  if (existing) {
    return existing;
  }

  const audio = new Audio(src);

  cache.set(src, audio);

  return audio;
}

const AUDIO_VOLUME_SCALE = 100;

/**
 * Plays a sound by name. No-ops on the server (SSR) or when the user has muted audio.
 * Resets playback to the start before playing, so rapid calls restart the sound instead of queuing.
 * Errors from `audio.play()` (e.g. autoplay policy) are silently ignored.
 */
export function playSound(soundName: keyof typeof soundFiles) {
  const { isMuted, volume } = useSoundStore.getState();

  if (isMuted) {
    return;
  }

  const audio = getAudio(soundFiles[soundName]);

  audio.currentTime = 0;
  audio.volume = volume / AUDIO_VOLUME_SCALE;

  audio.play().catch(() => {});
}

export function stopSound(soundName: keyof typeof soundFiles) {
  const audio = cache.get(soundFiles[soundName]);

  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
}
