'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, LogOut, User as UserIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import type { User } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { USER_MENU_ITEMS, LOGOUT_LABEL } from '../model/constants';

const PROFILE_LABEL = 'Profile';

interface Props {
  user: User;
  onLogout: () => void;
  isLoggingOut: boolean;
}

export function UserMenu({ user, onLogout, isLoggingOut }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1.5 outline-none cursor-pointer hover:bg-muted/50">
        <Avatar>
          <AvatarImage src={user.profileImgUrl} alt={user.username} />
          <AvatarFallback>{user.username[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>

        <span className="text-sm font-medium">{user.email}</span>

        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <Link href={ROUTES.PROFILE} className="flex w-full items-center gap-3">
            <UserIcon className="size-4" />
            {PROFILE_LABEL}
          </Link>
        </DropdownMenuItem>
        {USER_MENU_ITEMS.map((item) => (
          <DropdownMenuItem key={item.label}>
            <Link href={item.href} className="flex w-full items-center gap-3">
              <item.icon className="size-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Button
            variant="ghost"
            size="none"
            className="flex w-full items-center justify-start gap-3 px-0 py-0 h-auto text-sm font-normal"
            onClick={onLogout}
            disabled={isLoggingOut}
            aria-label={LOGOUT_LABEL}
          >
            <LogOut className="size-4" />
            {LOGOUT_LABEL}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
