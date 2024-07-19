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
    targets: ['UL', 'OL'],
    actions: [ApiActions.REGENERATE],
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
    ],
    actions: [ApiActions.REGENERATE, ApiActions.EDIT, ApiActions.DELETE],
  },
  {
    targets: ['IMG', 'SVG'],
    actions: [ApiActions.REGENERATE, ApiActions.UPLOAD, ApiActions.DELETE],
  },
];
