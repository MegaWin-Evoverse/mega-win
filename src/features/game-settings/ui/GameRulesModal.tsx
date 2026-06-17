'use client';
import { FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';
import { type Game } from '@/entities/game';
import { GAME_RULES, GAME_SETTINGS_LABELS } from '../model/constants';

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  game: Game;
}

export function GameRulesModal({ isOpen, onOpenChange, game }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-[calc(100%-2rem)] sm:max-w-[560px] bg-bg-primary border border-border-control/40 p-6 text-brand-text-white shadow-2xl rounded-2xl">
        <div className="flex items-center gap-2 pb-4 border-b border-border/10">
          <FileText className="w-5 h-5 text-brand-text-white" />
          <DialogTitle className="font-outfit font-bold text-base text-brand-text-white tracking-wide">
            {GAME_SETTINGS_LABELS.gameRules}
          </DialogTitle>
        </div>
        <div className="flex flex-col gap-4 mt-4 max-h-[70vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border-default [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-border-control">
          {GAME_RULES[game].map((rule, idx) => (
            <div key={idx} className="flex flex-col gap-1.5">
              <div className="flex items-start gap-2">
                <span className="font-outfit font-bold text-sm text-brand-text-white shrink-0 min-w-[18px]">
                  {idx + 1}.
                </span>
                <span className="font-outfit text-sm text-brand-text-light leading-relaxed">
                  {rule.text}
                </span>
              </div>
              {rule.subBullets && (
                <div className="flex flex-col gap-2 pl-6 pt-1">
                  {rule.subBullets.map((bullet, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2">
                      <span className="text-brand-green-to shrink-0 text-sm leading-relaxed">
                        •
                      </span>
                      <span className="font-outfit text-sm text-brand-text-light leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
