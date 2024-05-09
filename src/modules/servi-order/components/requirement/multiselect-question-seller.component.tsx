import React from 'react';
import QuestionDisplayComponent from '@/common/components/requirement-form/question-display.component';
import { Box, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

type Props = {
  questionNo: number;
  question: string;
  answersRecieved: boolean;
  answer?: string[] | number[];
  options: string[];
};

const MultiselectQuestionSellerComponent = ({ questionNo, question, answersRecieved, answer, options }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {!answersRecieved && (
        <Box className={'requirement-seller-option-box'}>
          <img src={require('@/assets/requirement-icons/checkbox.png').default} style={{ width: '16px', height: '16.33px' }} />
          <Typography sx={{ color: '#7E7E7E' }}>Multiple choice</Typography>
        </Box>
      )}
      <QuestionDisplayComponent sellerComponent questionNo={questionNo} question={question} />
      {options?.map((option, key) => {
        const selected = answersRecieved && answer ? (answer as number[]).includes(key) : false;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '2em' }} key={key}>
            <Checkbox
              disabled={answersRecieved}
              checked={selected}
              sx={{
                borderRadius: 2,
                color: '#eaeaea',
                padding: '0 9px 0 0',
                '&.Mui-checked': {
                  color: answersRecieved ? '#2752E74D' : '#2752E7',
                  padding: '0 9px 0 0',
                },
              }}
            />
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '1.71',
              }}
            >
              {option}
            </Typography>
          </Box>
        );
      })}
    </div>
  );
};

export default MultiselectQuestionSellerComponent;
