import { type ReactNode } from 'react';
import {
  BalanceIcon,
  HamburgerMenuIcon,
  NotificationIcon,
  WatchListIcon,
} from '@corpcare/web/ui';
import { useGlobalSideBarContext } from './useGlobalSideBarContext';

export function DashboardHead({ children }: { children: ReactNode }) {
  const { showSidebar } = useGlobalSideBarContext();

  return (
    <div className="DashboardHead w-full">
      <div
        className="flex-grow flex gap-3 items-center"
        style={{
          flex: '1 1 100%',
          minWidth: 0,
        }}
      >
        <HamburgerMenuIcon
          className="lg:hidden block min-w-[32px] min-h-[32px] text-brand hover:cursor-pointer"
          onClick={showSidebar}
        />
        <div className="flex flex-col text-xs lg:text-base truncate">
          {children}
        </div>
      </div>

      <div className="flex opacity-30 pointer-events-none">
        <a
          title="Watchlist"
          className="OutlineButton p-2 mr-3"
          href="/watchlist"
        >
          <WatchListIcon className="w-4 h-4" />
        </a>

        <a title="Compare" className="OutlineButton p-2 mr-3 " href="/compare">
          <BalanceIcon className="w-4 h-4 " />
        </a>

        <a
          title="Notifications"
          className="OutlineButton p-2"
          href="/notifications"
        >
          <NotificationIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
