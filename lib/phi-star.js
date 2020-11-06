import { dist, phi, lineOfSight } from "../utils/math";

const EXPL_COEF = 1.5;

export class Node {
  constructor(x, y) {
    this.pos = [x, y];
    this.reset();
  }

  reset() {
    this.parent = null;
    this.local = null;
    this.H = 0;
    this.G = Infinity;
    this.lb = -Infinity;
    this.ub = Infinity;
  }

  get F() { return this.G + EXPL_COEF * this.H; }
}

export function phiStar(start, goal, w, h, obs, config) {
  const grid = new Array(w).fill(0).map((_,i) => new Array(h).fill(0).map((_,j) => new Node(i, j)));
  const openset = new Set();
  const closedset = new Set();

  start = grid[start[0]][start[1]];
  goal = grid[goal[0]][goal[1]];
  goal.H = 0;
  start.G = 0;
  start.H = dist(start, goal);

  return findPath(start, goal, grid, openset, closedset, obs, config);
}

function findPath(start, goal, grid, openset, closedset, obs, config) {
  if (openset.size === 0) {
    openset.add(start);
  }

  while (openset.size !== 0 && Math.min(...[...openset].map(n => n.F)) < goal.F) {
    const current = [...openset].reduce((a, b) => a.F < b.F ? a : b);

    openset.delete(current);
    closedset.add(current);

    const children = getChildren(current, grid, obs, {crossbar: false, ...config});
    children.forEach(node => {
      if (closedset.has(node)) {
        return;
      }

      if (!openset.has(node)) {
        node.G = Infinity;
        node.H = dist(node, goal);
        node.parent = null;
        node.ub = Infinity;
        node.lb = - Infinity;
        openset.add(node);
      }

      updateVertex(current, node, grid, obs, config);
    });
  }

  if (!goal.parent) {
    return [[], new Set([...openset, ...closedset])];
  }

  const path = [];
  let current = goal;
  while (current.parent) {
    path.push(current.pos);
    current = current.parent;
  }
  path.push(current.pos);
  return [path.reverse(), new Set([...openset, ...closedset])];
}

function getChildren(node, grid, obs, config) {
  const crossbar = config.crossbar === undefined ? true : config.crossbar;
  const checkLOS = config.checkLOS === undefined ? true : config.checkLOS;

  const directions = crossbar ? [[1,0],[0,1],[0,-1],[-1,0]] : [[1,0],[0,1],[1,1],[-1,-1],[1,-1],[-1,1],[0,-1],[-1,0]];
  const children = [];
  directions.forEach(dir => {
    const [x, y] = [node.pos[0] + dir[0], node.pos[1] + dir[1]];
    if (0 <= x && x < grid.length && 0 <= y && y < grid[0].length 
      && (!checkLOS || lineOfSight(node.pos, grid[x][y].pos, obs, config))) {
        children.push(grid[x][y]);
    }
  });
  return children;
}

function updateVertex(current, node, grid, obs, config) {
  if (current.parent && lineOfSight(current.parent, node, obs, config) 
      && current.lb <= phi(current, current.parent, node)
      && phi(current, current.parent, node) <= current.ub 
      && true) {
      //&& !pathTie(node, current)) {
      
      // Path 2
      const newG = current.parent.G + dist(current.parent, node);
      if (newG < node.G) {
        node.G = newG;
        node.parent = current.parent;
        node.local = current;
        const neighbors = getChildren(node, grid, obs, {crossbar: true, ...config}).map(n => phi(node, current.parent, n));
        const delta = phi(current, current.parent, node);
        node.lb = Math.max(Math.min(...neighbors), current.lb - delta);
        node.ub = Math.min(Math.max(...neighbors), current.ub - delta);
      }
    } else {
      // Path 1
      const newG = current.G + dist(current, node);
      if (newG < node.G) {
        node.G = newG;
        node.parent = current;
        node.local = current;
        node.lb = -45;
        node.ub = 45;
      }
    }
}

