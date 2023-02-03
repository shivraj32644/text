import { useGetWebinar } from '@corpcare/shared/api';
import { StayTuned } from '../../components/blocks/StayTuned';

import { Hero } from '../../components/blocks/Hero';
import { Layout } from '../../components/blocks/Layout';
import { WebinarsCard } from '../../components/blocks/WebinarsCard';
import { useState } from 'react';

const Webinars = ({ global }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [previousPageNumber, setPreviousPageNumber] = useState<number>(1);
  const { data } = useGetWebinar(pageNumber, previousPageNumber);
  return (
    <Layout global={global} seo={data?.blocks?.seo}>
      <Hero data={data?.blocks?.Hero} />
      <WebinarsCard
        data={data?.blocks?.upcomingWebinars}
        pagination={data?.upcomingPagination}
        webinars={data?.upcomingWebinars}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
      <StayTuned data={data?.blocks?.stayTuned} />
      <WebinarsCard
        data={data?.blocks?.previousWebinars}
        pagination={data?.previousPagination}
        webinars={data?.previousWebinars}
        setPageNumber={setPreviousPageNumber}
        pageNumber={previousPageNumber}
      />
    </Layout>
  );
};

export default Webinars;
