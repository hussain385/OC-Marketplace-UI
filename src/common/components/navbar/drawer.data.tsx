import React from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { AiOutlineAppstore } from 'react-icons/ai';
import { GrCatalog } from 'react-icons/gr';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { RiShoppingCartLine } from 'react-icons/ri';

export const drawerData = [
  {
    name: 'Home',
    navigationLink: (navigation: any) => navigation('/'),
    icon: () => <BiHomeAlt />,
  },
  {
    name: 'Explore service',
    navigationLink: (navigation: any) => navigation('/catalog/category'),
    icon: () => <GrCatalog />,
  },
];

export const userDrawerData = [
  {
    name: 'Home',
    navigationLink: (navigation: any) => navigation('/'),
    icon: () => <BiHomeAlt />,
  },
  {
    name: 'Explore service',
    navigationLink: (navigation: any) => navigation('/catalog/category'),
    icon: () => <GrCatalog />,
  },
  {
    name: 'Dashboard',
    navigationLink: (navigation: any) => navigation('/account'),
    icon: () => <AiOutlineAppstore />,
  },
  {
    name: 'Verify',
    navigationLink: (navigation: any) => navigation('/freelance-individual-registration'),
    icon: () => <HiOutlineDocumentText />,
  },
  {
    name: 'Order management',
    navigationLink: (navigation: any) => navigation('/account/order-management'),
    icon: () => <RiShoppingCartLine />,
  },
];
