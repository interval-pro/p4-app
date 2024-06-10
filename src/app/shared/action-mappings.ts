type actionMappings = {
  [key: string]: {
    targets: string[];
    actions: string[];
  };
};

export const actionMappings: actionMappings = {
  section: {
    targets: ['HEADER', 'FOOTER', 'SECTION'],
    actions: ['Regenerate', 'Delete'],
  },
  list: {
    targets: ['UL', 'OL'],
    actions: ['Regenerate List'],
  },
  text: {
    targets: ['SPAN', 'P', 'A', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    actions: ['Regenerate Text', 'Inline Edit', 'Delete'],
  },
  image: {
    targets: ['IMG', 'SVG'],
    actions: ['Regenerate Image', 'Upload Image', 'Delete'],
  },
};
