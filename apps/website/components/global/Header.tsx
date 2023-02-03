import { createRef, Fragment, useEffect, useMemo, useState } from 'react';
import { Popover, Transition, Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import { ChevronIcon, CrossIcon, HamburgerMenuIcon } from '@corpcare/web/ui';
import { normalizeCmsImage } from '@corpcare/shared/api';
import { IHeader } from '../../types/global';
import Link from 'next/link';
import { Url } from 'url';
import { NextRouter, useRouter } from 'next/router';

export default function Header({ header }: { header: IHeader }) {
  // const { data } = useGetHeaderDetails();
  const headerImage = normalizeCmsImage(header?.companyLogo);
  const router = useRouter() as NextRouter;
  const [opacity, setOpacity] = useState<100 | 90>(100);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setOpacity(90);
      } else {
        setOpacity(100);
      }
    });
  });

  const refs = useMemo(() => {
    return (
      header?.headerMenuList?.map(() => {
        return createRef<HTMLButtonElement>();
      }) ?? []
    );
  }, [header?.headerMenuList]);

  function handleClosingOthers(id?: number) {
    const otherRefs = refs.filter((ref) => {
      return ref.current?.getAttribute('data-id') !== id;
    });

    otherRefs.forEach((ref) => {
      const isOpen = ref.current?.getAttribute('data-open') === 'true';

      if (isOpen) {
        ref.current?.click();
      }
    });
  }
  return (
    <Popover
      className={classNames(
        `bg-[#191919] sticky top-0 z-40 shadow-lg backdrop-blur-md`,
        opacity === 90 && 'opacity-90',
        opacity === 100 && 'opacity-100'
      )}
      style={{ boxShadow: '0px 100px 100px rgba(0, 0, 0, 0.08)' }}
    >
      <div className="mx-auto container px-5 lg:px-10">
        <div className="flex items-center justify-between py-6 lg:justify-start lg:space-x-10">
          <div className="flex justify-start flex-1">
            <Link href="/">
              <a>
                <img
                  className="h-5 lg:h-8 w-auto"
                  src={headerImage?.url}
                  alt={headerImage?.alternativeText}
                />
              </a>
            </Link>
          </div>
          <div className="-my-2 -mr-2 lg:hidden ">
            <Popover.Button className="flex">
              <HamburgerMenuIcon className="w-8 h-8 text-white hover:cursor-pointer flex-shrink-0" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 lg:flex">
            {header?.headerMenuList?.map((item, index) => (
              <Popover className="relative" key={index}>
                {({ open, close }) => (
                  <>
                    <Popover.Button
                      className={classNames(
                        open ? 'text-brand' : 'text-white',
                        'font-normal text-base tracking-[0.02em] uppercase flex items-center'
                      )}
                    >
                      <span>{item?.heading}</span>
                      <ChevronIcon
                        className={classNames(
                          open ? 'text-brand rotate-180' : 'text-white',
                          'ml-2 h-3 w-3 group-hover:text-brand transition-transform'
                        )}
                      />
                    </Popover.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel
                        className={classNames(
                          'absolute z-40 -ml-4 mt-3 w-screen  transform px-2 lg:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-[90%]',
                          item?.headerMenuItem?.length === 2 &&
                            ' max-w-[597px]',
                          item?.headerMenuItem?.length === 1 && ' max-w-md'
                        )}
                      >
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div
                            className={classNames(
                              'relative lg:bg-white bg-[#191919]',
                              item?.headerMenuItem?.length === 2 &&
                                'grid grid-cols-2',
                              item?.headerMenuItem?.length === 1 &&
                                'grid grid-cols-1'
                            )}
                          >
                            {item?.headerMenuItem?.map((content, idx) => {
                              return (
                                <div
                                  key={idx}
                                  className="grid gap-6 px-5 py-6 lg:gap-8 lg:p-8 content-start"
                                >
                                  {content?.subHeading !== null && (
                                    <p className="text-base font-semibold lg:text-darkGray text-lighterGray tracking-[0.02em]">
                                      {content?.subHeading}
                                    </p>
                                  )}
                                  {content?.links?.map((_item, idx) => {
                                    const icon = _item?.linkImage?.data
                                      ? normalizeCmsImage(_item?.linkImage)
                                      : null;
                                    return (
                                      <a
                                        key={idx}
                                        target={_item?.target}
                                        className="-m-3 flex items-start rounded-lg p-3 hover:bg-light cursor-pointer"
                                        onClick={() => {
                                          router.push(
                                            _item?.isExternal
                                              ? (_item?.href as Url)
                                              : `${_item?.href}`
                                          );
                                          close();
                                        }}
                                      >
                                        <img
                                          src={icon?.url}
                                          alt={icon?.alternativeText}
                                          className="h-6 w-6 flex-shrink-0"
                                          aria-hidden="true"
                                        />
                                        <div className="ml-4">
                                          <p className="text-base font-medium lg:text-darkGray text-white tracking-[0.02em] uppercase">
                                            {_item?.label}
                                          </p>
                                        </div>
                                      </a>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            ))}
          </Popover.Group>
          <div className="ml-10 space-x-4 lg:block hidden">
            {header?.authButton?.map((item, index) => (
              <Link
                key={index}
                href={item?.isExternal ? (item?.href as Url) : `${item?.href}`}
              >
                <a
                  target={item?.target}
                  className={classNames(
                    'uppercase font-normal border-none',
                    item?.theme === 'primary' && 'Button',
                    item?.theme === 'secondary' && 'OutlineButton'
                  )}
                >
                  {item?.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform transition lg:hidden min-h-screen bg-[#191919] z-40"
        >
          {({ close: closeModal }) => (
            <div className="min-h-screen flex flex-col pb-16 pt-6 px-5 space-y-5">
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <Link href="/">
                    <a>
                      <img
                        className="h-5 lg:h-8 w-auto"
                        src={headerImage?.url}
                        alt={headerImage?.alternativeText}
                      />
                    </a>
                  </Link>

                  <Popover.Button className="Button bg-[#191919] text-white border border-white flex p-2">
                    <CrossIcon className="h-4 w-4 flex-shrink-0" />
                  </Popover.Button>
                </div>
                <div className="mt-6">
                  <div className="grid gap-y-8">
                    {header?.headerMenuList?.map((item, index) => (
                      <Disclosure key={index} as="div">
                        {({ open, close }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                open ? 'text-brand' : 'text-white',
                                'font-normal text-base tracking-[0.02em] uppercase flex items-center justify-between w-full'
                              )}
                              ref={refs[index]}
                              data-id={index}
                              data-open={open}
                              onClick={() => handleClosingOthers(index)}
                            >
                              <span>{item?.heading}</span>
                              <ChevronIcon
                                className={classNames(
                                  open ? 'text-brand rotate-180' : 'text-white',
                                  'ml-2 h-3 w-3 group-hover:text-brand transition-transform'
                                )}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                              <div className="relative grid gap-6 bg-[#191919] lg:gap-8 ">
                                {item?.headerMenuItem?.map((content) => {
                                  return (
                                    <>
                                      {content?.subHeading !== null && (
                                        <p className="text-base font-semibold text-lighterGray">
                                          {content?.subHeading}
                                        </p>
                                      )}
                                      {content?.links?.map((_item, idx) => {
                                        const icon = _item?.linkImage?.data
                                          ? normalizeCmsImage(_item?.linkImage)
                                          : null;
                                        return (
                                          <a
                                            target={_item?.target}
                                            key={idx}
                                            className="-m-3 flex items-start rounded-lg p-3 hover:bg-lightGray cursor-pointer"
                                            onClick={() => {
                                              router.push(
                                                _item?.isExternal
                                                  ? (_item?.href as Url)
                                                  : `${_item?.href}`
                                              );
                                              closeModal();
                                              close();
                                            }}
                                          >
                                            <img
                                              src={icon?.url}
                                              alt={icon?.alternativeText}
                                              className="h-6 w-6 flex-shrink-0"
                                              aria-hidden="true"
                                            />
                                            <div className="ml-4">
                                              <p className="text-base font-medium text-white">
                                                {_item?.label}
                                              </p>
                                            </div>
                                          </a>
                                        );
                                      })}
                                    </>
                                  );
                                })}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:hidden flex items-center justify-between gap-5">
                {header?.authButton?.map((item, index) => (
                  <Link
                    key={index}
                    href={
                      item?.isExternal ? (item?.href as Url) : `${item?.href}`
                    }
                  >
                    <a
                      target={item?.target}
                      className={classNames(
                        'uppercase font-normal border-none w-full text-center',
                        item?.theme === 'primary' && 'Button',
                        item?.theme === 'secondary' && 'OutlineButton'
                      )}
                    >
                      {item?.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
