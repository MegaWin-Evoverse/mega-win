const ROULETTE_POCKET_COUNT = 37;
const FLOAT_BYTE_COUNT = 4;
const BYTE_BASE = 256;
const KENO_TOTAL_NUMBERS = 40;
const KENO_DRAWN_COUNT = 20;
const FLOATS_PER_HASH = 8;
const BYTES_PER_FLOAT = 4;

async function hmacSha256Hex(key: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

function bytesToFloat(bytes: number[]): number {
  return bytes.reduce((result, byte, index) => result + byte / BYTE_BASE ** (index + 1), 0);
}

export async function computeRouletteOutcome(
  clientSeed: string,
  serverSeed: string,
  nonce: string
): Promise<number> {
  const hex = await hmacSha256Hex(serverSeed, `${clientSeed}:${nonce}:0`);
  const bytes = (hex.match(/.{2}/g) ?? [])
    .slice(0, FLOAT_BYTE_COUNT)
    .map((byte) => parseInt(byte, 16));
  const float = bytesToFloat(bytes);
  return Math.floor(float * ROULETTE_POCKET_COUNT);
}

export async function computeKenoOutcome(
  clientSeed: string,
  serverSeed: string,
  nonce: string
): Promise<number[]> {
  const numbers = Array.from({ length: KENO_TOTAL_NUMBERS }, (_, i) => i);
  let hash = '';
  let hashIndex = -1;

  for (let cursor = 0; cursor < KENO_DRAWN_COUNT; cursor++) {
    const nextHashIndex = Math.floor(cursor / FLOATS_PER_HASH);
    if (nextHashIndex !== hashIndex) {
      hash = await hmacSha256Hex(serverSeed, `${clientSeed}:${nonce}:${nextHashIndex}`);
      hashIndex = nextHashIndex;
    }
    const hexOffset = (cursor % FLOATS_PER_HASH) * BYTES_PER_FLOAT * 2;
    const bytes = [0, 1, 2, 3].map((b) =>
      parseInt(hash.slice(hexOffset + b * 2, hexOffset + b * 2 + 2), 16)
    );
    const float = bytesToFloat(bytes);
    const swapIndex = cursor + Math.floor(float * (KENO_TOTAL_NUMBERS - cursor));
    [numbers[cursor], numbers[swapIndex]] = [numbers[swapIndex], numbers[cursor]];
  }

  return numbers.slice(0, KENO_DRAWN_COUNT);
}

export async function computePlinkoOutcome(
  clientSeed: string,
  serverSeed: string,
  nonce: string,
  rows: number
): Promise<number[]> {
  const hex = await hmacSha256Hex(serverSeed, `${clientSeed}:${nonce}:0`);
  const bytes = (hex.match(/.{2}/g) ?? []).slice(0, rows).map((byte) => parseInt(byte, 16));
  return bytes.map((byte) => byte % 2);
}
