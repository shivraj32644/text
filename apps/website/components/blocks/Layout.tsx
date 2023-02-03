import { IFooter, IHeader } from '../../types/global';
import { Footer } from '../global/Footer';
import Header from '../global/Header';
import Seo from '../Seo';

export function Layout({
  global,
  children,
  seo,
}: {
  global: {
    footer: IFooter;
    header: IHeader;
  };
  children: any;
  seo?: any;
}) {
  return (
    <>
      {seo && <Seo seo={seo} />}
      <div className="flex flex-col justify-between min-h-screen space-y-5 lg:space-y-10">
        <Header header={global?.header} />
        {children}
        <Footer footer={global?.footer} />
      </div>
    </>
  );
}
