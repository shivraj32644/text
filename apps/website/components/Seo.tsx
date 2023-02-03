import { normalizeCmsImage } from '@corpcare/shared/api';
import Head from 'next/head';

const Seo = ({ seo }) => {
  const metaImage = normalizeCmsImage(seo?.metaImage);
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
      />
      <title>{seo?.metaTitle}</title>
      <meta
        name="description"
        content={seo?.metaDescription}
        key="description"
      />
      <meta property="og:url" content={'url'} key="og:url" />
      <meta property="og:title" content={seo?.metaTitle} key="og:title" />
      <meta
        property="og:description"
        content={seo?.metaDescription}
        key="og:description"
      />
      <meta property="og:image" content={metaImage?.url} key="og:image" />
      <meta property="og:type" content="website" />
      <link rel="canonical" href={'url'} />
      <script type="application/ld+json">{seo?.structuredData}</script>
    </Head>
  );
};

export default Seo;
