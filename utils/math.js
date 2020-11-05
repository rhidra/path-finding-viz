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