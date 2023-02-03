import { normalizeCmsImage } from '@corpcare/shared/api';
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import Link from 'next/link';
import { Fragment } from 'react';
import { Url } from 'url';
import { IFooter } from '../../types/global';

export function Footer({ footer }: { footer: IFooter }) {
  const footerImage = normalizeCmsImage(footer?.footerImage);

  return (
    <footer className="bg-[#191919]" style={{ margin: 0 }}>
      <div className="flex flex-col">
        <section className="lg:flex justify-between flex-wrap container mx-auto hidden lg:p-10 p-5">
          {footer?.footerColumns?.map((item, index) => {
            return (
              <div key={index} className="space-y-5">
                <h1 className="text-lg text-white tracking-[0.02em] font-normal leading-7 overflow-hidden after:h-[2px] after:bg-white after:flex after:relative after:w-6 after:right-0">
                  {item?.title}
                </h1>
                <div className="flex flex-col item-center justify-between flex-wrap max-w-[260px] gap-3">
                  {item?.links?.map((link, index) => {
                    const icon = !link?.linkImage?.data
                      ? null
                      : normalizeCmsImage(link?.linkImage);
                    return (
                      <div key={index} className="flex items-start gap-3">
                        {!!link?.linkImage?.data && (
                          <img
                            src={icon?.url}
                            alt={icon?.alternativeText}
                            className="flex-shrink-0"
                          />
                        )}
                        <Link
                          href={
                            link?.isExternal
                              ? (link?.href as Url)
                              : `${link?.href}`
                          }
                        >
                          <a
                            target={link?.target}
                            className="text-base text-[#CCCCCC] tracking-[0.02em] font-normal leading-6"
                          >
                            {link?.label}
                          </a>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
        <section className="lg:hidden flex flex-col justify-between flex-wrap lg:p-10 p-5 container mx-auto gap-6">
          {footer?.footerColumns?.map((item, index) => {
            return (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center">
                      <h1 className="text-lg text-white tracking-[0.02em] font-normal leading-7 overflow-hidden after:h-[2px] after:bg-white after:flex after:relative after:w-6 after:right-0">
                        {item?.title}
                      </h1>
                      <span
                        className={classNames(
                          'px-2 rounded-full  transition-transform',
                          open ? '-rotate-180' : ''
                        )}
                      >
                        <ChevronCircleArrowIcon className="w-5 h-5 text-white" />
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col">
                      <div className="flex flex-col item-center justify-between flex-wrap max-w-[260px] gap-3">
                        {item?.links?.map((link, index) => {
                          const icon = !link?.linkImage?.data
                            ? null
                            : normalizeCmsImage(link?.linkImage);
                          return (
                            <div key={index} className="flex items-start gap-3">
                              {!!link?.linkImage?.data && (
                                <img
                                  src={icon?.url}
                                  alt={icon?.alternativeText}
                                  className="flex-shrink-0"
                                />
                              )}
                              <Link
                                href={
                                  link?.isExternal
                                    ? (link?.href as Url)
                                    : `${link?.href}`
                                }
                              >
                                <a
                                  target={link?.target}
                                  className="text-sm lg:text-base text-[#CCCCCC] tracking-[0.02em] font-normal lg:leading-6"
                                >
                                  {link?.label}
                                </a>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          })}
        </section>
        <section
          style={{
            boxShadow:
              '0px -1px 0px rgba(241, 236, 229, 0.2), 0px 1px 0px rgba(241, 236, 229, 0.2)',
          }}
        >
          <div className="flex justify-between mx-auto container py-5 px-5 lg:px-10">
            <div className="flex justify-start flex-1">
              <Link href="/">
                <a>
                  <img
                    className="h-5 lg:h-9 w-auto"
                    src={footerImage?.url}
                    alt={footerImage?.alternativeText}
                  />
                </a>
              </Link>
            </div>
            <div className="flex justify-between gap-6">
              {footer?.socialNetworks?.map((item, index) => {
                const socialImage = normalizeCmsImage(item?.socialImage);
                return (
                  <Link key={index} href={item?.url as string}>
                    <a target="_blank">
                      <img
                        className="h-5 lg:h-8 w-auto"
                        src={socialImage?.url}
                        alt={socialImage?.alternativeText}
                      />
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
        <section className="flex lg:flex-row flex-col justify-between pt-5 lg:py-5 container mx-auto gap-3 lg:items-start items-center lg:px-10 px-5">
          <p className="text-base font-normal tracking-[0.02em] leading-6 text-[#CCCCCC]">
            {footer?.footerLabel}
          </p>
          <div className="flex justify-between gap-6 lg:gap-[42px] flex-wrap">
            {footer?.footerBottomLinks?.map((item, index) => (
              <Link
                href={item?.isExternal ? (item?.href as Url) : `${item?.href}`}
                key={index}
              >
                <a
                  target={item?.target}
                  className="text-base font-normal tracking-[0.02em] leading-6 text-[#CCCCCC]"
                >
                  {item?.label}
                </a>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
}
