import { IMenuItems } from '../../../../common/interface';

export const RatingsList = [
  {
    name: 'ratingPoints.communicationLevel',
    title: 'Seller communication level',
    subtitle: 'How responsive was the seller during the process?',
  },
  {
    name: 'ratingPoints.serviceAsDescribed',
    title: 'Service as described',
    subtitle: 'How much did the service you received meet your expectations?',
  },
  {
    name: 'ratingPoints.taskResponsibility',
    title: 'Task responsibility',
    subtitle: 'How satisfied are you with the way the seller completed your order?',
  },
  {
    name: 'ratingPoints.recommendToFriends',
    title: 'Recommend to a friend',
    subtitle: 'How likely are you to recommend this seller to your friends?',
  },
] as const;

export const ServiceSortBy: IMenuItems[] = [
  {
    name: 'Most recent',
    value: 'desc',
    object: {
      field: 'updatedAt',
      order: 'DESC',
    },
  },
  {
    name: 'Oldest',
    value: 'asc',
    object: {
      field: 'updatedAt',
      order: 'ASC',
    },
  },
  {
    name: 'Most helpful',
    value: '3',
    object: {
      field: 'helpfulCount',
      order: 'DESC',
    },
  },
];

export const ServiceRating: IMenuItems[] = [
  { name: 'All', value: '0', object: undefined },
  { name: '5 stars', value: '1', object: { $gte: 5 } },
  { name: '4 stars', value: '2', object: { $gte: 4, $lt: 5 } },
  { name: '3 stars', value: '3', object: { $gte: 3, $lt: 4 } },
  { name: '2 stars', value: '4', object: { $gte: 2, $lt: 3 } },
  { name: '1 star', value: '5', object: { $lt: 2 } },
];
