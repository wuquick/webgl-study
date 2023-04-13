export function getLineCubeVertices() {
  const cubeVertices = [
    1, 1, 1,
    -1, 1, 1,
    -1, -1, 1,
    1, -1, 1,
    1, -1, -1,
    1, 1, -1,
    -1, 1, -1,
    -1, -1, -1
  ];
  const cubeIndices = [
    0, 1,
    1, 2,
    2, 3,
    3, 0,
    0, 5,
    1, 6,
    2, 7,
    3, 4,
    4, 5,
    5, 6,
    6, 7,
    7, 4
  ];
  const res: number[] = [];
  cubeIndices.forEach(v => {
    const i = v * 3;
    res.push(
      cubeVertices[i] / 5, cubeVertices[i + 1] / 5, cubeVertices[i + 2] / 5,
      Math.random(), Math.random(), Math.random()
    );
  });
  return res;
}