'use client';
import { Headset } from 'lucide-react';
import { Card } from '@/shared/ui/card';
import { SUPPORT_LABELS, SUPPORT_CONTACTS, SUPPORT_CONTACT_ICONS } from '../model/constants';

export function Support() {
  return (
    <div className="flex flex-col gap-8">
      <Card variant="profile" className="flex items-center gap-4 p-4 md:p-8">
        <div className="flex size-[60px] md:size-[90px] items-center justify-center rounded-xl bg-bg-primary flex-shrink-0">
          <Headset className="size-7 md:size-10 text-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xl md:text-2xl font-bold text-foreground">
            {SUPPORT_LABELS.TITLE}
          </span>
          <span className="text-sm md:text-base text-text-secondary">
            {SUPPORT_LABELS.SUBTITLE}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-brand-green-to">
            <span className="size-2 rounded-full bg-brand-green-to animate-pulse" />
            {SUPPORT_LABELS.RESPONSE_NOTE}
          </span>
        </div>
      </Card>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-foreground">{SUPPORT_LABELS.CONTACT_TITLE}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SUPPORT_CONTACTS.map((contact) => {
            const Icon = SUPPORT_CONTACT_ICONS[contact.method];
            return (
              <Card
                key={contact.method}
                variant="profile"
                className="flex flex-col gap-2 px-4 py-4"
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-text-secondary flex-shrink-0" />
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {contact.method}
                  </span>
                </div>
                <span className="text-sm font-medium text-foreground">{contact.value}</span>
                <span className="text-sm text-text-secondary leading-relaxed">
                  {contact.description}
                </span>
                <span className="text-xs text-muted-foreground mt-auto">{contact.available}</span>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
