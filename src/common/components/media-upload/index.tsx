import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDeleteMediaMutation, useUploadMediaMutation } from '../../../redux/apis/mediaApi';
import ClearIcon from '@mui/icons-material/Clear';
import { AttachedFile, UploadFilesButton } from './media-upload.style';
import { ReactComponent as AttachmentIcon } from '../../../assets/icons/attach_icon_2.svg';
import { Text12 } from '../../styles';
import { Color } from '../../../theme';
import { showToast, ToastTypes, validateFileSize } from '../../utils';
import { BLACKLIST_FILE_EXT } from '../../constants';
import { ILogo } from '@/common/interface';

interface IMediaUploadProps {
  options: FormData;
  maxUploadFileSize?: number;
  blackListExt?: string[];
  shouldClearAttachment?: boolean;
  uploadButtonElement?: React.ReactNode;
  onBeforeUpload?: () => void;
  onFinishUpload?: (response: ILogo & any) => void;
  onError?: (e: any) => void;
}

const MediaUpload = ({
  options,
  maxUploadFileSize,
  blackListExt,
  uploadButtonElement,
  shouldClearAttachment,
  onBeforeUpload,
  onFinishUpload,
  onError,
}: IMediaUploadProps) => {
  const [useUploadMedia] = useUploadMediaMutation();
  const [deleteMedia] = useDeleteMediaMutation();
  const [fileName, setFileName] = useState<string>('');
  const [mediaResponse, setMediaResponse] = useState<ILogo>();
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const fileSize = maxUploadFileSize ? maxUploadFileSize : 1000000; //default 1 mb
  const blacklist = blackListExt ? blackListExt : BLACKLIST_FILE_EXT;
  const fieldId = uuidv4();
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (shouldClearAttachment) {
      setFileName('');
      if (inputRef && inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }, [shouldClearAttachment]);

  const __onClearFiles = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    setFileName('');
    deleteUploadedFile();
    setMediaResponse(undefined);
    onFinishUpload && onFinishUpload(undefined);
  };

  const uploadFile = async (file: File) => {
    const data = options;
    data.delete('media');
    data.append('media', file);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const response = await useUploadMedia({ data: data });
    return response;
  };

  const deleteUploadedFile = async () => {
    await deleteMedia({ uuid: mediaResponse?.uid as string });
    setMediaResponse(undefined);
  };

  return (
    <Box>
      {isEmpty(fileName) ? (
        <label htmlFor={fieldId} style={{ display: 'inline-block' }}>
          {uploadButtonElement ? (
            uploadButtonElement
          ) : (
            <UploadFilesButton sx={{ marginY: '16px' }}>
              <AttachmentIcon style={{ marginRight: '10px' }} />
              Upload files
            </UploadFilesButton>
          )}
        </label>
      ) : (
        <AttachedFile>
          <Text12>{fileName}</Text12>
          {isFileUploading ? (
            <CircularProgress size={20} sx={{ color: '#c4c4c4', marginX: 2 }} />
          ) : (
            <ClearIcon sx={{ color: Color.negative, fontSize: '14px', marginLeft: '10px' }} onClick={() => __onClearFiles()} />
          )}
        </AttachedFile>
      )}
      <Box>
        <input
          type='file'
          name='file'
          id={fieldId}
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
            onBeforeUpload && onBeforeUpload();
            if (validateFileSize(target.files[0], fileSize)) {
              const ext = target.files[0].name.split('.').pop() as string;
              if (blacklist.includes(ext)) {
                onError && onError({ message: 'Files are not allowd' });
                showToast('File should not be executable', ToastTypes.ERROR);
              } else {
                setIsFileUploading(true);
                setFileName(target.files[0].name);
                uploadFile(target.files[0]).then((res: any) => {
                  if (res.error && res.error.status === 401) {
                    setIsFileUploading(false);
                    setFileName('');
                    showToast('Sorry, we cannot upload your file at the moment due to session expired.', ToastTypes.ERROR);
                    onError && onError({ message: 'Session is expired' });
                  }
                  if (res.data && res.data.data.newMedia) {
                    setIsFileUploading(false);
                    setMediaResponse(res.data.data.newMedia);
                    onFinishUpload && onFinishUpload(res.data.data.newMedia);
                  }
                });
              }
            } else {
              showToast('File size is bigger than 100 mb', ToastTypes.ERROR);
              onError && onError({ message: 'File size is bigger' });
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default MediaUpload;
