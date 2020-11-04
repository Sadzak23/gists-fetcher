export const getLastPageNo = (link: string, currentPage: number) => {
  const lastPageLink = link.split(",").find((e) => e.includes('rel="last"'));
  return lastPageLink
    ? parseInt(lastPageLink.split(">")[0].split("&page=")[1])
    : currentPage;
};
