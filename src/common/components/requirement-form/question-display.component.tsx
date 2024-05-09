// @flow
import React from 'react';
import { Typography } from '@mui/material';
import { QuestionBox, QuestionNoBox } from '../../styles/checkout-page.styles';
import { Capitalize } from '../../utils';

type Props = {
  questionNo: number;
  question: string;
  sellerComponent?: boolean;
};
const QuestionDisplayComponent = ({ questionNo, question, sellerComponent }: Props) => {
  return (
    <QuestionBox sx={{ marginTop: sellerComponent ? '1em' : '2em' }}>
      <QuestionNoBox>{questionNo}</QuestionNoBox>
      <Typography className='subHeading' sx={{ width: 'fit-content', wordBreak: 'break-all' }}>
        {Capitalize(question)}
      </Typography>
    </QuestionBox>
  );
};

export default QuestionDisplayComponent;
