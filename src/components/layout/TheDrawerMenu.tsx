import BellIcon from '@/assets/svgs/bell.svg';
import MessageIcon from '@/assets/svgs/message.svg';
import SearchIcon from '@/assets/svgs/search.svg';
import { cn } from '@/lib';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import BaseDrawer from '../base/BaseDrawer';
import { Input } from '../ui';

interface IProps {
  drawerOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isRouteActive: (pathname: string, href: string) => boolean;
  userSection?: React.ReactNode;
  menuItem: any;
}

export default function TheDrawerMenu({
  drawerOpen,
  menuItem,
  userSection,
  onOpenChange,
  isRouteActive,
}: IProps) {
  const pathName = usePathname();

  return (
    <BaseDrawer open={drawerOpen} onOpenChange={onOpenChange} side="right">
      <div className="flex flex-col h-full">
        <div className="border-b border-gray-200 pb-5">
          <div className="relative">
            <Input
              className="pl-10 bg-gray-50 border-gray-200"
              placeholder="Tìm kiếm..."
            />
            <Image
              alt="search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              src={SearchIcon}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {menuItem.map((item: any) => {
            const active = isRouteActive(pathName, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors',
                  active
                    ? 'bg-primary-50 text-primary'
                    : 'text-gray-700 hover:bg-gray-100',
                )}
                onClick={() => onOpenChange(false)}
              >
                <Image
                  src={active ? item.iconActive : item.icon}
                  alt={item.label}
                  className="w-5 h-5"
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-4 border-t pt-2">
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Image src={BellIcon} alt="bell" className="w-5 h-5" />
              <span className="font-medium">Thông báo</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-3 mx-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Image src={MessageIcon} alt="message" className="w-5 h-5" />
              <span className="font-medium">Tin nhắn</span>
            </Link>
          </div>
        </div>

        {userSection}
      </div>
    </BaseDrawer>
  );
}
