import { ApiActions } from './api.enums';

type actionsMap = {
  targets: string[];
  actions: string[];
};

export const actionsMaps: actionsMap[] = [
  {
    targets: ['HEADER', 'FOOTER', 'SECTION'],
    actions: [ApiActions.REGENERATE, ApiActions.DELETE],
  },
  {
    targets: [
      'SPAN',
      'P',
      'A',
      'LI',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'BLOCKQUOTE',
      'BUTTON'
    ],
    actions: [ApiActions.EDIT, ApiActions.DELETE],
  },
  {
    targets: ['IMG', 'SVG'],
    actions: [ApiActions.UPLOAD, ApiActions.DELETE],
  },
];
