import { isEmpty } from 'lodash';
import React from 'react';
import { Box, Link, Typography } from '@mui/material';
import { ReactComponent as FooterIcon } from '../../../../assets/home-page/buyer/footer-opn-logo.svg';
import { ReactComponent as Linkedin } from '../../../../assets/icons/linkedin.svg';
import { ReactComponent as EmailIcon } from '../../../../assets/icons/email.svg';
import LandingFooterStyles, { BoxContainer } from '../../styles/landing-footer.styles';
import config from '../../../../build.json';

const LandingFooter = ({ scrollRef }: { scrollRef?: React.MutableRefObject<HTMLDivElement> }) => {
  const buildNumber = config.VITE_BUILD_NUMBER;
  return (
    <BoxContainer sx={{ height: '24vh', width: { xs: '90%', md: '100%' } }} ref={scrollRef}>
      <Box sx={LandingFooterStyles.gridItem}>
        <Link sx={{ display: 'flex', alignItems: 'center' }} href='/'>
          <FooterIcon />
        </Link>
      </Box>
      <Box sx={LandingFooterStyles.box2}>
        <Box sx={LandingFooterStyles.boxheading}>
          <Typography sx={LandingFooterStyles.heading}>About</Typography>
          <Box sx={LandingFooterStyles.boxContainerFlex}>
            <Typography component='a' sx={LandingFooterStyles.subheading} href='/privacy-policy' target={'_blank'}>
              Privacy policy
            </Typography>
            <Typography component='a' sx={LandingFooterStyles.subheading} href='/terms-conditions' target={'_blank'}>
              Terms and conditions
            </Typography>
          </Box>
        </Box>

        <Box sx={{ marginBottom: '1em' }}>
          <Typography sx={LandingFooterStyles.heading}>Contact us</Typography>
          <Box sx={LandingFooterStyles.emailBoxFlex}>
            <EmailIcon color={'#2752E7'} />
            <Link
              style={{ textDecoration: 'none', color: '#2752E7' }}
              href={`mailto:help@opncorp.com?subject=Enquiry`}
              target='_blank'
            >
              help@opncorp.com
            </Link>
          </Box>
        </Box>

        <Box sx={LandingFooterStyles.boxheading}>
          <Typography sx={{ ...LandingFooterStyles.heading, mb: { xs: 'auto', sm: '0.7rem' } }}>Social</Typography>
          <Link href='https://www.linkedin.com/company/opn-corp/about/' target='_blank'>
            <Linkedin color={'#2752E7'} />
          </Link>
        </Box>
      </Box>
      <Box sx={LandingFooterStyles.copyRightBoxContainer}>
        <Box sx={LandingFooterStyles.copyRightTextContainerBox}>
          <Typography sx={LandingFooterStyles.copyRightText}>
            © 2023 OPNCORP. All rights reserved. {!isEmpty(buildNumber) ? `Build ${buildNumber}` : ''}
          </Typography>
        </Box>
      </Box>
    </BoxContainer>
  );
};

export default LandingFooter;
