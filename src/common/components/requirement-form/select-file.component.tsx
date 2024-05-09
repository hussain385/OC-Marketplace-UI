import React, { useRef } from 'react';
import { isEmpty } from 'lodash';
import { ImageAttachBox } from '@/common/styles/checkout-page.styles.ts';
import { Typography } from '@mui/material';
import { Color } from '@/theme.ts';
import { AttachedFile } from '@/common/components/media-upload/media-upload.style.ts';
import { Text12 } from '@/common/styles';
import ClearIcon from '@mui/icons-material/Clear';
import { showToast, ToastTypes, validateFileSize } from '@/common/utils';
import ReadFile from '@/common/utils/helpers/fileReader.ts';
import { ReactComponent as AttachmentIcon } from '@/assets/order-icon/attachment.svg';

type componentPropType = {
  imageUploadValue: { id: number; image: string; name: string };
  setImageUploadValues: React.Dispatch<React.SetStateAction<{ id: number; image: string; name: string }[]>>;
  setError: any;
  questionNo: number;
  setValue: any;
  index: number;
};

const SelectFileComponent = ({
  imageUploadValue,
  setImageUploadValues,
  setError,
  questionNo,
  setValue,
  index,
}: componentPropType) => {
  const inputRef = useRef<HTMLInputElement>();

  const __onClearFiles = (deletedFile: { id: number }) => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    setImageUploadValues((prevState) => {
      const newImageState = prevState.filter((state) => state.id !== deletedFile.id).map((state, key) => ({ ...state, id: key }));
      setValue(
        `question${questionNo}File`,
        newImageState.filter((image) => !isEmpty(image.image)),
      );
      return newImageState;
    });
  };

  return (
    <>
      {isEmpty(imageUploadValue.image) ? (
        <label htmlFor={`${index}`}>
          <ImageAttachBox>
            <AttachmentIcon />
            <Typography sx={{ fontWeight: '600', color: Color.priBlue, fontSize: '12px' }}>
              Drag and drop or browse files
            </Typography>
          </ImageAttachBox>
        </label>
      ) : (
        <AttachedFile>
          <Text12>{imageUploadValue.name}</Text12>
          <ClearIcon
            sx={{ color: Color.negative, fontSize: '14px', marginLeft: '10px' }}
            onClick={() => __onClearFiles(imageUploadValue)}
          />
        </AttachedFile>
      )}
      <input
        type='file'
        name='file'
        id={`${index}`}
        hidden
        ref={(ref) => {
          if (ref) {
            inputRef.current = ref;
          }
        }}
        onChange={(e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const target = e.target as typeof e.target & {
            files: FileList;
            result: string;
          };
          if (validateFileSize(target.files[0], 100000000)) {
            const res = ReadFile(target.files[0]);
            setError(`question${questionNo}File`, { message: undefined }, { shouldFocus: false });
            res.then((res: any) => {
              setImageUploadValues((prevState) => {
                let imageString = '';
                const images = prevState.map((image) => {
                  if (image.id === imageUploadValue.id) {
                    imageString = image.image[0];
                  }
                  return image.id === imageUploadValue.id
                    ? {
                        id: imageUploadValue.id,
                        image: res as string,
                        name: target.files[0].name,
                      }
                    : image;
                });
                if (images.length < 4 && isEmpty(imageString)) {
                  setValue(`question${questionNo}File`, images);
                  return [
                    ...images,
                    {
                      id: prevState.length,
                      image: '',
                      name: 'image',
                    },
                  ];
                }

                setValue(`question${questionNo}File`, images);
                return images;
              });
            });
          } else {
            showToast('File size is bigger than 100 mb', ToastTypes.ERROR);
            setError(`question${questionNo}File`, { message: 'File size is bigger than 100 mb' }, { shouldFocus: false });
          }
        }}
      />
    </>
  );
};

export default SelectFileComponent;
