export default `query MediaQuery($id: Int!) {
  Media(id: $id) {
    title {
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
  }
}
`;