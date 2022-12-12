const drawArrow = nodes => {
  const arrowArr = [];

  const drawEach = node => {
    node.children?.forEach((each, ind) => {
      arrowArr.push(getArrowCoordinates(node, each, ind + 1, node.children.length));
      drawEach(each);
    });
  };

  nodes.forEach((node, ind) => drawEach(node));
  return arrowArr;
};

function getArrowCoordinates(rect1, rect2, childN, totalChildren) {
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

export default drawArrow;
