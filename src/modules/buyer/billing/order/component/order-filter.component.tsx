/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Divider,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  styled,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';

import React, { useCallback, useRef } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { ReactComponent as ExportIcon } from '../../../../../assets/icons/excel.svg';
import { ReactComponent as PdfIcon } from '../../../../../assets/icons/pdf.svg';

import { ReactComponent as SearchIcon } from '../../../../../assets/icons/icon_search.svg';

import { isEmpty } from 'lodash';

import {
  StateIsStartFiltering,
  StateOrderNameDropdownGlobal,
  StateProviderNameDropdownGlobal,
  StateSearchFilterCompanyName,
} from './order-list.component';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs, { Dayjs } from 'dayjs';

import { BillingStatusOrder, Orders } from './../types/index';

import { createGlobalState } from 'react-use';

import { ReactComponent as FilterIcon } from '../../../../../assets/order-icon/filter.svg';

import { ReactComponent as ArrowRightIcon } from '../../../../../assets/order-icon/arrow-right.svg';

import DialogOrderMobile from './dialog-modal/dialog-order-mobile.component';

import NestedDialogMobileSelection from './dialog-modal/selection-dialog.component';

import { RenderIf, useMediaBreakpoint } from '../../../../../common/components';
import { Color } from '../../../../../theme';
import {
  billingNoResultFoundContext,
  createClearStateInputContext,
  createDateRangeLabel,
  createServiceProviderLabel,
  EnDateContext,
  StartDateContext,
} from '../../../../../common/utils/global_state.util';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const OrderLabel = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 600,
  lineHeight: '135%',
  letterSpacing: '-0.5px',
  cursor: 'pointer',
  maxWidth: '30ch',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

// const OrderContainer = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   width: '100%',
// }));

export const StartDateGLobalState = createGlobalState<string>(new Date().toDateString());
export const EndDateDateGLobalState = createGlobalState<string>(new Date().toDateString());
export const onFilterDateActive = createGlobalState<boolean>(false);

export const isModalClose = createGlobalState<boolean>(false);

const SearchOrderInput = ({
  handleFilterSearch,
}: {
  handleFilterSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <Box sx={{ padding: '0 0.5rem' }}>
      <Box sx={{ position: 'relative', border: '1px solid #eaeaea' }}>
        <Box
          component='input'
          sx={{
            fontSize: '14px',
            '&:placeholder-shown': {
              letterSpacing: '-0.02em',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#7e7e7e',
              fontSize: '14px',
            },
          }}
          name='searchOrder'
          placeholder='Search company name '
          style={{
            width: '100%',
            minHeight: '36px',
            border: 'none',
            outline: 'none',
            paddingLeft: '38px',
            paddingRight: '5px',
          }}
          type='search'
          onChange={handleFilterSearch}
        />
        <div style={{ position: 'absolute', top: '8px', left: '10px', bottom: '0' }}>
          <SearchIcon />
        </div>
      </Box>
    </Box>
  );
};

const SearchOrderFilterList = ({
  onCompanyFilteredShow,
  onClose,
}: {
  onCompanyFilteredShow: (companyName: string) => void;
  onClose: () => void;
}) => {
  const [companyFiltered] = StateSearchFilterCompanyName();
  const [isCompanyFilter] = StateIsStartFiltering();

  return (
    <List>
      {!isEmpty(companyFiltered) ? (
        companyFiltered.map((companyName: { id: string; provider: string }) => (
          <ListItem
            onClick={() => {
              onCompanyFilteredShow(companyName.provider);
              onClose();
            }}
            key={companyName.id}
            sx={{ '&:hover': { background: '#F6F6F6' } }}
          >
            <ListItemText
              primary={
                <Typography sx={{ color: '#7e7e7e', fontWeight: 600, fontSize: '14px' }}>{companyName.provider}</Typography>
              }
            />
          </ListItem>
        ))
      ) : isCompanyFilter === true ? (
        <ListItem sx={{ padding: '0', paddingInline: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ListItemText
            primary={<Typography sx={{ color: Color.negative, fontWeight: 600, fontSize: '14px' }}>No result found!</Typography>}
          />
        </ListItem>
      ) : (
        <ListItem sx={{ padding: '0', paddingInline: '1.2rem', display: 'flex', alignItems: 'center' }}>
          <SearchIcon /> &nbsp;&nbsp;
          <ListItemText
            primary={
              <Typography sx={{ color: '#7e7e7e', fontWeight: 400, fontSize: '12px', textAlign: 'left' }}>
                Start searching your company.
              </Typography>
            }
          />
        </ListItem>
      )}
    </List>
  );
};

const MenuItemsList = ({
  handleFilterSearch,
  onCompanyFilteredShow,
  onClose,
}: {
  handleFilterSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onCompanyFilteredShow: (companyName: string) => void;
  onClose: () => void;
}) => {
  return (
    <>
      <SearchOrderInput handleFilterSearch={handleFilterSearch} />
      <SearchOrderFilterList onCompanyFilteredShow={onCompanyFilteredShow} onClose={onClose} />
    </>
  );
};

const OrderDatePicker = () => {
  const [, setStart] = StartDateGLobalState();
  const [, setEnd] = EndDateDateGLobalState();

  const [startGet, setDefaultStartValue] = StartDateContext();
  const [endGet, setDefaultEndValue] = EnDateContext();

  const [startValue, setStartValue] = React.useState<Dayjs | null | string>(
    !isEmpty(startGet) ? dayjs(startGet) : dayjs(new Date()),
  );
  const [endValue, setEndValue] = React.useState<Dayjs | null | string>(!isEmpty(endGet) ? dayjs(endGet) : dayjs(new Date()));

  return (
    <LocalizationProvider sx={{ '&.MuiButtonBase-root': { color: 'blue !important' } }} dateAdapter={AdapterDayjs}>
      <DatePicker
        minDate={new Date(1800, 0, 1)}
        views={['day']}
        label='Start date'
        value={startValue}
        onChange={(newValue: any) => {
          setStartValue(newValue);
          setDefaultStartValue(newValue);
          setStart(newValue.$d);
        }}
        // minDate={new Date('12/8/2022')}
        maxDate={new Date()} //maxDate
        // disableFuture={false}
        renderInput={(params) => <TextField sx={{ width: { xs: '100%', sm: '150px' } }} {...params} helperText={null} />}
      />
      &nbsp; &nbsp; &nbsp; &nbsp;
      <DatePicker
        minDate={new Date(1800, 0, 1)}
        views={['day']}
        label='End date'
        value={endValue}
        onChange={(newValue: any) => {
          setEndValue(newValue);
          setDefaultEndValue(newValue);
          setEnd(newValue.$d);
        }}
        // minDate={new Date('12/8/2022')}
        maxDate={new Date()} //maxDate
        // disableFuture={false}
        renderInput={(params) => <TextField sx={{ width: { xs: '100%', sm: '150px' } }} {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
};

const DropdownOrderDateRange = ({
  label,
  handlerDateRangeFilter,
}: {
  label: string;
  handlerDateRangeFilter: (setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | number>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [aciveRange] = onFilterDateActive();
  const [dateRangeLabel] = createDateRangeLabel();

  return (
    <>
      <Button
        sx={{ color: Color.pureBlack, textTransform: 'initial' }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <OrderLabel>
          {label}: {!isEmpty(dateRangeLabel) ? dateRangeLabel : 'All'}
        </OrderLabel>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        PaperProps={{
          style: {
            width: 345,
            borderRadius: 0,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          },
        }}
        anchorEl={anchorEl as any}
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ padding: '0.5rem' }}>
          <OrderDatePicker />

          {aciveRange && (
            <Typography sx={{ color: Color.negative, padding: '0.5rem', fontWeight: 600, fontSize: '14px' }}>
              No result found!
            </Typography>
          )}

          <Box sx={{ display: 'flex', gap: '10px', mt: '0.5rem' }}>
            <Typography
              sx={{
                color: Color.textBlack,
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '24px',
                letterSpacing: '-0.5px',
                '&:hover': { background: '#f6f6f6', cursor: 'pointer' },
                padding: '0.5rem 1rem',
              }}
              onClick={handleClose}
            >
              Cancel
            </Typography>
            <Typography
              sx={{
                color: Color.priBlue,
                fontSize: '14px',
                fontWeight: 600,
                lineHeight: '24px',
                letterSpacing: '-0.5px',
                '&:hover': { background: '#f6f6f6', cursor: 'pointer' },
                padding: '0.5rem 1rem',
              }}
              onClick={() => handlerDateRangeFilter(setAnchorEl)}
            >
              Apply
            </Typography>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

const DropdownOrderDateRangeMobile = ({
  label,
  handlerDateRangeFilterMobile,
  onModalClose,
  setOpenModal,
}: {
  label: string;
  handlerDateRangeFilterMobile: (setOpenModal: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>) => void;
  onModalClose: () => void;
  setOpenModal: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>;
}) => {
  const [activeRange] = onFilterDateActive();

  const handleFilterDateSearch = useCallback(() => {
    handlerDateRangeFilterMobile(setOpenModal);
  }, [handlerDateRangeFilterMobile]);

  return (
    <Box sx={{ padding: '0.5rem' }}>
      <OrderDatePicker />

      {activeRange && (
        <Typography sx={{ color: Color.negative, padding: '0.5rem', fontWeight: 600, fontSize: '14px' }}>
          No result found!
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: '10px', mt: '0.5rem' }}>
        <Typography
          sx={{
            color: Color.textBlack,
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '-0.5px',
            '&:hover': { background: '#f6f6f6', cursor: 'pointer' },
            padding: '0.5rem 1rem',
          }}
          onClick={onModalClose}
        >
          Cancel
        </Typography>
        <Typography
          sx={{
            color: Color.priBlue,
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '24px',
            letterSpacing: '-0.5px',
            '&:hover': { background: '#f6f6f6', cursor: 'pointer' },
            padding: '0.5rem 1rem',
          }}
          onClick={handleFilterDateSearch}
        >
          Apply
        </Typography>
      </Box>
    </Box>
  );
};

const DropdownOrderSearchInput = ({
  label,
  handleFilterSearch,
  onCompanyFilteredShow,
}: {
  label: string;
  handleFilterSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onCompanyFilteredShow: (companyName: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [provider] = createServiceProviderLabel();

  return (
    <>
      <Button
        sx={{ color: Color.pureBlack, textTransform: 'initial' }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <OrderLabel>
          {label}: {!isEmpty(provider) ? provider : 'All'}
        </OrderLabel>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        PaperProps={{
          style: {
            width: 360,
            borderRadius: 0,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItemsList
          handleFilterSearch={handleFilterSearch}
          onCompanyFilteredShow={onCompanyFilteredShow}
          onClose={handleClose}
        />
      </Menu>
    </>
  );
};

const DropdownOrder = ({
  type,
  label,
  items,
  menuItemCustomStyle,
  handlerClick,
}: {
  type: string;
  label: string;
  items?: BillingStatusOrder[];
  menuItemCustomStyle?: React.CSSProperties;
  handlerClick: (
    items: BillingStatusOrder[],
    i: number,
    type: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>,
  ) => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | number>(null);

  const [orderName] = StateOrderNameDropdownGlobal();
  const [providerName] = StateProviderNameDropdownGlobal();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const uniqueItem = [...new Set(items)];
  return (
    <>
      <Button
        sx={{ color: Color.pureBlack, textTransform: 'initial' }}
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <OrderLabel>
          {label}:{!isEmpty(orderName) ? orderName : 'All'}
        </OrderLabel>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        PaperProps={{
          style: {
            width: 160,
            borderRadius: 10,
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            ...menuItemCustomStyle,
          },
        }}
        anchorEl={anchorEl as any}
        open={open}
        onClose={handleClose}
      >
        {!isEmpty(items) &&
          uniqueItem?.map((value, i) => (
            <MenuItem
              selected={false}
              sx={{ color: i === 0 ? Color.textHint : Color.textBlack }}
              key={i}
              onClick={() => handlerClick(items as BillingStatusOrder[], i, type, setAnchorEl)}
            >
              {value.list}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

const DropdownOrderMobile = ({
  type,
  label,
  items,
  handlerClick,
  setOpenModal,
}: {
  type: string;
  label: string;
  items?: BillingStatusOrder[];
  handlerClick: (
    items: BillingStatusOrder[],
    i: number,
    type: string,
    setOpenModal: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>,
  ) => void;
  setOpenModal: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [orderName] = StateOrderNameDropdownGlobal();
  const [providerName] = StateProviderNameDropdownGlobal();

  const uniqueItem = [...new Set(items)];
  return (
    <List>
      {!isEmpty(items) &&
        uniqueItem?.map((value, i) => (
          <ListItem key={i}>
            <ListItemText
              sx={{ color: i === 0 ? Color.textHint : Color.textBlack }}
              key={i}
              onClick={() => handlerClick(items as BillingStatusOrder[], i, type, setOpenModal)}
            >
              {value.list}
            </ListItemText>
          </ListItem>
        ))}
    </List>
  );
};

const SearchOrder = ({
  handleSearch,
  customStyle,
  clearSearchData,
}: {
  handleSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
  customStyle?: SxProps;
  clearSearchData: (inputRef: React.RefObject<HTMLInputElement>) => void;
}) => {
  const [isClearState] = createClearStateInputContext();

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Box sx={{ position: 'relative', border: '1px solid #eaeaea', ...customStyle }}>
        <Input
          inputRef={inputRef}
          endAdornment={
            <InputAdornment
              onClick={() => clearSearchData(inputRef)}
              sx={{ display: isClearState ? 'flex' : 'none', paddingRight: '5px', cursor: 'pointer' }}
              position='end'
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: Color.negative,
                }}
              >
                x
              </div>
            </InputAdornment>
          }
          sx={{
            '& input::placeholder': {
              fontSize: '14px',
              letterSpacing: '-0.02em',
              lineHeight: '20px',
              fontWeight: 400,
              color: '#7e7e7e',
            },
          }}
          name='searchOrder'
          placeholder='Search order ID'
          style={{
            width: '100%',
            minHeight: '36px',
            border: 'none',
            outline: 'none',
            paddingLeft: '38px',
            paddingRight: '5px',
          }}
          type='text'
          onChange={handleSearch}
          disableUnderline
          onKeyPress={(e) => {
            if (e.code === 'Enter') {
              e.preventDefault();
            }
          }}
        />
        <div style={{ position: 'absolute', top: '8px', left: '10px', bottom: '0' }}>
          <SearchIcon />
        </div>
      </Box>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OrderFilterRow = ({
  handleSearch,
  data,
  statusData,
  handlerClick,
  handleFilterSearch,
  onCompanyFilteredShow,
  handlerDateRangeFilter,
  clearSearchData,
  clearAllRecords,
}: {
  handleSearch: React.ChangeEventHandler<HTMLInputElement> | undefined;
  clearSearchData: (inputRef: React.RefObject<HTMLInputElement>) => void;
  statusData: BillingStatusOrder[];
  data: Orders[];
  handlerClick: (
    item: BillingStatusOrder[],
    i: number,
    type: string,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>,
  ) => void;
  handleFilterSearch: (e: any) => void;
  onCompanyFilteredShow: (companyName: string) => void;
  handlerDateRangeFilter: (setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null | number>>) => void;
  clearAllRecords: () => void;
}) => {
  const { xs, sm, mdLg } = useMediaBreakpoint();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | number>(null);

  const [isModalState, setModalState] = React.useState<boolean>(true);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
    setModalState(true);
  };
  const handleClose = () => {
    setAnchorEl(null as null);
    setModalState(false);
  };

  type FilterProps = {
    company: string[];
    status: string[];
  };

  const [provider, setProvider] = React.useState<string[] | []>();
  const [status, setStatus] = React.useState<string[] | []>();
  const providerArr: FilterProps = {
    company: [],
    status: [],
  };

  if (isEmpty(provider)) {
    data.map((value: { serviceProvider: Orders['serviceProvider'] }) => providerArr.company.push(value.serviceProvider));
    providerArr.company.unshift('All');
    setProvider(providerArr.company);
  }

  const [openModal, setOpenModal] = React.useState<HTMLElement | null | number>(null);

  const isModalClickDialog = () => {
    setOpenModal(1);
  };

  const nestedModalClickDialog = (value: number) => {
    setOpenModal(value);
  };

  const handleClosed = () => {
    setOpenModal(null);
  };

  const [norecord] = billingNoResultFoundContext();

  return (
    <>
      <RenderIf value={sm || mdLg}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 'auto', mb: '1rem' }}>
          <Box sx={{ display: 'flex', flex: '1', gap: '2%' }}>
            <DropdownOrderDateRange label='Date range' handlerDateRangeFilter={handlerDateRangeFilter} />

            {/* <DropdownOrder label='Date range'  /> */}
            <DropdownOrderSearchInput
              label='Service provider'
              handleFilterSearch={handleFilterSearch}
              onCompanyFilteredShow={onCompanyFilteredShow}
            />
            <DropdownOrder type='status' label='Order status' items={statusData} handlerClick={handlerClick} />
            {!isEmpty(data) && (
              <Box>
                <Button
                  sx={{
                    maxWidth: '135px',
                    background: Color.priBlue,
                    color: Color.priWhite,
                    textTransform: 'initial',
                    '&:hover': { background: Color.priBlue },
                  }}
                  onClick={clearAllRecords}
                >
                  Clear All
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', flex: '1', alignItems: 'center', justifyContent: 'flex-end' }} component='form'>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '24px' }}>
              <Typography
                sx={{
                  marginRight: '5px',
                  color: Color.textHint,
                  fontSize: '12px',
                  lineHeight: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                }}
              >
                Export to:
              </Typography>
              <ExportIcon />
              <Divider orientation='vertical' variant='middle' sx={{ marginX: '6px', height: '24px', background: Color.line }} />
              <PdfIcon />
            </Box>
            <Box sx={{ width: '320px', margin: 0, padding: 0 }}>
              <SearchOrder handleSearch={handleSearch} clearSearchData={clearSearchData} />
            </Box>
          </Box>
        </Box>
      </RenderIf>
      <RenderIf value={xs}>
        <SearchOrder handleSearch={handleSearch} clearSearchData={clearSearchData} />
        <Divider />
        <Box
          onClick={isModalClickDialog}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0.5rem 1.2rem',
            cursor: 'pointer',
            '&:hover': {
              background: 'rgba(0,0,0,.3)',
            },
          }}
        >
          <div style={{ width: '3rem' }}>
            <FilterIcon />
          </div>
          <div style={{ width: 'auto' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: '600', lineHeight: '135%', letterSpacing: '-0.5px' }}>
              Filter
            </Typography>
          </div>
          <div style={{ width: '78%', display: 'flex', justifyContent: 'flex-end' }}>
            <ArrowRightIcon />
          </div>
        </Box>
      </RenderIf>

      {openModal === 1 && (
        <DialogOrderMobile isOpen={true} isClose={handleClosed}>
          <Typography sx={{ fontSize: '24px', fontWeight: '700', lineHeight: '36px', letterSpacing: '-0.5px' }}>
            Filter
          </Typography>

          <List>
            <ListItem
              onClick={() => nestedModalClickDialog(2)}
              sx={{ padding: 0, '&:hover': { background: '#F6F6F6' }, display: 'flex', justifyContent: 'space-between' }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{ width: 'auto', color: Color.textBlack, fontWeight: 700, fontSize: '14px', lineHeight: '40px' }}
                  >
                    Date range
                  </Typography>
                }
              />
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      width: 'auto',
                      color: Color.textHint,
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '40px',
                      textAlign: 'right',
                    }}
                  >
                    All
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              onClick={() => nestedModalClickDialog(3)}
              sx={{ padding: 0, '&:hover': { background: '#F6F6F6' }, display: 'flex', justifyContent: 'space-between' }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{ width: 'auto', color: Color.textBlack, fontWeight: 700, fontSize: '14px', lineHeight: '40px' }}
                  >
                    Service provider
                  </Typography>
                }
              />
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      width: 'auto',
                      color: Color.textHint,
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '40px',
                      textAlign: 'right',
                    }}
                  >
                    All
                  </Typography>
                }
              />
            </ListItem>
            <ListItem
              onClick={() => nestedModalClickDialog(4)}
              sx={{ padding: 0, '&:hover': { background: '#F6F6F6' }, display: 'flex', justifyContent: 'space-between' }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{ width: 'auto', color: Color.textBlack, fontWeight: 700, fontSize: '14px', lineHeight: '40px' }}
                  >
                    Order status
                  </Typography>
                }
              />
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      width: 'auto',
                      color: Color.textHint,
                      fontWeight: 400,
                      fontSize: '14px',
                      lineHeight: '40px',
                      textAlign: 'right',
                    }}
                  >
                    All
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </DialogOrderMobile>
      )}
      <NestedDialogMobileSelection isOpen={true} openModal={openModal} selectionIndex={2} onCloseModal={handleClosed}>
        <DropdownOrderDateRangeMobile
          label='Date range'
          handlerDateRangeFilterMobile={handlerDateRangeFilter}
          onModalClose={handleClosed}
          setOpenModal={setOpenModal}
        />
      </NestedDialogMobileSelection>

      <NestedDialogMobileSelection isOpen={true} openModal={openModal} selectionIndex={3} onCloseModal={handleClosed}>
        <MenuItemsList
          handleFilterSearch={handleFilterSearch}
          onCompanyFilteredShow={onCompanyFilteredShow}
          onClose={handleClosed}
        />
      </NestedDialogMobileSelection>

      <NestedDialogMobileSelection isOpen={true} openModal={openModal} selectionIndex={4} onCloseModal={handleClosed}>
        <DropdownOrderMobile
          type='status'
          label='Order status'
          items={statusData}
          handlerClick={handlerClick}
          setOpenModal={setOpenModal}
        />
      </NestedDialogMobileSelection>
    </>
  );
};

export default OrderFilterRow;
