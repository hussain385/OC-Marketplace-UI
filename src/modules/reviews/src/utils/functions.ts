import { BuyerRatingPoint, ICounts } from './interface-validation';

// interface IReviewExpired {
//   orderStatuses: number | string;
//   completionAt: Date | string;
//   reviews?: Review[];
// }

// const isDev = import.meta.env.VITE_ENVIRONMENT !== 'production';

// export function isReviewExpired({ orderStatuses, completionAt, reviews = [] }: IReviewExpired): boolean {
//   const isComplete = ORDER_STATUS[orderStatuses] === 'COMPLETED',
//     is14Days = moment().diff(moment(completionAt).local(), isDev ? 'minutes' : 'days') >= (isDev ? 20 : 14),
//     is24Hours =
//       reviews.length === 2 &&
//       Date.now() - Math.max(...reviews.map((r) => Date.parse(r.createdAt))) >= (isDev ? 10 * 60 * 1000 : 24 * 60 * 60 * 1000);
//
//   return isComplete && (is14Days ? true : is24Hours);
// }

// export function isWriteReview({ orderStatuses, completionAt, reviews = [] }: IReviewExpired): boolean {
//   const userType = getCookie('x-client-type'),
//     isComplete = ORDER_STATUS[orderStatuses] === 'COMPLETED',
//     isCommented = reviews.some((value: Review) => value.from.toLowerCase() === userType),
//     is14Days = moment().diff(moment(completionAt), isDev ? 'minutes' : 'days') >= (isDev ? 20 : 14),
//     is24Hours =
//       reviews.length === 2 &&
//       Date.now() - Math.max(...reviews.map((r) => Date.parse(r.createdAt))) >= (isDev ? 10 * 60 * 1000 : 24 * 60 * 60 * 1000);
//
//   return isComplete && !isCommented && (is14Days ? false : !is24Hours);
// }

/**
 * Get the total count of reviews
 *
 * @param count if undefined returns 0
 */
export function getTotalReviewsCount(count?: ICounts): number {
  if (count) {
    return Object.values(count).reduce((acc, count) => acc + count, 0);
  }

  return 0;
}

/**
 * Get the average rating of reviews out of 5.0
 *
 * @param average if undefined returns 0
 */
export function getAverageReviewsRating(average?: BuyerRatingPoint): number {
  if (average) {
    return (
      ((average.communicationLevel + average.serviceAsDescribed + average.taskResponsibility + average.recommendToFriends) / 20) *
      5
    );
  }

  return 0;
}
