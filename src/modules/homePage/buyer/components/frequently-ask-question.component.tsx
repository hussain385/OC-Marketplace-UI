import { Box, SxProps, Theme, Typography } from '@mui/material';
import { isUndefined } from 'lodash';
import React from 'react';
import { getCookie } from '../../../../common/utils/cookie';
import FaQStyles, { TextFaqSubheading } from '../../styles/faq.styles';

type FAQProps = {
  id: number;
  heading: string;
  subheading: string;
};

const FAQ = ({
  headline,
  data,
  customStyles,
  scrollRef,
}: {
  headline?: string;
  data: FAQProps[];
  customStyles?: React.CSSProperties | SxProps<Theme>;
  scrollRef?: React.MutableRefObject<HTMLDivElement>;
}) => {
  const sxStyles = !isUndefined(customStyles) ? customStyles : FaQStyles.gridItem;

  return (
    <Box sx={FaQStyles.boxWrapper}>
      <Typography sx={FaQStyles.headline}>{headline ? headline : ' Quick Q&A'}</Typography>
      <Box sx={FaQStyles.boxGridContainer} ref={scrollRef}>
        {data.map((item) => (
          <Box key={item.id} sx={sxStyles}>
            <Typography sx={FaQStyles.headingText}>{item.heading}</Typography>

            {item.id === 2 ||
            (item.id === 3 && getCookie('x-client-type') === 'buyer') ||
            item.id === 1 ||
            (item.id === 6 && getCookie('x-client-type') === 'seller') ? (
              // eslint-disable-next-line react/no-danger-with-children
              <TextFaqSubheading dangerouslySetInnerHTML={{ __html: item.subheading }} />
            ) : (
              <Typography sx={FaQStyles.subheadingText}>{item.subheading}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
