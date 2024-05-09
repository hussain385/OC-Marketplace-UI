/**
 * Query conversion to Record Object for the "@nestjsx/crud-request"
 * @param query
 */
function queryToObject(query: string): Record<string, any> {
  return JSON.parse('{"' + decodeURI(query).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

export default queryToObject;
