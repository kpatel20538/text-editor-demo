export default`
import React from "react";
import { capitalize } from "lodash";
import { formatDistanceToNow } from "date-fns";

const NEWLINE_PATTERN = /((<br\\s*\\/?>)|(\\n\\r?)|\\r)+/;
const WHITESPACE_PATTERN = /^(\\s|(<br\\s*\\/?>)|(\\n\\r?)|\\r)*$/;

const byParagraph = (text) =>
  text
    .split(NEWLINE_PATTERN)
    .filter((paragraph) => paragraph && !paragraph.match(WHITESPACE_PATTERN));

const Header = () => (
  <mj-section background-color="#f0f0f0">
    <mj-column>
      <mj-text font-style="italic" font-size="20px" color="#626262">
        Test Email
      </mj-text>
    </mj-column>
  </mj-section>
);

const Banner = ({ data }) => (
  <mj-section
    background-url={data.Media.bannerImage}
    background-size="cover"
    background-repeat="no-repeat"
  >
    <mj-column width="600px">
      <mj-text
        align="center"
        color="#525252"
        font-size="40px"
        font-family="Helvetica Neue"
      >
        {data.Media.title.english || data.Media.title.userPreferred}
      </mj-text>
      <mj-button
        background-color={data.Media.coverImage.color}
        href={data.Media.siteUrl}
      >
        Check it out
      </mj-button>
    </mj-column>
  </mj-section>
);

const Body = ({ data }) => (
  <mj-section background-color="white">
    <mj-column>
      <mj-image width="200px" src={data.Media.coverImage.large} />
    </mj-column>
    <mj-column>
      <mj-text
        font-style="italic"
        font-size="20px"
        font-family="Helvetica Neue"
        color="#626262"
      >
        {capitalize(data.Media.season)} {data.Media.seasonYear}
      </mj-text>
      <mj-text
        font-style="italic"
        font-size="14px"
        font-family="Helvetica Neue"
        color="#626262"
      >
        {formatDistanceToNow(new Date(
          data.Media.startDate.year,
          data.Media.startDate.month,
          data.Media.startDate.day
        ))}
      </mj-text>
      {byParagraph(data.Media.description).map((paragraph, index) => (
        <mj-text color="#525252" key={index}>
          {paragraph}
        </mj-text>
      ))}
    </mj-column>
  </mj-section>
);

const Footer = () => (
  <mj-section background-color="#fbfbfb">
    <mj-column>
      <mj-image width="100px" src="https://picsum.photos/id/102/100" />
    </mj-column>
    <mj-column>
      <mj-image width="100px" src="https://picsum.photos/id/103/100" />
    </mj-column>
    <mj-column>
      <mj-image width="100px" src="https://picsum.photos/id/104/100" />
    </mj-column>
  </mj-section>
);

export default ({ data }) => (
  <mjml>
    <mj-body>
      <Header />
      <Banner data={data} />
      <Body data={data} />
      <Footer />
    </mj-body>
  </mjml>
);
`;