// @flow
import * as React from 'react';
import QuestionDisplayComponent from './question-display.component';
import { Box, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Controller } from 'react-hook-form';
import TextBoxComponent from '../../../modules/seller/common-service-components/text-box.component';
import { useState } from 'react';

type Props = {
  questionNo: number;
  question: string;
  control: any;
  errors: any;
  options: string[];
  setValue: any;
  setError: any;
  answersRecieved: boolean;
};

export const MultiselectQuestionComponent = ({
  question,
  control,
  errors,
  questionNo,
  options,
  setValue,
  setError,
  answersRecieved,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<boolean>(false);
  const [otherDescription, setOtherDescription] = useState<string>('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <QuestionDisplayComponent questionNo={questionNo} question={question} />
      <Controller
        control={control}
        name={`question${questionNo}`}
        render={({ field }) => (
          <Box sx={{ marginLeft: '1em', display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
            {options?.map((option, key) => {
              const selected = field.value ? field.value.includes(key) : false;
              return (
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', minHeight: '2em' }} key={key}>
                  <Checkbox
                    disabled={answersRecieved}
                    onChange={(e) => {
                      setError(`question${questionNo}`, { message: undefined }, { shouldFocus: false });
                      if (e.target.checked) {
                        if (field.value) {
                          setValue(`question${questionNo}`, [...field.value, key]);
                        } else {
                          setValue(`question${questionNo}`, [key]);
                        }
                      } else {
                        setValue(
                          `question${questionNo}`,
                          field.value.filter((value: number) => value !== key),
                        );
                      }
                    }}
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
                      wordBreak: 'break-all',
                    }}
                  >
                    {option}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        )}
      />
      {selectedOption && (
        <TextBoxComponent
          description={otherDescription}
          onChange={(e: any) => {
            setSelectedOption(true);
            setOtherDescription(e.target.value);
          }}
          errors={errors}
          characters={150}
          placeholder={'Write your answer here.'}
        />
      )}
      {Boolean(errors[`question${questionNo}`]?.message) && (
        <Typography className='errorMessage'>{errors[`question${questionNo}`]?.message as never}</Typography>
      )}
    </div>
  );
};
