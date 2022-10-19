export function getImageSize(size: number, fixed = 2) {
  return (size / 1024 / 1024).toFixed(fixed);
}

export function getResizedPx(
  width: number,
  height: number,
  maxResolution = 1000
) {
  if (width < maxResolution && height < maxResolution)
    return {
      width,
      height,
      percentage: 0,
    };
  if (width > height) {
    const newWidth = maxResolution;
    const numOfPxInPercent = width / 100;
    const percentage = newWidth / numOfPxInPercent / 100;
    const newHeight = height * percentage;
    return {
      width: newWidth,
      height: newHeight.toFixed(2),
      percentage: percentage.toFixed(2),
    };
  }
  const newHeight = maxResolution;
  const numOfPxInPercent = height / 100;
  const percentage = newHeight / numOfPxInPercent / 100;
  const newWidth = width * percentage;
  return {
    width: newWidth.toFixed(2),
    height: newHeight,
    percentage: percentage.toFixed(2),
  };
}
