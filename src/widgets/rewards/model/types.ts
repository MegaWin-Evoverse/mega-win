export interface Reward {
  id: string;
  title: string;
  shortDescription: string;
  photoUrl: string;
  endDate: string;
}

export interface RewardsPage {
  take: number;
  page: number;
  total: number;
  totalPages: number;
  data: Reward[];
}

export type RewardSort = 'createdAtDesc' | 'createdAtAsc' | 'endingSoon';

interface EditorJSTune {
  alignmentTune?: { alignment: 'left' | 'center' | 'right' };
}

interface EditorJSListItem {
  meta: Record<string, unknown>;
  items: EditorJSListItem[];
  content: string;
}

interface ParagraphBlockData {
  text: string;
}

interface HeaderBlockData {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

interface ListBlockData {
  meta: Record<string, unknown>;
  items: EditorJSListItem[];
  style: 'ordered' | 'unordered';
}

interface ActionButtonBlockData {
  url: string;
  label: string;
  openInNewTab: boolean;
}

interface ParagraphBlock {
  id: string;
  type: 'paragraph';
  data: ParagraphBlockData;
  tunes?: EditorJSTune;
}

interface HeaderBlock {
  id: string;
  type: 'header';
  data: HeaderBlockData;
  tunes?: EditorJSTune;
}

interface ListBlock {
  id: string;
  type: 'list';
  data: ListBlockData;
  tunes?: EditorJSTune;
}

interface ActionButtonBlock {
  id: string;
  type: 'actionButton';
  data: ActionButtonBlockData;
  tunes?: EditorJSTune;
}

export type EditorJSBlock = ParagraphBlock | HeaderBlock | ListBlock | ActionButtonBlock;

export interface EditorJSContent {
  time: number;
  blocks: EditorJSBlock[];
  version: string;
}

export interface RewardDetail extends Reward {
  content: EditorJSContent;
}
