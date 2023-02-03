/* eslint-disable react/no-children-prop */
import { normalizeCmsImage } from '@corpcare/shared/api';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IContactUsCards } from '../../types/block';

export function ContactUsCards({ data }: { data: IContactUsCards }) {
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
        className="relative container 
                  mx-auto 
                  flex flex-col lg:flex-row justify-center 
                  gap-5 lg:gap-10 
                  lg:p-10 p-5"
      >
        {data?.cards?.map((card, index) => {
          const image = normalizeCmsImage(card?.image);
          return (
            <div
              key={index}
              className="flex flex-col lg:min-w-[21.875rem] w-full
                        justify-end
                        text-center
                        "
            >
              <div className="flex justify-center relative -bottom-8 lg:-bottom-[12%]">
                <div className="bg-brand p-4 rounded-lg">
                  <img
                    src={image?.url}
                    alt={image?.alternativeText}
                    className="lg:w-[45px] lg:h-[45px] w-8 h-8"
                  />
                </div>
              </div>

              <div
                className="min-h-[12.1875rem] lg:min-h-[13.4375rem] flex flex-col justify-end
                        text-center  border border-brand rounded-md py-6"
              >
                <h2 className="text-xl lg:text-2xl">{card?.heading}</h2>
                <div className="markdown-body !bg-white">
                  <ReactMarkdown
                    className="text-lg lg:text-[1.25rem] text-[#555555] mt-5"
                    children={card?.content as string}
                    remarkPlugins={[remarkGfm]}
                    linkTarget="_blank"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
