import React from 'react';
import QuestionDisplayComponent from '@/common/components/requirement-form/question-display.component';
import { Box, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

type Props = {
  questionNo: number;
  question: string;
  answersRecieved: boolean;
  answer?: string[] | number[] | string;
};

const FreeTextSellerComponent = ({ questionNo, question, answersRecieved, answer }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {!answersRecieved && (
        <Box className={'requirement-seller-option-box'}>
          <img src={require('@/assets/requirement-icons/text.png').default} style={{ width: '16px', height: '13.33px' }} />
          <Typography sx={{ color: '#7E7E7E' }}>Free text</Typography>
        </Box>
      )}
      <QuestionDisplayComponent sellerComponent questionNo={questionNo} question={question} />
      {answersRecieved && (
        <Box
          sx={{
            width: '100%',
            border: '1px solid #EAEAEA',
            borderRadius: '2px',
            padding: '16.5px 14px',
            marginTop: '0.5em',
          }}
        >
          <Typography>{answer && !isEmpty(answer) ? `${answer}` : ''}</Typography>
        </Box>
      )}
    </div>
  );
};

export default FreeTextSellerComponent;
