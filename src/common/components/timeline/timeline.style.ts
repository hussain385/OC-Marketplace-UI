import { Box, styled } from '@mui/material';
import { Color } from '@/theme';

export const TimelineContainer = styled('ul')({
  display: 'flex',
  flexDirection: 'column',
  padding: '6px 16px',
  flexGrow: 1,
});

export const TimelineItemRow = styled('li')({
  display: 'flex',
  position: 'relative',
  minHeight: '100%',
  listStyle: 'none',
});

export const TimelineContent = styled('div')({
  flex: 1,
  padding: '0px 16px 32px 16px',
  margin: 0,
});

export const TimelineContentLeft = styled('div')({
  display: 'flex',
  flex: 0.3,
  padding: '0px 16px',
  margin: 0,
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
});

export const TimelineSeparator = styled('div')({
  flex: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const TimelineDot = styled(Box)({
  width: '26px',
  height: '26px',
  border: `4px solid ${Color.pureBlack}`,
  borderRadius: '100%',
  background: Color.priWhite,
  textAlign: 'center',
  lineHeight: '18px',
  fontSize: '10px',
  display: 'flex',
  alignSelf: 'baseline',
  justifyContent: 'center',
  alignItems: 'center',
  '&.done': {
    background: Color.green,
    borderColor: Color.green,
  },
  '&.active': {
    background: Color.priWhite,
    borderColor: Color.green,
    color: Color.green,
  },
});

export const TimelineConnecter = styled(Box)({
  width: '2px',
  background: Color.pureBlack,
  flexGrow: 1,
  minHeight: '100px',
  '&.dotted': {
    width: '4px',
    background: Color.priWhite,
    backgroundImage: 'radial-gradient(black 4px, transparent 0)',
    backgroundSize: '10px 10px',
    backgroundPosition: '-19px -19px',
  },
  '&.done, &.active': {
    background: Color.green,
  },
});
