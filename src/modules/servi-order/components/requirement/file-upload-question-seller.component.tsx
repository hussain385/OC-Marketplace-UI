import React from 'react';
import QuestionDisplayComponent from '@/common/components/requirement-form/question-display.component';
import { Box, Link, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { ActivityIcons } from '../activities/activity.style';
import { ReactComponent as DocumentIcon } from '@/assets/order-icon/document.svg';
import { Color } from '@/theme';

type Props = {
  questionNo: number;
  question: string;
  answersRecieved: boolean;
  answer?: string;
  attachs?: { url: string; originalName: string; fileType: string; size: number }[] | null;
};

const FileUploadQuestionSellerComponent = ({ questionNo, question, answersRecieved, answer, attachs }: Props) => {
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
      {!answersRecieved && (
        <Box className={'requirement-seller-option-box'}>
          <img src={require('@/assets/requirement-icons/file.png').default} style={{ width: '18px', height: '18.33px' }} />
          <Typography sx={{ color: '#7E7E7E' }}>File upload</Typography>
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
          <Typography>{answer && !isEmpty(answer) ? answer : ''}</Typography>
          <Typography className='subHeading'>Attachments</Typography>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '10px' }}>
            {answersRecieved &&
              attachs &&
              !isEmpty(attachs) &&
              attachs.map((images: { url: string; originalName: string; fileType: string; size: number }, key: number) => {
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
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '10px' }}>
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
              })}
          </div>
        </Box>
      )}
    </div>
  );
};

export default FileUploadQuestionSellerComponent;
