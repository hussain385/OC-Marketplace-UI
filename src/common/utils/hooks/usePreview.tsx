import React, { useCallback, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { pictureCustomName } from '..';

import ReadFile from '../helpers/fileReader';
import { renameUpload, validSize } from '../helpers/renameUpload';

type FileUpload = {
  uploadFile: File[] | string | Blob | File;
  name?: string;
  invalidSize?: string;
};

export function useImageUploaderManager() {
  const [dropFrontPicture, setDropFront] = useState<string>('');
  const [companyPicture, setCompanyFront] = useState<{
    id: string;
    url: string;
  }>({ id: '123', url: '' });
  const [companyProfile, setCompanyProfile] = useState<FileUpload>({
    uploadFile: [],
    name: '',
    invalidSize: '',
  });
  const [nationalId, setNationalId] = useState<FileUpload>({
    uploadFile: [],
    name: '',
    invalidSize: '',
  });
  const [selfie, setSelfie] = useState<FileUpload>({
    uploadFile: [],
    name: '',
  });
  const [back, setBack] = useState<FileUpload>({
    uploadFile: [],
    name: '',
  });

  const [invalidFormatFront, setInvalidSizeFront] = useState<{
    isValid: boolean;
    error: string;
  }>({
    isValid: false,
    error: '',
  });

  const [invalidFormatBack, setInvalidSizeBack] = useState<{
    isValid: boolean;
    error: string;
  }>({
    isValid: false,
    error: '',
  });

  const [invalidFormatSelfie, setInvalidSizeSelfie] = useState<{
    isValid: boolean;
    error: string;
  }>({
    isValid: false,
    error: '',
  });

  const [dropSelfiePicture, setDropSelfie] = useState<string>('');

  const [dropBackPicture, setDropBack] = useState<string>('');

  const imgRef = useRef<HTMLImageElement | null>(null);
  const companyLogoRef = useRef<HTMLImageElement | null>(null);
  const selfieRef = useRef<HTMLImageElement | null>(null);
  const backRef = useRef<HTMLImageElement | null>(null);

  const id = uuidv4();

  const renameFile = [`account-idfication@${id}`, `account-photo@${id}`];

  const allowedExtension = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/jfif ',
    'image/pjpeg ',
    'image/pjp',
    'image/webp',
    'image/bmp',
    // 'image/svg+xml',
  ];

  const handleCompanyProfile = useCallback((e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as typeof e.target & {
      files: FileList;
      result: string;
    };

    setCompanyProfile({
      uploadFile: target.files[0],
      name: target.files[0].name,
      invalidSize: String(target.files[0].size),
    });
    const res = ReadFile(target.files[0]);

    res.then((res) => setCompanyFront({ id: '123', url: res as string }));
  }, []);

  const dragCompanyProfile = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    setCompanyProfile({
      uploadFile: e.dataTransfer.files[0],
      name: e.dataTransfer.files[0].name,
    });

    const res = ReadFile(e.dataTransfer.files[0]);

    res.then((res) => setCompanyFront({ id: '123', url: res as string }));
  }, []);

  const handleDropFront = useCallback((e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, uid: string) => {
    const target = e.target as typeof e.target & {
      files: FileList;
      result: string;
    };

    const renameUploadFile = target.files[0];

    const nationalNewFile = pictureCustomName(target.files, 'user-identity-front', uid ?? id);

    const sizeValid = validSize(Number(nationalNewFile.size / 1024 / 1024));

    if (sizeValid) {
      setInvalidSizeFront({
        isValid: true,
        error: 'File must not exceed 5 MB.',
      });
    } else {
      if (!allowedExtension.includes(nationalNewFile.type)) {
        setInvalidSizeFront({
          isValid: true,
          error: 'File type is not valid.',
        });
      } else {
        setInvalidSizeFront({
          isValid: false,
          error: '',
        });
        setNationalId({
          uploadFile: nationalNewFile,
          name: renameUploadFile.name,
        });

        const res = ReadFile(target.files[0]);

        res.then((res) => setDropFront(res as string));
      }
    }

    // const fileSize = nationalNewFile.size / 1024 / 1024; // in MiB
    // if (fileSize > 5) {
    // 	alert('File must not exceed 5 MB');
    // 	setInvalidSize({ isValid: true, error: 'File must not exceed 5 MB' });
    // }
  }, []);

  const handleDropSelfie = useCallback((e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, uid: string) => {
    const target = e.target as typeof e.target & {
      files: FileList;
      result: string;
    };

    const renameUploadFile = target.files[0];

    const selfieNewFile = pictureCustomName(target.files, 'user-photo', uid ?? id);

    const sizeValid = validSize(Number(selfieNewFile.size / 1024 / 1024));

    if (sizeValid) {
      setInvalidSizeSelfie({
        isValid: true,
        error: 'File must not exceed 5 MB.',
      });
    } else {
      if (!allowedExtension.includes(selfieNewFile.type)) {
        setInvalidSizeSelfie({
          isValid: true,
          error: 'File type is not valid.',
        });
      } else {
        setInvalidSizeSelfie({
          isValid: false,
          error: '',
        });
        setSelfie({
          uploadFile: selfieNewFile,
          name: renameUploadFile.name,
        });
        const res = ReadFile(target.files[0]);

        res.then((res) => setDropSelfie(res as string));
      }
    }
  }, []);

  const handleDropBack = useCallback((e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>, uid: string) => {
    const target = e.target as typeof e.target & {
      files: FileList;
      result: string;
    };

    const renameUploadFile = target.files[0];

    const backNewFile = pictureCustomName(target.files, `user-identity-back`, uid ?? id);

    const sizeValid = validSize(Number(backNewFile.size / 1024 / 1024));

    if (sizeValid) {
      setInvalidSizeBack({
        isValid: true,
        error: 'File must not exceed 5 MB.',
      });
    } else {
      if (!allowedExtension.includes(backNewFile.type)) {
        setInvalidSizeBack({
          isValid: true,
          error: 'File type is not valid',
        });
      } else {
        setInvalidSizeBack({
          isValid: false,
          error: '',
        });
        setBack({
          uploadFile: backNewFile,
          name: renameUploadFile.name,
        });
        const res = ReadFile(target.files[0]);
        res.then((res) => setDropBack(res as string));
      }
    }
  }, []);

  // drop front event
  const dragFront = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const renameUploadFile = e.dataTransfer.files[0];

    const nationalNewFile = renameUpload(
      renameUploadFile,
      renameFile[0],
      renameUploadFile.name,
      renameUploadFile.type,
      renameUploadFile.lastModified,
    );
    const sizeValid = validSize(Number(nationalNewFile.size / 1024 / 1024));

    if (sizeValid) {
      setInvalidSizeFront({
        isValid: true,
        error: 'File must not exceed 5 MB.',
      });
    } else {
      if (!allowedExtension.includes(nationalNewFile.type)) {
        setInvalidSizeFront({ isValid: true, error: 'File type is not valid' });
      } else {
        setInvalidSizeFront({
          isValid: false,
          error: '',
        });
        setNationalId({
          uploadFile: nationalNewFile,
          name: renameUploadFile.name,
        });

        const res = ReadFile(e.dataTransfer.files[0]);

        res.then((res) => setDropFront(res as string));
      }
    }
  }, []);

  // back front event
  const dragSelfie = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const renameUploadFile = e.dataTransfer.files[0];

    const selfieNewFile = renameUpload(
      renameUploadFile,
      renameFile[1],
      renameUploadFile.name,
      renameUploadFile.type,
      renameUploadFile.lastModified,
    );

    const sizeValid = validSize(Number(selfieNewFile.size / 1024 / 1024));

    if (sizeValid) {
      setInvalidSizeSelfie({
        isValid: true,
        error: 'File must not exceed 5 MB.',
      });
    } else {
      if (!allowedExtension.includes(selfieNewFile.type)) {
        setInvalidSizeSelfie({
          isValid: true,
          error: 'File type is not valid.',
        });
      } else {
        setInvalidSizeSelfie({
          isValid: false,
          error: '',
        });
        setSelfie({
          uploadFile: selfieNewFile,
          name: renameUploadFile.name,
        });

        const res = ReadFile(e.dataTransfer.files[0]);

        res.then((res) => setDropSelfie(res as string));
      }
    }
  }, []);

  // back front event
  const dragBack = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const renameUploadFile = e.dataTransfer.files[0];

    const backNewFile = renameUpload(
      renameUploadFile,
      renameFile[0],
      renameUploadFile.name,
      renameUploadFile.type,
      renameUploadFile.lastModified,
    );

    const sizeValid = validSize(Number(backNewFile.size / 1024 / 1024));

    if (sizeValid) {
      setInvalidSizeBack({ isValid: true, error: 'File must not exceed 5 MB' });
    } else {
      if (!allowedExtension.includes(backNewFile.type)) {
        setInvalidSizeBack({ isValid: true, error: 'File type is not valid' });
      } else {
        setInvalidSizeBack({
          isValid: false,
          error: '',
        });
        setBack({
          uploadFile: backNewFile,
          name: renameUploadFile.name,
        });
        const res = ReadFile(e.dataTransfer.files[0]);

        res.then((res) => setDropBack(res as string));
      }
    }
  }, []);

  const dragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }, []);

  const dragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }, []);

  const onResetFrontUpload = useCallback(() => {
    setDropFront('');
    setNationalId({
      uploadFile: '',
      name: '',
    });
  }, []);

  const onResetBackUpload = useCallback(() => {
    setDropBack('');
    setBack({
      uploadFile: '',
      name: '',
    });
  }, []);

  const onResetSelfieUpload = useCallback(() => {
    setDropSelfie('');
    setSelfie({
      uploadFile: '',
      name: '',
    });
  }, []);

  return {
    onResetFrontUpload,
    onResetBackUpload,
    onResetSelfieUpload,
    invalidFormatFront,
    invalidFormatBack,
    invalidFormatSelfie,
    companyPicture,
    companyProfile,
    companyLogoRef,
    nationalId,
    selfie,
    back,
    imgRef,
    selfieRef,
    backRef,
    dropFrontPicture,
    dropSelfiePicture,
    dropBackPicture,
    setNationalId,
    handleDropFront,
    handleDropBack,
    handleDropSelfie,
    setSelfie,
    setBack,
    dragCompanyProfile,
    setCompanyFront,
    handleCompanyProfile,
    dragFront,
    dragSelfie,
    dragBack,
    dragOver,
    dragLeave,
    setDropFront,
    setDropBack,
    setDropSelfie,
    setInvalidSizeFront,
    setInvalidSizeBack,
    setInvalidSizeSelfie,
  };
}
