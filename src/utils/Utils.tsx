/**
 * Here we can add all resulable methods which are going to use in app
 */
export const getIdFromUrl = (url: string) => {
  const str = url.split('/');
  return parseInt(str[str.length - 1]);
};
