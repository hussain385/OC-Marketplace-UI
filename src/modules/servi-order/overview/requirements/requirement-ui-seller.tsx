import React from 'react';
import { Box } from '@mui/material';
import FreeTextSellerComponent from '../../components/requirement/free-text-seller.component';
import MultiselectQuestionSellerComponent from '../../components/requirement/multiselect-question-seller.component';
import FileUploadQuestionSellerComponent from '../../components/requirement/file-upload-question-seller.component';
import SelectQuestionSellerComponent from '../../components/requirement/select-question-seller.component';
import '../../override.style.css';
import { IRequirement } from '@/common/interface/busines-company-profile-interface';

type componentPropType = {
  requirementquestions: IRequirement[];
  answersRecieved: boolean;
};

const RequirementUiSeller = ({ requirementquestions, answersRecieved }: componentPropType) => {
  return (
    <Box>
      {requirementquestions.map((value, key) => {
        if (value.type === 'FREE_TEXT') {
          return (
            <FreeTextSellerComponent
              key={key}
              question={value.description}
              questionNo={key + 1}
              answersRecieved={answersRecieved}
              answer={value.answers}
            />
          );
        } else if (value.type === 'MULTIPLE_CHOICE' && value.multipleSelection) {
          return (
            <MultiselectQuestionSellerComponent
              answer={value.answers as number[]}
              key={key}
              options={value.options ? value.options : []}
              questionNo={key + 1}
              question={value.description}
              answersRecieved={answersRecieved}
            />
          );
        } else if (value.type === 'FILE_UPLOAD') {
          return (
            <FileUploadQuestionSellerComponent
              key={key}
              question={value.description}
              questionNo={key + 1}
              answersRecieved={answersRecieved}
              answer={value.answers as string}
              attachs={value.attachs}
            />
          );
        } else if (value.type === 'MULTIPLE_CHOICE') {
          return (
            <SelectQuestionSellerComponent
              answer={value.answers as number[]}
              key={key}
              options={value.options ? value.options : []}
              questionNo={key + 1}
              question={value.description}
              answersRecieved={answersRecieved}
            />
          );
        }
      })}
    </Box>
  );
};

export default RequirementUiSeller;
