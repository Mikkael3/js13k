const calculateCanvasYPosition = (mapSy: number, objectY: number): number => {
  const mapStartSy = 3520 - 640;
  const deltaSy = mapStartSy - mapSy;
  const y = objectY + deltaSy;
  return y;
};

export default calculateCanvasYPosition;
