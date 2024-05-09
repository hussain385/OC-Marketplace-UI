/* eslint-disable no-unused-vars */
import { isEmpty, isNull, isUndefined } from 'lodash';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useRef, useEffect, useMemo } from 'react';
import Logo from '../../../../assets/catalog-icons/card-medialogo.svg';
import Ratings from '../../../../assets/catalog-icons/ratings.svg';
import { Color } from '../../../../theme';
import DropdownFilter from '../../../../common/components/forms/filter-search-form';
import { photoUrlLink } from '../../../../common/constants';
import Placeholder from '../../../../assets/catalog-icons/placeholder.png';
import { useGet4MetaServiceDetailsQuery } from '../../../../redux/apis/marketplace';
import useCatalogPayload from '../../../../common/utils/hooks/useCatalogPayload';
import {
  createBudgetMax,
  createBudgetMin,
  getAutoCompleteSelected,
  getSelectedServiceOption,
  getSelectedSorting,
  getSelectedCatalogId,
  catalogSearchFilterApply,
  catalogCurrentPage,
} from '../../../../common/utils/global_state.util';
import useSafeRender from '../../../../common/utils/hooks/useSafeRender';
import { ICategories } from '../../../../common/interface';
import CircularLoading from '../../../../common/components/circular-loading';
import { getAverageReviewsRating, getTotalReviewsCount } from '../../../reviews/src/utils/functions';
import { Star } from '@mui/icons-material';
import { RenderIf } from '../../../../common/components';
import { useAppSelector } from '../../../../redux/hooks';
import { IServiceCategory } from '../../../../common/interface/catalog-interface';

const SearchResults = () => {
  const { data: getServices } = useGet4MetaServiceDetailsQuery(
    {
      populate: [{ path: '__plans' }, { path: '__medias' }, { path: '__entity', populate: ['__logo'] }],
    },
    { refetchOnMountOrArgChange: true },
  );
  const navigate = useNavigate();
  const location: any = useLocation();
  const [{ start, end }, setCount] = React.useState({ start: 0, end: 12 });
  const [pages, setPage] = React.useState([0]);
  const [hasPrevious, setHasPrevious] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = catalogCurrentPage();
  const [filterState] = getAutoCompleteSelected();
  const { serviceDetails, allCategories } = useAppSelector((state) => state.mainState.buyerCatalog);
  const [isCatalogSearchFilterApplied] = catalogSearchFilterApply();
  const [term, setTerm] = React.useState<string>('');

  const prev = () => {
    if (currentPage >= 1) {
      const current: number = currentPage - 1;
      setCurrentPage(current);
      // paginationHandler(current);
      if (current === 1) {
        setHasPrevious(false);
      }
    }
  };

  const next = () => {
    if (currentPage < serviceDetails.totalPages) {
      setCurrentPage(currentPage + 1);
      // paginationHandler(currentPage);
      if (!hasPrevious) {
        setHasPrevious(true);
      }
    }
  };

  const [_categories, setCategories] = React.useState<ICategories[]>([]);

  useSafeRender(() => {
    if (!isEmpty(allCategories)) {
      const setItems: ICategories[] = [];
      allCategories.map((category: IServiceCategory) => {
        setItems.push({ uid: category.uid as string, name: category.name as string });
      });
      setItems.push({ uid: '0', name: 'All Categories' });
      setItems.reverse();
      setCategories(setItems);
    }
  });

  const [minRange] = createBudgetMin();
  const [maxRange] = createBudgetMax();

  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (minRef.current && maxRange !== 0) {
      minRef.current.value = minRange.toString();
    }
    if (maxRef.current && maxRange !== 0) {
      maxRef.current.value = maxRange.toString();
    }

    if (isEmpty(filterState)) {
      setTerm(filterState);
    }
    if (location.state) {
      setTerm(location.state.filterValue);
    }
  }, [maxRef, minRef, minRange, maxRange, isCatalogSearchFilterApplied, location, filterState]);

  const [selectedServiceOption] = getSelectedServiceOption();
  const [selectedSorting] = getSelectedSorting();
  const [selectedCatalogIndex] = getSelectedCatalogId();

  const __generatePagination = () => {
    const page = [];
    for (let i = 0; i < serviceDetails.totalPages; i++) {
      page.push(i + 1);
    }
    setPage(page);
  };

  useEffect(() => {
    if (serviceDetails) {
      __generatePagination();
    }
  }, [serviceDetails, currentPage]);

  return (
    <>
      <Box
        sx={{
          maxWidth: '1440px',
          marginInline: 'auto',
          mt: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr',
          px: { xs: '10px', md: '40px' },
        }}
      >
        <Box>
          {!isEmpty(term) && (
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 700,
                  lineHeight: '32px',
                  letterSpacing: '-0.03em',
                  maxWidth: '1440px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                Results for &ldquo; {term}
              </Typography>
              <Typography sx={{ fontSize: '24px', fontWeight: 700, lineHeight: '32px', letterSpacing: '-0.03em' }}>
                &rdquo;
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              mt: '25px',
            }}
          >
            <Box sx={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <DropdownFilter
                width={367}
                label='Category'
                objectArraItems={_categories}
                handlerClick={() => undefined}
                selectedIndex={selectedCatalogIndex}
              />

              <DropdownFilter
                width={267}
                label='Service options'
                // handlerClick={onServiceOptionQuery}
                items={[
                  { label: 'All', value: 'all' },
                  { label: 'One time payment', value: 'SINGLE' },
                  { label: 'Milestone payment', value: 'MILESTONE' },
                  { label: 'Subscription payment', value: 'SUBSCRIPTION' },
                ]}
                selectedIndex={selectedServiceOption}
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              />

              <DropdownFilter
                isRange={true}
                width={240}
                label='Budget'
                handlerClick={() => undefined}
                minRef={minRef}
                maxRef={maxRef}
              />
              <DropdownFilter
                isCheckBoxOn={true}
                width={200}
                label='Delivery time'
                items={[
                  { label: 'Within 1 -3 days', value: '1-3 days' },
                  { label: 'Up to a week', value: 'within 1 week' },
                  { label: 'Up to 2 weeks', value: 'within 2 weeks' },
                  { label: 'Up to a month', value: 'within a month' },
                  { label: 'Anytime', value: 'Others' },
                ]}
                handlerClick={() => undefined}
              />
              {/* <FormControlLabel
                control={<IOSSwitch sx={{ mr: '10px' }} name='seller' />}
                label={
                  <Typography sx={{ fontWeight: 600, fontSize: '14px', letterSpacing: '-0.03em', liheHeight: '135%' }}>
                    Online Sellers
                  </Typography>
                }
              /> */}
              {isCatalogSearchFilterApplied && (
                <Box>
                  <Button
                    sx={{
                      maxWidth: '135px',
                      background: Color.priBlue,
                      color: Color.priWhite,
                      textTransform: 'initial',
                      '&:hover': { background: Color.priBlue },
                    }}
                  >
                    Clear All
                  </Button>
                </Box>
              )}
            </Box>
            {/* <Typography sx={{ fontSize: '14px' }}></Typography> */}
          </Box>
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', mt: '16px' }}>
          <Typography
            sx={{ color: Color.textHint, fontSize: '14px', fontWeight: 600, lineHeight: '125%', letterSpacing: '-0.03em' }}
          >
            {serviceDetails ? serviceDetails.data.length : getServices?.data?.services?.length} services available
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography
              sx={{ color: Color.textHint, fontSize: '14px', fontWeight: 600, lineHeight: '125%', letterSpacing: '-0.03em' }}
            >
              Sort By:
            </Typography>

            <DropdownFilter
              width={192}
              label='New arrivals'
              // handlerClick={handlerForArrivalsQuery}
              items={[
                { label: 'New arrivals', value: 'newest' },
                // { label: 'Best selling', value: 'Best selling' },
                { label: 'Lowest to highest', value: 'low' },
                { label: 'Highest to lowest', value: 'high' },
              ]}
              selectedIndex={selectedSorting}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            mt: '24px',
            marginInline: { xs: 'auto', sm: '0' },
            justifyItems: 'start',
          }}
        >
          {isNull(serviceDetails)
            ? getServices?.data?.services.slice(start, end)?.map((item: any, index: number) => {
                return (
                  <Box key={index}>
                    <Box
                      sx={{
                        maxWidth: '320px',
                        height: '375px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        background: '#ffffff',
                        borderRadius: '4px',
                        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 12px 0px',
                        pb: '21px',
                        mb: '24px',
                      }}
                    >
                      <Box sx={{ gridColumn: '1/-1', width: '320px', hwight: '190px' }}>
                        <img
                          src={
                            !isEmpty(item.__medias)
                              ? photoUrlLink(item.uid as string, item.__medias[0]?.uid as string, 'services')
                              : Placeholder
                          }
                          alt=''
                          width='320px'
                          height='190px'
                        />
                      </Box>
                      <Box sx={{ gridColumn: '1/-1', gridRows: '2/-1', padding: '8px 16px 21px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <img src={Logo} alt='' />
                            <Typography>{item?.__entity?.profile?.detail?.name}</Typography>
                          </Box>
                          <RenderIf value={getTotalReviewsCount(item?.__counts) >= 1}>
                            <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                              <Star sx={{ color: '#2CAF70', fontWeight: 600, fontSize: '12px', letterSpacing: '-0.03em' }} />
                              <Typography sx={{ color: '#2CAF70', fontWeight: 600, fontSize: '12px', letterSpacing: '-0.03em' }}>
                                {getAverageReviewsRating(item?.__averages).toPrecision(2)} ({getTotalReviewsCount(item?.__counts)}
                                )
                              </Typography>
                            </Box>
                          </RenderIf>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          gridColumn: '1/-1',
                          gridRows: '3/-1',
                          paddingInline: '16px',
                          maxWidth: '320px',
                          maxHeight: '45px',
                        }}
                      >
                        <Typography
                          sx={{
                            maxWidth: '320px',
                            maxHeight: '45px',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                          }}
                        >
                          {item?.__entity?.profile?.detail?.about}
                        </Typography>
                      </Box>
                      <Box sx={{ gridColumn: '1/-1', gridRows: '4/-1', marginBlock: '8px' }}>
                        <Divider />
                      </Box>
                      <Box
                        sx={{
                          gridColumn: '1/-1',
                          gridRows: '5/-1',
                          paddingInline: '16px',
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ color: Color.textHint, fontSize: '10px', fontWeight: 600, lineHeight: '24px' }}>
                            STARTING AT
                          </Typography>
                          &nbsp; &nbsp;
                          <Typography
                            sx={{
                              fontSize: '16px',
                              fontWeight: 600,
                              lineHeight: '24px',
                              width: '63px',
                              color: index % 2 === 1 ? '#2CAF70' : Color.textBlack,
                            }}
                          >
                            {!isEmpty(item.__plans)
                              ? item.__plans[0].currency.replace('Currency is optional and default is', '')
                              : 'null'}
                            &nbsp;
                            {item.__plans[0].price}
                          </Typography>
                        </Box>
                        <Button
                          sx={{
                            color: Color.priBlue,
                            background: Color.bgGreyLight,
                            width: 'auto',
                            padding: '5px 10px 5px 10px',
                            height: '34px',
                            gridColumns: '2/-1',
                            gridRows: '1/-1',
                            justifySelf: 'end',
                            textTransform: 'initial',
                            fontWeight: 600,
                            fotnSize: '14px',
                            letterSpacing: '-0.03em',
                          }}
                          onClick={() => navigate(`/service-detail/${item.uid}`, { state: { id: item.uid } })}
                        >
                          Check it now
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            : serviceDetails.data?.slice(start, end)?.map((item: any, index: number) => (
                <Box key={index}>
                  <Box
                    sx={{
                      maxWidth: '320px',
                      height: '375px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      background: '#ffffff',
                      borderRadius: '4px',
                      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 2px 12px 0px',
                      pb: '21px',
                      mb: '24px',
                    }}
                  >
                    <Box sx={{ gridColumn: '1/-1', width: '320px', hwight: '190px' }}>
                      <img
                        src={
                          !isEmpty(item.__medias)
                            ? photoUrlLink(item.uid as string, item.__medias[0]?.uid as string, 'services')
                            : Placeholder
                        }
                        alt=''
                        width='320px'
                        height='190px'
                      />
                    </Box>
                    <Box sx={{ gridColumn: '1/-1', gridRows: '2/-1', padding: '8px 16px 21px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <img src={Logo} alt='' />
                          <Typography>{item?.__entity?.profile?.detail?.name}</Typography>
                        </Box>
                        <RenderIf value={getTotalReviewsCount(item?.__counts) >= 1}>
                          <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <Star sx={{ color: '#2CAF70', fontWeight: 600, fontSize: '12px', letterSpacing: '-0.03em' }} />
                            <Typography sx={{ color: '#2CAF70', fontWeight: 600, fontSize: '12px', letterSpacing: '-0.03em' }}>
                              {getAverageReviewsRating(item?.__averages).toPrecision(2)} ({getTotalReviewsCount(item?.__counts)})
                            </Typography>
                          </Box>
                        </RenderIf>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        gridColumn: '1/-1',
                        gridRows: '3/-1',
                        paddingInline: '16px',
                        maxWidth: '320px',
                        maxHeight: '45px',
                      }}
                    >
                      <Typography
                        sx={{
                          maxWidth: '320px',
                          maxHeight: '45px',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                        }}
                      >
                        {item?.__entity?.profile?.detail?.about}
                      </Typography>
                    </Box>
                    <Box sx={{ gridColumn: '1/-1', gridRows: '4/-1', marginBlock: '8px' }}>
                      <Divider />
                    </Box>
                    <Box
                      sx={{
                        gridColumn: '1/-1',
                        gridRows: '5/-1',
                        paddingInline: '16px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ color: Color.textHint, fontSize: '10px', fontWeight: 600, lineHeight: '24px' }}>
                          STARTING AT
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                          sx={{
                            fontSize: '16px',
                            fontWeight: 600,
                            lineHeight: '24px',
                            width: '63px',
                            color: index % 2 === 1 ? '#2CAF70' : Color.textBlack,
                          }}
                        >
                          {!isEmpty(item.__plans)
                            ? item.__plans[0].currency.replace('Currency is optional and default is', '')
                            : 'null'}
                          &nbsp;
                          {!isEmpty(item.__plans) && item.__plans[0].price}
                        </Typography>
                      </Box>
                      <Button
                        sx={{
                          color: Color.priBlue,
                          background: Color.bgGreyLight,
                          width: 'auto',
                          padding: '5px 10px 5px 10px',
                          height: '34px',
                          gridColumns: '2/-1',
                          gridRows: '1/-1',
                          justifySelf: 'end',
                          textTransform: 'initial',
                          fontWeight: 600,
                          fotnSize: '14px',
                          letterSpacing: '-0.03em',
                        }}
                        onClick={() => navigate(`/service-detail/${item.uid}`, { state: { id: item.uid } })}
                      >
                        Check it now
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
        </Box>
        {serviceDetails ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', marginBlock: '16px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              {hasPrevious && (
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '12px',
                    letterSpacing: '-0.5px',
                    color: currentPage === 1 ? Color.textHint : Color.textBlack,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    prev();
                  }}
                >
                  Previous
                </Typography>
              )}

              {pages.map((item, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontWeight: 600,
                    fontSize: '12px',
                    letterSpacing: '-0.5px',
                    color: item === currentPage ? Color.textHint : Color.textBlack,
                  }}
                >
                  {item}
                </Typography>
              ))}
              {serviceDetails.totalPages > 1 && (
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: '12px',
                    letterSpacing: '-0.5px',
                    color: currentPage === serviceDetails.totalPages ? Color.textHint : Color.textBlack,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    if (currentPage < serviceDetails.totalPages) {
                      next();
                    }
                  }}
                >
                  Next
                </Typography>
              )}
            </Box>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

const CatalogSearchResult = () => {
  const { isLoading, isError } = useGet4MetaServiceDetailsQuery(
    {
      populate: [{ path: '__plans' }, { path: '__medias' }, { path: '__entity', populate: ['__logo'] }],
    },
    { refetchOnMountOrArgChange: true },
  );

  if (isLoading) {
    return <CircularLoading />;
  }
  if (isError) {
    return <div>{JSON.stringify(isError)}</div>;
  }

  return <SearchResults />;
};

export default CatalogSearchResult;
