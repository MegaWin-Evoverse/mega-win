import Link from 'next/link';
import type { EditorJSBlock } from '../model/types';

interface Props {
  blocks: EditorJSBlock[];
}

const ALIGNMENT_CLASSES: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const FLEX_ALIGNMENT_CLASSES: Record<string, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const HEADER_SIZE_CLASSES: Record<number, string> = {
  1: 'text-3xl font-bold',
  2: 'text-2xl font-bold',
  3: 'text-xl font-bold',
  4: 'text-lg font-semibold',
  5: 'text-base font-semibold',
  6: 'text-sm font-semibold',
};

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export function RewardContentRenderer({ blocks }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block) => {
        const alignment = block.tunes?.alignmentTune?.alignment ?? 'left';
        const alignClass = ALIGNMENT_CLASSES[alignment] ?? ALIGNMENT_CLASSES.left;

        if (block.type === 'paragraph') {
          return (
            <p
              key={block.id}
              className={`text-base text-brand-text-light leading-6 ${alignClass}`}
              dangerouslySetInnerHTML={{ __html: block.data.text }}
            />
          );
        }

        if (block.type === 'header') {
          const Tag = HEADING_TAGS[block.data.level - 1] ?? 'h4';
          const sizeClass = HEADER_SIZE_CLASSES[block.data.level] ?? HEADER_SIZE_CLASSES[4];
          return (
            <Tag
              key={block.id}
              className={`${sizeClass} text-brand-text-white ${alignClass}`}
              dangerouslySetInnerHTML={{ __html: block.data.text }}
            />
          );
        }

        if (block.type === 'list') {
          const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
          const listStyleClass = block.data.style === 'ordered' ? 'list-decimal' : 'list-disc';
          return (
            <ListTag
              key={block.id}
              className={`${listStyleClass} pl-5 flex flex-col gap-1.5 ${alignClass}`}
            >
              {block.data.items.map((item, idx) => (
                <li
                  key={idx}
                  className="text-base text-brand-text-light leading-6"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              ))}
            </ListTag>
          );
        }

        if (block.type === 'actionButton') {
          const flexAlign = FLEX_ALIGNMENT_CLASSES[alignment] ?? FLEX_ALIGNMENT_CLASSES.left;
          return (
            <div key={block.id} className={`flex ${flexAlign}`}>
              <Link
                href={block.data.url}
                target={block.data.openInNewTab ? '_blank' : undefined}
                rel={block.data.openInNewTab ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-gradient-to-b from-brand-green-from to-brand-green-to text-brand-dark font-outfit font-medium text-base leading-5 hover:brightness-105 active:brightness-95 transition-all"
              >
                {block.data.label}
              </Link>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
