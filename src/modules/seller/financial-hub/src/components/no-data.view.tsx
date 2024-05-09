import { Stack } from '@mui/material';
import React from 'react';
import { ReactComponent as NoHistoryIcon } from '../assets/no-earning-history.svg';
import { Text14 } from '../../../../../common/styles';
import { Color } from '../../../../../theme';
interface Props {
  title: string;
  subText: string;
}
const NoDataOverlay = ({ title, subText }: Props) => {
  return (
    <Stack height='100%' alignItems='center' justifyContent='center'>
      <NoHistoryIcon width={64} height={64} style={{ marginBottom: '16px' }} />
      <Text14 sx={{ fontWeight: '600' }}>There are no earnings to display</Text14>
      <Text14 sx={{ color: Color.textHint, marginTop: '8px' }}>
        You’ll find all your earnings info here once your orders are completed
      </Text14>
    </Stack>
  );
};
export default NoDataOverlay;
