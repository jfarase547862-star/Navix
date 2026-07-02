import type { Office } from "./mock-data";

export type Cell = { x: number; y: number };

export interface RouteResult {
  path: Cell[];
  visited: number;
}

const GRID_SIZE = 10;

function key(cell: Cell) {
  return `${cell.x},${cell.y}`;
}

function buildNeighbors(grid: Cell[][], cell: Cell): Cell[] {
  const neighbors: Cell[] = [];
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
  ];

  for (const dir of directions) {
    const next = { x: cell.x + dir.x, y: cell.y + dir.y };
    if (next.x >= 0 && next.x < grid.length && next.y >= 0 && next.y < grid[0].length) {
      neighbors.push(next);
    }
  }

  return neighbors;
}

export function buildGrid(_floor: 1 | 2): Cell[][] {
  return Array.from({ length: GRID_SIZE }, (_, x) =>
    Array.from({ length: GRID_SIZE }, (_, y) => ({ x, y })),
  );
}

export function dijkstra(grid: Cell[][], start: Cell, target: Cell): RouteResult {
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();
  const queue: Cell[] = [start];

  distances.set(key(start), 0);

  while (queue.length > 0) {
    queue.sort((a, b) => (distances.get(key(a)) ?? Number.POSITIVE_INFINITY) - (distances.get(key(b)) ?? Number.POSITIVE_INFINITY));
    const current = queue.shift();
    if (!current) break;

    const currentKey = key(current);
    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    if (current.x === target.x && current.y === target.y) {
      break;
    }

    for (const neighbor of buildNeighbors(grid, current)) {
      const nextKey = key(neighbor);
      if (visited.has(nextKey)) continue;
      const tentative = (distances.get(currentKey) ?? 0) + 1;
      const existing = distances.get(nextKey);
      if (existing === undefined || tentative < existing) {
        distances.set(nextKey, tentative);
        previous.set(nextKey, currentKey);
        queue.push(neighbor);
      }
    }
  }

  const path: Cell[] = [];
  let cursor: string | null = key(target);
  while (cursor) {
    const cell = cursor.split(",").map(Number);
    path.push({ x: cell[0], y: cell[1] });
    cursor = previous.get(cursor) ?? null;
  }

  path.reverse();
  return { path, visited: visited.size };
}

export function doorCell(office: Office): Cell {
  const x = office.coords?.x ?? 4;
  const y = office.coords?.y ?? 4;
  return {
    x: Math.max(0, Math.min(GRID_SIZE - 1, Math.round(x / 10))),
    y: Math.max(0, Math.min(GRID_SIZE - 1, Math.round(y / 10))),
  };
}

export function pathDistanceMeters(path: Cell[]) {
  return Math.max(1, path.length * 14);
}

export function walkingTimeMinutes(distanceMeters: number) {
  return Math.max(1, Math.round(distanceMeters / 35));
}

export function pathToSteps(path: Cell[], destinationLabel: string) {
  if (path.length <= 1) {
    return [`You are already at ${destinationLabel}.`];
  }

  const steps: string[] = [];
  for (let i = 1; i < path.length; i += 1) {
    const prev = path[i - 1];
    const current = path[i];
    const dx = current.x - prev.x;
    const dy = current.y - prev.y;

    let direction = "go forward";
    if (dx === 1) direction = "turn right";
    if (dx === -1) direction = "turn left";
    if (dy === 1) direction = "continue ahead";
    if (dy === -1) direction = "head back";

    steps.push(`${direction} to the next waypoint.`);
  }

  steps[steps.length - 1] = `Arrive at ${destinationLabel}.`;
  return steps;
}
