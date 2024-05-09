import { IGlobalPagination, IQueryGlobal } from '../../../../common/interface';
import { ICreateHelpfulReview, Review, ReviewQuestion } from '../utils/interface-validation';
import { baseApi } from '../../../../redux/baseAPI';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query<IGlobalPagination<Review>, IQueryGlobal>({
      query: (params) => ({
        url: '/marketplace/reviews',
        params,
      }),
      // transformResponse: (baseQueryReturnValue: { data: { paginate: IPaginateResponseGlobal<Review> } }, meta, arg) =>
      //   baseQueryReturnValue.data.paginate,
      providesTags: (result) =>
        result ? [...result.data.map(({ id }) => ({ type: 'Review' as const, id })), 'Review'] : ['Review'],
    }),
    createReviewReaction: builder.mutation<void, ICreateHelpfulReview>({
      query: (body) => ({
        url: '/marketplace/order-review-reactions',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Review', id: arg.orderReviewId }],
    }),
    updateReviewReaction: builder.mutation<void, ICreateHelpfulReview & { reactionId: string }>({
      query: (args) => ({
        url: '/marketplace/order-review-reactions/' + args.reactionId,
        method: 'PATCH',
        body: { data: args.data },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Review', id: arg.orderReviewId }],
    }),
    getReviewQuestions: builder.query<IGlobalPagination<ReviewQuestion>, IQueryGlobal>({
      query: (params) => ({
        url: '/marketplace/review-Items-definition',
        params,
      }),
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useCreateReviewReactionMutation,
  useUpdateReviewReactionMutation,
  useGetReviewQuestionsQuery,
} = reviewApi;
