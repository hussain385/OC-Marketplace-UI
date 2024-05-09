import React from 'react';
import { Box, Button, Checkbox, MenuItem, Select, Typography } from '@mui/material';
import { Color } from '@/theme';
import { FiCopy } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { ErrorLabel } from '@/common/styles/common.styles';
import { MenuProps } from '@/modules/seller/account/professional-services';
import { IMilestoneState } from '@/common/interface/busines-company-profile-interface';
import { NumericFormat } from 'react-number-format';

type componentPropType = {
  milestone: IMilestoneState;
  milestoneArray: IMilestoneState[];
  index: number;
  setMilestoneArray: React.Dispatch<React.SetStateAction<IMilestoneState[]>>;
  disabled: boolean;
  error: boolean;
  initialPayment: boolean;
};

const options = [
  { label: 'Within 1 -3 days', value: 3 },
  { label: 'Up to 1 week', value: 7 },
  { label: 'Up to 2 weeks', value: 14 },
  { label: 'Up to 1 month', value: 30 },
];

const MilestoneContainerView = ({
  setMilestoneArray,
  milestone,
  milestoneArray,
  index,
  disabled,
  error,
  initialPayment,
}: componentPropType) => {
  return (
    <Box
      sx={{
        backgroundColor: '#D0F7F7',
        borderTop: '1px dashed #000000',
        borderBottom: milestoneArray.length === index + 1 ? '1px dashed #000000' : 'none',
        display: 'flex',
        justifyContent: 'space-between',
        minHeight: '400px',
      }}
    >
      <Box
        sx={{
          width: '33.3333%',
          padding: '1em 0 0 1em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Typography sx={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'capitalize', width: 'max-content' }}>
          {index + 1}
          {index + 1 === 1 ? 'st' : index + 1 === 2 ? 'nd' : index + 1 === 3 ? 'rd' : 'th'} milestone
        </Typography>
        <PiDotsSixVerticalBold style={{ fontSize: '30px' }} />
        <Box sx={{ height: '10%' }} />
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          width: '33.3333%',
          justifyContent: 'center',
          display: 'flex',
          minHeight: '116px',
          flexDirection: initialPayment ? 'column-reverse' : 'column',
        }}
      >
        <Box sx={{ width: '2.22px', height: '100%', backgroundColor: Color.darkGrey, minHeight: '2em' }} />
        <Box
          sx={{
            border: '1px solid #EAEAEA',
            padding: '10px',
            backgroundColor: 'white',
            borderRadius: '11px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '254px',
            flexDirection: 'column',
            gap: '1em',
          }}
        >
          <Box sx={{ width: '78%' }}>
            <Typography sx={{ fontWeight: '700', fontSize: '15px' }}>Payment</Typography>
          </Box>
          <Box
            sx={{
              border: error ? `1px solid ${Color.negative}` : '1px solid #EAEAEA',
              display: 'flex',
              gap: '0.5em',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '11px',
              borderRadius: '5px',
              width: '80%',
            }}
          >
            <NumericFormat
              value={milestone.price}
              thousandSeparator
              decimalScale={0}
              fixedDecimalScale
              style={{
                fontSize: '12px',
                fontWeight: '700',
                color: Color.textBlack,
                border: 'none',
                width: '100%',
                outline: 'none',
              }}
              prefix={'S$ '}
              onValueChange={(e) =>
                setMilestoneArray((prevState) => {
                  return prevState.map((state) => {
                    if (state === milestone) {
                      return {
                        ...milestone,
                        price: Number(e.value),
                      };
                    } else return state;
                  });
                })
              }
            />
          </Box>
          {error && (
            <ErrorLabel sx={{ margin: 0, padding: 0, marginTop: '-5px', marginLeft: '-12px', fontWeight: '500' }}>
              Package price doesn&apos;t match
            </ErrorLabel>
          )}
          <Box sx={{ width: '80%', display: 'flex', alignItems: 'center' }}>
            <Checkbox
              checked={milestone.isEscrow}
              onChange={() => {
                setMilestoneArray((prevState) => {
                  return prevState.map((state) => {
                    if (state === milestone) {
                      return {
                        ...milestone,
                        isEscrow: !milestone.isEscrow,
                      };
                    } else return state;
                  });
                });
              }}
              sx={{
                borderRadius: 2,
                color: '#eaeaea',
                padding: '0 9px 0 0',
                '&.Mui-checked': {
                  color: '#2752E7',
                  padding: '0 9px 0 0',
                },
              }}
            />
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.71',
                wordBreak: 'break-all',
              }}
            >
              ServiSafe
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: '2.22px', height: '100%', backgroundColor: Color.darkGrey, minHeight: '2em' }} />
        <Box
          sx={{
            border: '1px solid #EAEAEA',
            padding: '10px',
            paddingBottom: '2em',
            backgroundColor: 'white',
            borderRadius: '11px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '254px',
            flexDirection: 'column',
            gap: '1em',
          }}
        >
          <Box sx={{ width: '78%' }}>
            <Typography sx={{ fontWeight: '700', fontSize: '15px' }}>Deliverable {index + 1}</Typography>
          </Box>
          <textarea
            style={{
              outline: 'none',
              fontWeight: '500',
              fontSize: '12px',
              resize: 'none',
              height: '5em',
              padding: '11px',
              border: '1px solid #EAEAEA',
              borderRadius: '5px',
              width: '80%',
            }}
            value={milestone.deliverable}
            onChange={(e) =>
              setMilestoneArray((prevState) => {
                return prevState.map((state) => {
                  if (state === milestone) {
                    return {
                      ...milestone,
                      deliverable: e.target.value,
                    };
                  } else return state;
                });
              })
            }
          />
          <Box sx={{ width: '78%' }}>
            <Typography sx={{ fontWeight: '700', fontSize: '15px' }}>Duration</Typography>
          </Box>
          <Select
            displayEmpty
            size='small'
            MenuProps={MenuProps}
            value={milestone.duration}
            onChange={(event: any) => {
              setMilestoneArray((prevState) => {
                return prevState.map((state) => {
                  if (state === milestone) {
                    return {
                      ...milestone,
                      duration: event.target.value,
                    };
                  } else return state;
                });
              });
            }}
            className='Mui-focused'
            sx={{
              width: '80%',
              border: '1px solid #EAEAEA',
              borderRadius: '5px',
              height: '36px',
              fontSize: '14px',
              boxShadow: 'none',
            }}
          >
            <MenuItem value={''}>
              <em>Select</em>
            </MenuItem>
            {options.map((data, loopKey) => (
              <MenuItem key={loopKey} value={data.value}>
                {data.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box sx={{ width: '2.22px', height: '100%', backgroundColor: Color.darkGrey, minHeight: '2em' }} />
      </Box>
      <Box sx={{ display: 'flex', gap: '0.6em', padding: '1em 1em 0 0', width: '33.3333%', justifyContent: 'end' }}>
        <Button
          onClick={() => setMilestoneArray((prevState) => [...prevState, { ...milestone, id: milestoneArray.length }])}
          sx={{
            boxShadow: '0px 2.889px 5.778px 2.167px rgba(0, 0, 0, 0.15), 0px 0.722px 2.167px 0px rgba(0, 0, 0, 0.30)',
            backgroundColor: '#ECE6F0',
            height: 'fit-content',
            minWidth: 'fit-content',
            padding: '5.778px',
            '&:hover': {
              backgroundColor: '#fff',
            },
          }}
          disabled={disabled || error}
        >
          <FiCopy style={{ color: '#6750A4', fontSize: '15px' }} />
        </Button>
        <Button
          onClick={() => setMilestoneArray((prevState) => prevState.filter((state) => state !== milestone))}
          disabled={milestoneArray.length === 1}
          sx={{
            boxShadow: '0px 2.889px 5.778px 2.167px rgba(0, 0, 0, 0.15), 0px 0.722px 2.167px 0px rgba(0, 0, 0, 0.30)',
            backgroundColor: '#ECE6F0',
            height: 'fit-content',
            minWidth: 'fit-content',
            padding: '5.778px',
            '&:hover': {
              backgroundColor: '#fff',
            },
          }}
        >
          <RiDeleteBin6Line style={{ color: '#6750A4', fontSize: '15px' }} />
        </Button>
      </Box>
    </Box>
  );
};

export default MilestoneContainerView;
