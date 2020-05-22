export default `query MediaQuery($search: String!) {
  Media(search: $search) {
    title {
      english
      userPreferred
    }
    description
    siteUrl
    season
    seasonYear
    bannerImage
    coverImage {
      large
      color
    }
    startDate {
      year
      month
      day
    }
  }
}
`;