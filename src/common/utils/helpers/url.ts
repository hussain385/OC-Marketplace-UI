/**
 * @name urlHelper
 * @description this function returns new url object class to access query params using params.get(name)
 * @returns Url object and params function to get query params
 */
export const urlHelper = () => {
  const url = new URL(window.location.href);
  return {
    segment: `${url.pathname}${url.search}`,
    params: url.searchParams,
  };
};
