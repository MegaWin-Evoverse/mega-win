import { getBucketCount } from './geometry';
import { solveTrajectory } from './solver';

describe('plinko solver', () => {
  it.each([8, 12, 14])('lands the ball in every target bucket for %i rows', (rows) => {
    const bucketCount = getBucketCount(rows);
    for (let target = 0; target < bucketCount; target++) {
      expect(solveTrajectory(rows, target).bucket).toBe(target);
    }
  });

  it('caches and returns the same trajectory for the same rows and bucket', () => {
    const first = solveTrajectory(8, 3);
    const second = solveTrajectory(8, 3);
    expect(second).toBe(first);
  });
});
