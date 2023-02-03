import {
  type SidebarItem,
  DashboardIcon,
  ClientsAvatar,
  ApprovalBookIcon,
  MutualFundsIcon,
  // MutualFundsIcon,
  // FixedDepositIcon,
  // MoreIcon,
  // BulbIcon,
} from '@corpcare/web/ui';

export const sidebarItems: SidebarItem[] = [
  // { name: 'Dashboard', icon: DashboardIcon, link: '/' },
  { name: 'Clients', icon: ClientsAvatar, link: '/clients' },
  // { name: 'Approval Book', icon: ApprovalBookIcon, link: '/approval' },

  {
    name: 'Mutual Funds',
    icon: MutualFundsIcon,
    items: [
      { name: 'All MFs', link: '/mutual-funds/all' },
      { name: 'Orders', link: '/mutual-funds/orders' },
      { name: 'Cart', link: '/mutual-funds/cart' },
    ],
  },
  // {
  //   name: 'Fixed Deposits',
  //   icon: FixedDepositIcon,
  //   items: [
  //     { name: 'About', link: '/fixed-deposits/about' },
  //     { name: 'All FDs', link: '/fixed-deposits/all' },
  //     { name: 'FD Calculator', link: '/fixed-deposits/orders' },
  //   ],
  // },
  // { name: 'Others', icon: MoreIcon, link: '/others' },
  // { name: 'Insights', icon: BulbIcon, link: '/insights' },
];
