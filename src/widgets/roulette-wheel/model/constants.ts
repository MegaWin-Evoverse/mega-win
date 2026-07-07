export const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const POCKET_COUNT = 37;
export const POCKET_ANGLE_DEG = 360 / POCKET_COUNT;
export const FULL_TURN_DEG = 360;

export const WHEEL_SPEED = 0.32;
export const IDLE_CENTER_SPEED = 0.08;

export const IDLE_BALL_SPEED = 0.25;
export const SPIN_BALL_SPEED = 6;

export const BALL_POCKET_RADIUS = 36;
export const BALL_TRACK_RADIUS = 44.5;
export const BALL_RIM_EASE = 0.15;
export const BALL_DROP_DEPTH = BALL_TRACK_RADIUS - BALL_POCKET_RADIUS;

export const BALL_LANDING_DURATION_MS = 3200;
export const BALL_LANDING_DURATION_TURBO_MS = 900;
export const BALL_ROLL_FRACTION = 0.55;
export const BALL_MIN_LANDING_GAIN_DEG = 360;
export const BALL_DROP_BOUNCE_COUNT = 3;

export const FRAME_TIME_CAP_MS = 100;
export const FRAME_TIME_60FPS_MS = 16.67;
