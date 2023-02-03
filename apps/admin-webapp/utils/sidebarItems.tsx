import {
  type SidebarItem,
  DashboardIcon,
  MoreIcon,
  ClientsAvatar,
  // BulbIcon,
} from '@corpcare/web/ui';

export const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: DashboardIcon, link: '/' },
  // { name: 'Order Requests', icon: MoreIcon, link: '/order-requests' },
  { name: 'Clients', icon: ClientsAvatar, link: '/clients' },
  {
    name: 'Internal Users',
    icon: MoreIcon,
    items: [
      // { name: 'Ops Managers', link: '/ops-managers' },
      {
        name: 'Relationship Managers',
        link: '/relationship-managers',
      },
      // { name: 'MIS Analysts', link: '/mis-analysts' },
    ],
  },
  // {
  //   name: 'Products',
  //   icon: MoreIcon,
  //   items: [
  //     { name: 'Mutual Funds', link: '/mutual-funds' },
  //     { name: 'Fixed Deposits', link: '/fixed-deposits' },
  //     { name: 'Bonds', link: '/bonds' },
  //     { name: 'AIFs', link: '/aifs' },
  //     { name: 'PMS', link: '/pms' },
  //   ],
  // },
  // { name: 'Insights', icon: BulbIcon, link: '/insights' },
];
