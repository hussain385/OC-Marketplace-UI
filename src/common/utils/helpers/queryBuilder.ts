import { RequestQueryBuilder } from '@nestjsx/crud-request';
import queryToObject from '@/common/utils/helpers/queryToObject.ts';

/**
 *  Query builder for "@nestjsx/crud-request"
 */
function queryBuilder(builder: (builder: RequestQueryBuilder) => void) {
  const queryReqBuilder = RequestQueryBuilder.create();

  builder(queryReqBuilder);

  return queryToObject(queryReqBuilder.query(false));
}

export default queryBuilder;
