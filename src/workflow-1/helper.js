export const setOnPath = (data, path, value) => {
  const pathArr = path.split('.');
  let clone = JSON.parse(JSON.stringify(data));
  const clonedOriginal = clone;

  let current = 0;
  while (pathArr[current] && current < pathArr.length - 1) {
    clone = clone[pathArr[current++]];
  }
  current === pathArr.length - 1 && (clone[pathArr[current]] = value);
  return clonedOriginal;
};

export const getFromPath = (row, accessor = '') => {
  const pathArr = accessor?.split('.');
  let clone = { ...row };

  let current = 0;
  while (pathArr[current] && current < pathArr.length - 1) {
    clone = clone[pathArr[current++]];
  }
  return clone?.[pathArr?.[current]] || '';
};


export const  getArrowCoordinates=(rect1, rect2, childN=1, totalChildren=1) =>{
  // rect1 is parent so default-> default side for arrow start will be right mid (on partioning it will mid of partition)
  // rect2 -> default side for arrow will be left mid (parent will be one)

  // all cordinates are clock-wise

  const eachSubChildArrowSpace = rect1.height / totalChildren;

  return {
    p1: {
      x: rect1.x + rect1.width,
      y: rect1.y + eachSubChildArrowSpace / 2 + eachSubChildArrowSpace * (childN - 1),
    },
    p2: {
      x: rect2.x,
      y: rect2.y + rect2.height / 2,
    },
  };
}