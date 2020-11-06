import {Node} from '../lib/phi-star';

export function randInt(min, max) {
  if (max === undefined || max === null || isNaN(+max)) {
    max = min;
    min = 0;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function dist(a, b) {
  a = (a instanceof Node) ? a.pos : a;
  b = (b instanceof Node) ? b.pos : b;
  return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
}

// Return true if a point is located inside a polygon
// ref: https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
export function pointInPolygon(pt, poly) {
  const [x, y] = pt;
  let j = poly.length - 1;
  let odd = false;

  for (let i = 0; i < poly.length; ++i) {
    if ((poly[i][1] < y && poly[j][1] >= y || poly[j][1] < y && poly[i][1] >= y) && (poly[i][0] <= x || poly[j][0] <= x)) {
      odd ^= (poly[i][0] + (y-poly[i][1])*(poly[j][0]-poly[i][0])/(poly[j][1]-poly[i][1])) < x; 
    }

    j = i; 
  }

  return odd;
}

// Test line of sight between points against polygon obstacles
export function lineOfSight(a, b, obs, {cellSize}) {
  a = a instanceof Node ? a.pos : a;
  b = b instanceof Node ? b.pos : b;
  for (const poly of obs) {
    if (pointInPolygon([b[0]*cellSize, b[1]*cellSize], poly)) {
      return false;
    }
    let j = poly.length - 1;
    for (let i = 0; i < poly.length; ++i) {
      if (intersectSegments(a[0]*cellSize, a[1]*cellSize, b[0]*cellSize, b[1]*cellSize, poly[i][0], poly[i][1], poly[j][0], poly[j][1])) {
        return false;
      }
      j = i;
    }
  }

  return true;
}

// Test intersection between two segments [(a, b)->(c, d)] and [(p, q)->(r, s)]
// ref: https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
export function intersectSegments(a, b, c, d, p, q, r, s) {
  let det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}

// Return the angle defined by the three points. Defined in the Phi* paper
export function phi(a, b, c) {
  a = a instanceof Node ? a.pos : a;
  b = b instanceof Node ? b.pos : b;
  c = c instanceof Node ? c.pos : c;
  let angle = (180./Math.PI) * (-Math.atan2(a[1] - b[1], a[0] - b[0]) + Math.atan2(c[1] - b[1], c[0] - b[0]));
  return angle > 180 ? ((angle % 180) - 180) : angle;
}