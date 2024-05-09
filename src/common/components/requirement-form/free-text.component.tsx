// @flow
import React from 'react';
import QuestionDisplayComponent from './question-display.component';
import TextBoxComponent from '../../../modules/seller/common-service-components/text-box.component';
import { Controller } from 'react-hook-form';
import { Typography, Box } from '@mui/material';

type Props = {
  questionNo: number;
  question: string;
  control: any;
  errors: any;
  setError: any;
  answersRecieved: boolean;
};

const FreeTextComponent = ({ questionNo, question, control, errors, answersRecieved }: Props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <QuestionDisplayComponent questionNo={questionNo} question={question} />

      <Controller
        control={control}
        name={`question${questionNo}`}
        render={({ field }) => (
          <>
            {answersRecieved ? (
              <Box
                sx={{
                  width: '100%',
                  border: '1px solid #EAEAEA',
                  borderRadius: '2px',
                  padding: '16.5px 14px',
                  marginTop: '0.5em',
                }}
              >
                <Typography>{field.value}</Typography>
              </Box>
            ) : (
              <TextBoxComponent
                description={field.value}
                onChange={field.onChange}
                errors={errors}
                characters={1200}
                placeholder={'Write your answer here.'}
                fieldName={`question${questionNo}`}
              />
            )}
          </>
        )}
      />
    </div>
  );
};

export default FreeTextComponent;
