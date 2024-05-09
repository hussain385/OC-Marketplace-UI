const boxItems = [
  {
    id: 1,
    icon: require('../../../../assets/home-page/buyer/marketplace/diagram.svg').default,
  },
  {
    id: 2,
    icon: require('../../../../assets/home-page/buyer/marketplace/line-chart.svg').default,
  },
  {
    id: 3,
    icon: require('../../../../assets/home-page/buyer/marketplace/credit.svg').default,
  },
  {
    id: 4,
    icon: require('../../../../assets/home-page/buyer/marketplace/presentation.svg').default,
  },
  {
    id: 5,
    icon: require('../../../../assets/home-page/buyer/marketplace/rocket.svg').default,
  },
];

const faQItems = [
  {
    id: 1,
    heading: 'How can I find a service provider on OPNCORP?',
    subheading:
      'You can use the search function and filter the results based on your criteria such as your budget, pricing, or delivery time.',
  },
  {
    id: 2,
    heading: 'Is it safe to make payments through OPNCORP?',
    subheading:
      'Making payments through the platform is safe as <strong>OPNCORP</strong> uses secure payment methods and follows industry standards for online transactions.',
  },
  {
    id: 3,
    heading: 'How do I know if a service provider is reliable and trustworthy?',
    subheading:
      'Only verified providers can sell their services in <strong>OPNCORP</strong> . You may also check the provider’s profile and read reviews and ratings from previous clients.',
  },
  {
    id: 4,
    heading: 'Can I leave a review for the service provider after a transaction?',
    subheading:
      'Yes, you can leave a review for the provider after the service is delivered, which helps other potential buyers make informed decisions.',
  },
  {
    id: 5,
    heading: 'How do I know if the service provider is available for the date and time I need them?',
    subheading: 'You may directly communicate with the provider through the chat tool to know their availability.',
  },
  {
    id: 6,
    heading: 'What to do if I’m not satisfied with the services provided?',
    subheading:
      'If you are not satisfied with the services provided, it is recommended to communicate first with the provider to come up with the best solution.',
  },
];

const servicesOfferItems = [
  {
    id: 1,
    background: `url(${require('../../../../assets/home-page/buyer/transaction-icon/img-transaction.svg').default})`,
    backgroundXS: `url(${require('../../../../assets/home-page/buyer/transaction-icon/img-transaction-xs.svg').default})`,
    image: `url(${require('../../../../assets/home-page/buyer/transaction-icon/img-transaction.svg').default})`,
    heading: 'Why choose us',
    subheading: 'Risk-free payment',
    description:
      'We are your shield against potential risks! With our secure payment system, your hard-earned money is released to the provider only when you are fully satisfied with their work.',
  },
  {
    id: 2,
    background: `url(${require('../../../../assets/home-page/buyer/quality-provider/quality-provider.svg').default})`,
    backgroundXS: `url(${require('../../../../assets/home-page/buyer/quality-provider/quality-provider-xs.svg').default})`,
    image: `url(${require('../../../../assets/home-page/buyer/quality-provider/quality-provider.svg').default})`,
    heading: 'Why choose us',
    subheading: 'Crafting trust through\n' + 'quality providers',
    description:
      "In our quest to be your go-to marketplace for business solutions, we've set\n" +
      'the bar high with our thorough provider verification, so you can always\n' +
      'count on quality.',
  },
  {
    id: 3,
    background: `url(${require('../../../../assets/home-page/buyer/order-management/activities.svg').default})`,
    backgroundXS: `url(${require('../../../../assets/home-page/buyer/order-management/activities-xs.svg').default})`,
    image: `url(${require('../../../../assets/home-page/buyer/order-management/activities.svg').default})`,
    heading: 'Why choose us',
    subheading: 'Your orders, your way',
    description:
      'At OPNCORP, managing orders is a breeze. You can easily oversee your entire order history and stay in contact with your chosen providers to achieve your desired output.',
  },
];

const mobileDrawerItemLink = [
  { label: 'Home', value: 'home', link: '/' },
  { label: 'Explore service', value: 'services', link: '/catalog/category' },
];

const tcItems = [
  { url: '/privacy-policy', text: 'Private policy' },
  { url: '/terms-conditions', text: 'Terms and conditions' },
];

export { boxItems, faQItems, servicesOfferItems, mobileDrawerItemLink, tcItems };
