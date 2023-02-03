import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import { Tab } from '@headlessui/react';
import {
  IndividualSignupForm,
  NonIndividualSignupForm,
} from '../components/index';

export default function Signup() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/account-verification');
  }, [router]);

  return (
    <div className="grid lg:grid-cols-5 min-h-screen bg-[#f1ece5]">
      <div
        style={{ backgroundImage: 'url(form-screen-bg.png)' }}
        className="lg:col-span-2 p-4 lg:p-10 bg-neutral-900 lg:flex flex-col bg-cover bg-center hidden"
      >
        <div>
          <img className="max-h-14" src="corpcare-logo-white.png" alt="" />
        </div>

        <p className="mt-auto text-5xl tracking-wide leading-tight font-semibold text-white hidden lg:block">
          Join India&apos;s first corporate treasury management platform.
        </p>
      </div>
      <div className="bg-[#2F2F2F] p-4 items-center lg:hidden flex">
        <img
          className="max-h-10 w-36 self-end"
          src="corpcare-logo-white.png"
          alt="corpcare"
        />
      </div>
      <div className="lg:col-span-3 p-4 lg:p-10">
        <h1 className="text-2xl lg:text-3xl text-darkGray text-center font-medium mt-5">
          Sign Up
        </h1>

        <Tab.Group>
          <Tab.List className="Tabs grid grid-cols-2 max-w-lg mx-auto mt-3 text-center">
            <Tab className="uppercase">Individual</Tab>
            <Tab className="uppercase">Non Individual</Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <IndividualSignupForm />
            </Tab.Panel>
            <Tab.Panel>
              <NonIndividualSignupForm />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        <Link href="/signin">
          <a className="text-center block mt-5 text-lightGray text-lg lg:text-xl">
            Already a Corpcare user? Sign in
          </a>
        </Link>
      </div>
    </div>
  );
}
