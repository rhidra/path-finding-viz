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
  return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
}

// Extract index limits in a grid for the intersection with a polygon
export function getGridPolygonBoundaries(poly, cellSize) {
  const [[x1, y1], [x2, y2]] = getPolygonBoundaries(poly);
  return [[Math.floor(x1 / cellSize), Math.floor(y1 / cellSize)], [Math.floor(x2 / cellSize), Math.floor(y2 / cellSize)]];
}

// Extract rectangle boundary of a polygon 
export function getPolygonBoundaries(poly) {
  let [minX, maxX, minY, maxY] = [poly[0][0], poly[0][0], poly[0][1], poly[0][1]];
  poly.forEach(([x, y]) => {
    maxX = Math.max(maxX, x);
    minX = Math.min(minX, x);
    maxY = Math.max(maxY, y);
    minY = Math.min(minY, y);
  });
  return [[minX, minY], [maxX, maxY]];
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