import { IOrderItems } from '@corpcare/shared/api';
import Link from 'next/link';

export function MutualFundOrderCard(order: IOrderItems) {
  const data = [
    {
      name: 'CAN No.',
      value: order?.can_number,
    },
    {
      name: 'CAN Holder',
      value: order?.can_holder_name,
    },
    {
      name: 'Txn.Type',
      value: order?.txn_type,
    },
    {
      name: 'Order Mode',
      value: order?.order_mode,
    },
    {
      name: 'Request Date',
      value: order?.completed_at !== null ? order?.completed_at : '-----',
    },
    {
      name: 'Order Date',
      value: order?.created_at,
    },
  ];

  return (
    <div className="Card p-0 overflow-hidden">
      <h4 className="bg-lighter px-5 lg:px-10 py-3 text-darkGray text-base lg:text-lg border-b tracking-[0.02em]">
        #{order?.order_number}
      </h4>

      <div className="grid grid-cols-2 bg-brandLight">
        {data?.map((item) => {
          return (
            <div
              key={item?.name}
              className="px-5 lg:px-10 py-5 bg-white even:border-l border-b"
            >
              <div className="mb-1 text-lightGray lg:text-sm text-xs  tracking-[0.02em] font-normal">
                {item?.name}
              </div>
              <div className="lg:text-sm text-xs  tracking-[0.02em] font-normal text-[#191919]">
                {Date.parse(item?.value as string) > 0
                  ? (new Date(new Date(item?.value as Date)).toLocaleString(
                      'en-CA',
                      {
                        timeZone: 'Asia/Kolkata',
                      }
                    ) as any)
                  : item?.value}
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 lg:px-10 py-5 bg-lighter uppercase text-center">
        <Link href={`/mutual-funds/orders/${order?.id}`}>
          <a className="Button w-full">View order details</a>
        </Link>
      </div>
    </div>
  );
}
