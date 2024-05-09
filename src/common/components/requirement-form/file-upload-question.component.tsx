// @flow
/* eslint-disable no-unused-vars */

import React, { useRef, useState } from 'react';
import QuestionDisplayComponent from './question-display.component';
import { Controller } from 'react-hook-form';
import TextBoxComponent from '../../../modules/seller/common-service-components/text-box.component';
import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { ReactComponent as AttachmentIcon } from '../../../assets/order-icon/attachment.svg';
import { Color } from '../../../theme';
import { ImageAttachBox } from '../../styles/checkout-page.styles';
import MediaUpload from '../media-upload';
import { mediaUrlGenerator, showToast, ToastTypes, validateFileSize } from '../../utils';
import { isEmpty, isUndefined } from 'lodash';
import { ReactComponent as DocumentIcon } from '../../../assets/order-icon/document.svg';
import { ActivityIcons } from '../../../modules/servi-order/components/activities/activity.style';
import { ILogo } from '@/common/interface';
import { v4 as uuidv4 } from 'uuid';
import ReadFile from '@/common/utils/helpers/fileReader.ts';
import { Text12 } from '@/common/styles';
import ClearIcon from '@mui/icons-material/Clear';
import { AttachedFile } from '@/common/components/media-upload/media-upload.style.ts';
import SelectFileComponent from '@/common/components/requirement-form/select-file.component.tsx';

type Props = {
  questionNo: number;
  question: string;
  control: any;
  errors: any;
  setError: any;
  answersRecieved: boolean;
  requirementId: string;
  setValue: any;
};

const FileUploadQuestionComponent = ({
  question,
  control,
  errors,
  questionNo,
  answersRecieved,
  requirementId,
  setValue,
  setError,
}: Props) => {
  const [imageUploadValues, setImageUploadValues] = useState<{ id: number; image: string; name: string }[]>([
    { id: 0, image: '', name: '' },
  ]);

  const isValidUrl = (urlString: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <QuestionDisplayComponent questionNo={questionNo} question={question} />
      <Box
        sx={{
          border:
            errors[`question${questionNo}`]?.message || errors[`question${questionNo}File`]?.message
              ? '1px solid #e11900'
              : '1px solid #EAEAEA',
          padding: '1em',
          width: '100%',
        }}
      >
        <Typography className='subHeading'>{answersRecieved ? 'Attachments' : 'Upload your files'}</Typography>
        <Controller
          control={control}
          name={`question${questionNo}File`}
          render={({ field }) => (
            <>
              {!answersRecieved ? (
                <>
                  {imageUploadValues.map((value, key) => (
                    <SelectFileComponent
                      setValue={setValue}
                      key={key}
                      index={key}
                      setImageUploadValues={setImageUploadValues}
                      questionNo={questionNo}
                      imageUploadValue={value}
                      setError={setError}
                    />
                  ))}
                  <Typography
                    sx={{
                      fontWeight: '400',
                      fontSize: '12px',
                      color: '#7E7E7E',
                      wordBreak: 'break-all',
                      marginTop: '1em',
                      width: '100%',
                    }}
                  >
                    Tip: Make sure to let buyer know all info you need in file upload.
                  </Typography>
                  <ul
                    style={{
                      fontWeight: '400',
                      fontSize: '12px',
                      color: '#7E7E7E',
                      wordBreak: 'break-all',
                      width: '100%',
                      marginBottom: '1em',
                    }}
                  >
                    <li>Format not supported: .exe, .js</li>
                    <li>Max file size: 100 MB</li>
                  </ul>
                </>
              ) : (
                <div
                  style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}
                >
                  {field.value &&
                    field.value.map(
                      (
                        images: {
                          url: string;
                          originalName: string;
                          fileType: string;
                          size: number;
                        },
                        key: number,
                      ) => {
                        if (isValidUrl(images.url)) {
                          return (
                            <Box
                              key={key}
                              sx={{
                                border: '1px solid #EAEAEA',
                                borderRadius: '2px',
                                padding: '5px 14px',
                                marginTop: '0.5em',
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <ActivityIcons className='attachment'>{<DocumentIcon />}</ActivityIcons>
                              <div
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}
                              >
                                <Link href={images.url} target='_blank' sx={{ color: Color.bgGreyDark, marginLeft: '5px' }}>
                                  {images.originalName}
                                </Link>
                                <Link
                                  href={images.url}
                                  target='_blank'
                                  sx={{ color: Color.bgGreyDark, marginLeft: '5px', fontSize: '12px' }}
                                >
                                  {Math.round((images.size / 1000) * 10) / 10}KB
                                </Link>
                              </div>
                            </Box>
                          );
                        }
                      },
                    )}
                </div>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name={`question${questionNo}`}
          render={({ field }) => (
            <>
              {answersRecieved ? (
                <Typography>{field.value}</Typography>
              ) : (
                <>
                  <Typography className='subHeading'>Describe your attachment in details (optional)</Typography>
                  <TextBoxComponent
                    description={field.value}
                    onChange={field.onChange}
                    errors={errors}
                    characters={1200}
                    placeholder={'Write your answer here.'}
                  />
                </>
              )}
            </>
          )}
        />
      </Box>
      {Boolean(errors[`question${questionNo}`]?.message) && (
        <Typography className='errorMessage'>{errors[`question${questionNo}`]?.message as never}</Typography>
      )}
      {Boolean(errors[`question${questionNo}File`]?.message) && (
        <Typography className='errorMessage'>{errors[`question${questionNo}File`]?.message as never}</Typography>
      )}
    </div>
  );
};

export default FileUploadQuestionComponent;
