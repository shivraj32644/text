/* eslint-disable react/no-children-prop */
import { normalizeCmsImage } from '@corpcare/shared/api';
import { ChevronCircleArrowIcon } from '@corpcare/web/ui';
import classNames from 'classnames';
import { NextRouter, useRouter } from 'next/router';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IJoinOurTeam } from '../../types/block';
import JoinUsModal from '../shared/JoinUsModal';

export function JoinOurTeam({ data }: { data: IJoinOurTeam }) {
  const router = useRouter() as NextRouter;

  const [openedIndex, setOpenedIndex] = useState(
    Array(data?.positions?.length).fill(false)
  );
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white relative">
      {data?.miscellaneousFigure?.map((item, index) => {
        const figure = normalizeCmsImage(item?.figure);

        return (
          <div
            key={index}
            className={classNames(
              'absolute',
              item?.alignment === 'Top-Left' && 'top-0 left-0',
              item?.alignment === 'Top-Right' && 'top-0 right-0',
              item?.alignment === 'Bottom-Left' && 'bottom-0 left-0',
              item?.alignment === 'Bottom-Right' && 'bottom-0 right-0',
              item?.alignment === 'Center-Left' && 'bottom-1/2 left-0',
              item?.alignment === 'Center-Right' && 'bottom-1/2 right-0'
            )}
          >
            <img
              src={figure?.url}
              alt={figure?.alternativeText}
              className="object-cover w-auto h-auto"
            />
          </div>
        );
      })}
      <div
        className="container mx-auto p-5 lg:p-10
    flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <h2
            className="font-medium text-lg lg:text-xl tracking-[0.02em] text-brand uppercase text-left overflow-hidden before:h-[2px] after:h-[2px] after:bg-brand 
           after:inline-block after:relative after:align-middle after:w-6
           before:bg-brand before:inline-block before:relative before:align-middle 
           before:w-6 before:right-2 after:left-2 
           mb-2 lg:mb-4"
          >
            {data?.heading}
          </h2>
          <h2 className="text-[1.75rem] lg:text-[2rem] text-center mb-8 lg:mb-10">
            {data?.subheading}
          </h2>

          <div className="flex flex-col gap-y-10">
            {data?.positions?.map((position, index) => {
              return (
                <div
                  key={index}
                  className={classNames(
                    'border border-brand rounded-md p-4 lg:p-8 overflow-hidden',
                    openedIndex[index]
                      ? 'h-[6.75rem] lg:h-[6.5625rem] '
                      : 'h-full'
                  )}
                >
                  <div
                    className="flex justify-between h-[6.75rem] lg:h-[6.5625rem] cursor-pointer"
                    onClick={() =>
                      setOpenedIndex((p) => {
                        const _new = [...p];
                        _new[index] = !p[index];
                        return _new;
                      })
                    }
                  >
                    <h2 className="text-2xl lg:text-[1.75rem] tracking-[0.02em] font-medium">
                      {position?.role}
                    </h2>
                    <span
                      className={classNames(
                        'h-fit px-2 rounded-full  transition-transform',
                        openedIndex[index] ? '-rotate-180' : ''
                      )}
                    >
                      <ChevronCircleArrowIcon className="lg:w-6 lg:h-6 w-5 h-5" />
                    </span>
                  </div>

                  <div className="markdown-body !bg-white">
                    <ReactMarkdown
                      className="text-sm lg:text-base tracking-[0.02em] text-[#555555] "
                      children={position?.description as string}
                      remarkPlugins={[remarkGfm]}
                      linkTarget="_blank"
                    />
                  </div>
                  <button
                    className={classNames(
                      'w-44',
                      position?.applyLink?.theme === 'primary' && 'Button',
                      position?.applyLink?.theme === 'secondary' &&
                        'OutlineButton'
                    )}
                    onClick={() => setIsOpen(true)}
                  >
                    {position?.applyLink?.label}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <JoinUsModal closeModal={() => setIsOpen(false)} isOpen={isOpen} />
    </div>
  );
}
