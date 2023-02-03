import {
  CrossIcon,
  RoundErrorCircleIcon,
  RoundSuccessCircleIcon,
} from '@corpcare/web/ui';
import toast, { Toast } from 'react-hot-toast';

export function CustomToast({
  t,
  type,
  message,
  description,
}: {
  t?: Toast;
  type?: 'success' | 'error';
  message?: string;
  description?: string;
}) {
  return (
    <div
      className={`max-w-md w-full bg-white shadow-lg rounded-md pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 pt-0.5">
            {type === 'success' ? (
              <RoundSuccessCircleIcon className="text-[#41B957] w-6 h-6 flex-shrink-0" />
            ) : (
              <RoundErrorCircleIcon className="text-[#e50914] w-6 h-6 flex-shrink-0" />
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-base font-medium text-[#191919] tracking-[0.02em]">
              {message}
            </p>
            <p className="mt-1 text-sm text-lightGray tracking-[0.02em]">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          className="text-black inline-block p-2"
          onClick={() => toast.remove(t?.id)}
        >
          <CrossIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
