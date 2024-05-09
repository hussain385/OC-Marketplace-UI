import React from 'react';
import QuestionDisplayComponent from '@/common/components/requirement-form/question-display.component';
import { Box, Typography } from '@mui/material';
import { BpCheckedIcon, BpIcon } from '@/common/styles';
import { Color } from '@/theme';

type Props = {
  questionNo: number;
  question: string;
  answersRecieved: boolean;
  answer?: number[];
  options: string[];
};

const SelectQuestionSellerComponent = ({ questionNo, question, answersRecieved, answer, options }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {!answersRecieved && (
        <Box className={'requirement-seller-option-box'}>
          <img src={require('@/assets/requirement-icons/checkbox.png').default} style={{ width: '16px', height: '16.33px' }} />
          <Typography sx={{ color: '#7E7E7E' }}>Multiple choice</Typography>
        </Box>
      )}
      <QuestionDisplayComponent sellerComponent questionNo={questionNo} question={question} />
      {options?.map((option, key) => (
        <Box key={key} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '2em', gap: '1em' }}>
          {answer && answersRecieved && answer?.includes(key) ? (
            <BpCheckedIcon sx={{ backgroundColor: answersRecieved ? '#2752E74D' : Color.priBlue }} />
          ) : (
            <BpIcon />
          )}
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: 1.71,
              letterSpacing: '-0.5px',
            }}
          >
            {option}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export default SelectQuestionSellerComponent;
