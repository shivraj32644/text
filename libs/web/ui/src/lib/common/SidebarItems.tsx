import { useRouter } from 'next/router';
import Link from 'next/link';
import type { ComponentPropsWithRef, ElementType } from 'react';
import classNames from 'classnames';
import { Disclosure } from '@headlessui/react';
import { ChevronCircleArrowIcon } from '../../icons';

interface SidebarLink {
  name: string;
  icon: ElementType<ComponentPropsWithRef<'svg'>>;
  link: string;
  items?: never;
}

interface SidebarMenu {
  name: string;
  icon: ElementType<ComponentPropsWithRef<'svg'>>;
  items: { name: string; link: string }[];
  link?: never;
}

export type SidebarItem = SidebarLink | SidebarMenu;

export function SidebarItems({
  sidebarItems,
}: {
  sidebarItems: SidebarItem[];
}) {
  const router = useRouter();

  const checkIfLinkActive = (link: string) => {
    if (link === '/') {
      return router.pathname === '/';
    }

    return router.pathname.startsWith(link);
  };

  return (
    <div className="SidebarContent">
      {sidebarItems.map((item) => {
        const Icon = item.icon;

        if (item.items) {
          return (
            <Disclosure
              defaultOpen
              className="border-b border-[#4D4D4D] last:border-none pb-3"
              as="div"
              key={item.name}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full p-3 2xl:p-5 pb-2 hover:text-brand focus:outline-none">
                    <Icon className="inline-block mr-2" />
                    <span className="flex-grow text-left">{item.name}</span>
                    <span
                      className={classNames(
                        'px-2 rounded-full  transition-transform',
                        open ? '-rotate-180' : ''
                      )}
                    >
                      <ChevronCircleArrowIcon className="w-5 h-5" />
                    </span>
                  </Disclosure.Button>

                  <Disclosure.Panel>
                    {item.items.map((subItem) => (
                      <Link key={subItem.name} href={subItem.link}>
                        <a
                          className={classNames(
                            'block p-2 pl-6 2xl:pl-12',
                            checkIfLinkActive(subItem.link) && 'text-brand'
                          )}
                        >
                          {subItem.name}
                        </a>
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        }

        return (
          <Link key={item.name} href={item.link}>
            <a
              className={classNames(
                'block border-b border-[#4D4D4D] p-3 2xl:p-5 last:border-none focus:outline-none',
                checkIfLinkActive(item.link) && 'text-brand'
              )}
            >
              <Icon className="mr-2 inline-block" />

              {item.name}
            </a>
          </Link>
        );
      })}
    </div>
  );
}
