/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import LandingFooter from '../buyer/components/footer.component';
import FAQ from '../buyer/components/frequently-ask-question.component';
import GuidelineRoute from '../buyer/components/guideline-route.component';
import MarketplaceBox from '../buyer/components/marketplace-box';
import { cardSellerItems, faQItemSeller, promoteSellerItems } from './utils/mock-data';
import { ReactComponent as Union } from '../../../assets/home-page/seller/union.svg';
import HeaderImageXS from '../../../assets/home-page/seller/header-xs.png';
import HeaderImage from '../../../assets/home-page/seller/header.png';
import SellerComponentStyles, { GridBoxContainer, MarketPlaceBoxContainer } from '../styles/seller.component.style';
import { createVisibleScroll, useServices } from '../../../common/utils/global_state.util';
import SellerHeaderStyles, { BottomBoxContainer } from '../styles/seller-header.styles';
import { useGetCategoriesQuery } from '@/redux/apis/catalogApi';
import useSafeRender from '../../../common/utils/hooks/useSafeRender';
import { BoxItem, IService } from '../buyer';
import { boxItems } from '../buyer/utils/mock-data';
import useGetServicesById from '../../../common/utils/hooks/useGetServicesById';
import NavBar from '@/common/components/navbar';

const SellerLandingPage = () => {
  const [, setServiceDetails] = useServices();
  const { data } = useGetCategoriesQuery({});

  useSafeRender(() => {
    const mapped =
      data?.data?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (a, i, arr, j = arr.length - 1 - i) => arr[j],
      ) ?? [];

    const arr1: BoxItem[] = boxItems;
    const arr2 = mapped;

    const mixedArr: Pick<IService, 'text' | 'id' | 'description'>[] = arr2.map((service) => {
      const { name, id, description } = service;
      return { text: name, id, description };
    });

    const finalArr = arr1.map((obj, index) => {
      return {
        ...obj,
        ...mixedArr[index],
      };
    });

    setServiceDetails({ name: finalArr[0].text, id: finalArr[0].id });
  });

  const { navigateServicesDetails } = useGetServicesById();

  const [, setVisible] = createVisibleScroll();

  const scrollRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entryPoint = entries[0];
      setVisible(entryPoint.isIntersecting);
    });
    observer.observe(scrollRef.current);
  }, []);

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          width: '100%',
          maxWidth: '1440px',
          marginInline: 'auto',
          height: { xs: '84vh', md: '70vh' },
          marginTop: { xs: '0', md: '-5em' },
        }}
      >
        <BottomBoxContainer
          sx={{
            background: {
              xs: 'url(' + HeaderImageXS + '),rgba(0, 0, 0, 0.55)',
              sm: 'url(' + HeaderImage + '),rgba(0, 0, 0, 0.55)',
            },
            backgroundSize: 'cover !important',
            backgroundRepeat: 'no-repeat !important',
            backgroundPosition: 'center !important',
            height: '100%',
          }}
        >
          <Typography sx={SellerHeaderStyles.headlineText}>You got the expertise, we open opportunities</Typography>
          <Button sx={SellerHeaderStyles.startSellingBtn} onClick={navigateServicesDetails}>
            <span style={SellerHeaderStyles.startSellingBtnText}>
              <Union />
            </span>
            Start selling
          </Button>
        </BottomBoxContainer>
      </Box>
      <MarketPlaceBoxContainer>
        <MarketplaceBox
          scrollRef={scrollRef}
          customWrapperStyles={SellerComponentStyles.MarketPlaceBoxCustomStyles.promote_customWrapperStyles}
          customStyles={SellerComponentStyles.MarketPlaceBoxCustomStyles.promote_customStyles}
          data={promoteSellerItems}
          headline='How it works'
          customFontHeaderStyles={SellerComponentStyles.MarketPlaceBoxCustomStyles.promote_customFontHeaderStyles}
          customFontDescriptionStyles={SellerComponentStyles.MarketPlaceBoxCustomStyles.promote_customFontDescriptionStyles}
          subheading={
            <Typography sx={SellerComponentStyles.MarketPlaceBoxCustomStyles.promote_subheading}>
              Thousands of individuals and businesses are waiting for brilliant providers like you to join the leading global
              marketplace for business solutions
            </Typography>
          }
        />
      </MarketPlaceBoxContainer>

      <GridBoxContainer>
        <MarketplaceBox
          data={cardSellerItems}
          headline='What are the advantages of being an  OPNCORP seller?'
          boxCustomStyles={SellerComponentStyles.MarketPlaceBoxCustomStyles.card_boxCustomStyles}
          customHeadlineStyles={SellerComponentStyles.MarketPlaceBoxCustomStyles.card_customHeadlineStyles}
          customFontHeaderStyles={SellerComponentStyles.MarketPlaceBoxCustomStyles.card_customFontHeaderStyles}
          customFontDescriptionStyles={SellerComponentStyles.MarketPlaceBoxCustomStyles.card_customFontDescriptionStyles}
        />
      </GridBoxContainer>
      {/*<GridBoxContainer>*/}
      <FAQ data={faQItemSeller} headline={'Seller FAQs'} />
      {/*</GridBoxContainer>*/}
      <GuidelineRoute
        userRoute='seller'
        customButtonStyle={SellerComponentStyles.GuidelineRouteCustomStyles.guildelineRouteCustomButtonStyle}
        buttonText={
          <Typography sx={SellerComponentStyles.GuidelineRouteCustomStyles.guildelineRouteButtonText}>
            <span style={SellerComponentStyles.GuidelineRouteCustomStyles.guildelineRouteButtonTextalignment}>
              <Union />
            </span>
            Start selling
          </Typography>
        }
        navigateRoute={navigateServicesDetails}
      />

      <LandingFooter />
    </Box>
  );
};

export default SellerLandingPage;
