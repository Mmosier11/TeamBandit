// -------------------------------------------------------------------------- //
//-                                  FOOTER                                  -//
// -------------------------------------------------------------------------- //
/* -------------------------------------------------------------------------- */
// ---------------------------------- Types --------------------------------- //
import { config } from '@/config';
import { ExtLink } from '@/ui/external-link';

type NavigationSection = 'social';
type NavigationObject = Record<
  NavigationSection,
  {
    name: string;
    href: string;
    icon?: React.FC<React.HTMLAttributes<Element>>;
  }[]
>;
/* -------------------------------------------------------------------------- */
// -------------------------------- Constants ------------------------------- //
const {
  footer: { socials, disclaimer },
} = config;

const navigation: NavigationObject = {
  social: socials.map(({ icon: _icon, ...rest }) => ({
    ...rest,
    icon: (props) => <div {...props} dangerouslySetInnerHTML={{ __html: _icon }} />,
  })),
};
/* -------------------------------------------------------------------------- */
export function Footer() {
  return (
    <footer aria-labelledby='footer-heading' className='relative bg-gray-900'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-6 pb-8 pt-4 lg:px-8'>
        <div className='pt-8 md:flex md:items-center md:justify-between'>
          <div className='flex space-x-6 md:order-2'>
            {navigation.social.map((item) => (
              <ExtLink key={item.name} href={item.href} className='text-gray-500 hover:text-gray-400'>
                <span className='sr-only'>{item.name}</span>
                {item?.icon && <item.icon className='h-6 w-6 p-[3px]' />}
              </ExtLink>
            ))}
          </div>
          <p className='mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0'>
            &copy; 2023 Law School AI. All rights reserved.
          </p>
        </div>
        <br />
        <div className='Footer__Disclaimer'>
          <h4>Disclaimer:</h4>
          <p className='mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0'>{disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
