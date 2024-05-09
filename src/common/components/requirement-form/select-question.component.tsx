// @flow
import React, { useState } from 'react';
import QuestionDisplayComponent from './question-display.component';
import { Controller } from 'react-hook-form';
import { Box, FormControlLabel, RadioGroup, Typography } from '@mui/material';
import BpRadio from '../bp-radio.component';
import TextBoxComponent from '../../../modules/seller/common-service-components/text-box.component';
import { BpCheckedIcon, BpIcon } from '../../styles';
import { Color } from '@/theme';

type Props = {
  questionNo: number;
  question: string;
  control: any;
  errors: any;
  options: string[];
  setError: any;
  answersRecieved: boolean;
  setValue: any;
};

const SelectQuestionComponent = ({
  question,
  control,
  errors,
  questionNo,
  options,
  setError,
  answersRecieved,
  setValue,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<boolean>(false);
  const [otherDescription, setOtherDescription] = useState<string>('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <QuestionDisplayComponent questionNo={questionNo} question={question} />
      <Controller
        control={control}
        name={`question${questionNo}`}
        render={({ field }) => {
          return (
            <>
              <RadioGroup
                sx={{ marginLeft: '1em', display: 'flex', flexDirection: 'column', gap: '0.5em' }}
                value={field.value}
                onChange={(e) => {
                  setError(`question${questionNo}`, { message: undefined }, { shouldFocus: false });
                  if (e.target.value === 'Other') {
                    setSelectedOption(true);
                  } else {
                    field.onChange(e);
                    setSelectedOption(false);
                  }
                }}
              >
                {options?.map((option, key) => (
                  <div key={key}>
                    {answersRecieved ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          minHeight: '2em',
                          gap: '1em',
                        }}
                      >
                        {key === field.value ? (
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
                            wordBreak: 'break-all',
                          }}
                        >
                          {option}
                        </Typography>
                      </Box>
                    ) : (
                      <FormControlLabel
                        value={key}
                        key={key}
                        control={<BpRadio />}
                        label={
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: '14px',
                              lineHeight: 1.71,
                              letterSpacing: '-0.5px',
                              wordBreak: 'break-all',
                            }}
                          >
                            {option}
                          </Typography>
                        }
                      />
                    )}
                  </div>
                ))}
              </RadioGroup>
              {/*{answersRecieved && (*/}
              {/*  <Box*/}
              {/*    sx={{*/}
              {/*      width: '100%',*/}
              {/*      border: '1px solid #EAEAEA',*/}
              {/*      borderRadius: '2px',*/}
              {/*      padding: '16.5px 14px',*/}
              {/*      marginTop: '0.5em',*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    <Typography>{field.value}</Typography>*/}
              {/*  </Box>*/}
              {/*)}*/}
              {!answersRecieved && selectedOption && (
                <TextBoxComponent
                  description={otherDescription}
                  onChange={(e: any) => {
                    setOtherDescription(e.target.value);
                    setValue(`question${questionNo}`, `Other::${e.target.value}`);
                  }}
                  errors={errors}
                  characters={150}
                  placeholder={'Write your answer here.'}
                />
              )}
            </>
          );
        }}
      />

      {Boolean(errors[`question${questionNo}`]?.message) && (
        <Typography className='errorMessage'>{errors[`question${questionNo}`]?.message as never}</Typography>
      )}
    </div>
  );
};

export default SelectQuestionComponent;
