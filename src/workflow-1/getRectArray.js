const getRectArray = nodes => {
  const rectangles = [];

  const findRect = (rect, path = '') => {
    if (rect.children?.length) {
      for (let i = rect.children.length - 1; i >= 0; ) {
        const frect = findRect(rect.children[i], `${path}${path ? '.' : ''}children.${i}`);
        if (frect) return frect;
        else --i;
      }
    }
  };

  for (let i = nodes.length - 1; i >= 0; ) {
    const frect = findRect(nodes[i], `${i}`);
    if (frect) return frect;
    else --i;
  }
};
