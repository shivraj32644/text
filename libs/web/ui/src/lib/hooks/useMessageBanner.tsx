import classNames from 'classnames';
import { useState } from 'react';
import { RoundErrorCircleIcon, RoundSuccessCircleIcon } from '../../icons';

export function useMessageBanner() {
  const [messages, setMessages] = useState<
    {
      message: string;
      type: 'success' | 'error';
    }[]
  >([]);

  function showMessage(message: string, type: 'success' | 'error') {
    setMessages((prev) => [...prev, { message, type }]);
  }
  function removeMessage() {
    setMessages([]);
  }

  const Message = messages.length
    ? messages.map((message, i) => (
        <div
          key={`alert_message_${i}`}
          role="alert"
          className={classNames(
            'm-2 rounded-sm flex items-center justify-start px-3 py-5 gap-2 lg:gap-5',
            message.type === 'error' ? 'bg-[#e50914]' : '',
            message.type === 'success' ? ' bg-[#41B957] ' : ''
          )}
        >
          {message.type === 'success' ? (
            <RoundSuccessCircleIcon className="text-white w-6 h-6 flex-shrink-0" />
          ) : (
            <RoundErrorCircleIcon className="text-white w-6 h-6 flex-shrink-0" />
          )}
          <div
            className={classNames(
              'rounded capitalize text-center text-base lg:text-lg text-white font-bold'
            )}
          >
            {message.message}
          </div>
        </div>
      ))
    : null;

  return { showMessage, removeMessage, Message };
}
