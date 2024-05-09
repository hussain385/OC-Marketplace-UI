import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ReactSortable } from 'react-sortablejs';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { storePictures } from '../account/company-profile/company-profile.util';
import { Controller } from 'react-hook-form';
import { MuiBox } from '../account/professional-services';
import { Color } from '../../../theme';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { RemoveImageMenuComponent } from '../account/professional-services/remove-image-menu.component';
import ReadFile from '../../../common/utils/helpers/fileReader';
import { subText } from '../manage-listing/manage-listing-form/overview.view';
import { showToast, ToastTypes } from '../../../common/utils';
import { useDeleteMediaMutation } from '../../../redux/apis/mediaApi';

type componentProps = {
  imageLoop: { id: number; image: string; name: string }[];
  setImageLoop: React.Dispatch<React.SetStateAction<{ id: number; image: string; name: string }[]>>;
  setValue: any;
  errors: any;
  control: any;
  setError: any;
};

const ServiceImageComponent = ({ imageLoop, setImageLoop, setValue, errors, control, setError }: componentProps) => {
  const [fieldValueNumber, setFieldValueNumber] = useState<{ id: number; image: string; name: string }>({
    id: 0,
    image: '',
    name: '',
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteMedia, { isLoading, error: deleteMediaError }] = useDeleteMediaMutation();
  useEffect(() => {
    if (!isUndefined(deleteMediaError)) {
      const message = deleteMediaError as any;
      showToast(message.data.message, ToastTypes.ERROR);
    }
  }, [deleteMediaError]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChangePic = (idNumber: number) => {
    handleClose();
    const box = document.getElementById(`image${idNumber}`) as HTMLDivElement;
    box.click();
  };

  const handleDelete = async (picSelected: { id: number; image: string; name: string }) => {
    if (
      !isNull(
        picSelected.image.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        ),
      )
    ) {
      const res: any = await deleteMedia({ uuid: picSelected.name });
      if ('data' in res) {
        handleClose();
        setImageLoop(() => {
          const updatedImages: { id: number; image: string; name: string }[] = [];
          imageLoop.forEach((image) => {
            if (image.id !== picSelected.id) {
              updatedImages.push({
                id: image.id < picSelected.id ? image.id : image.id - 1,
                image: image.image,
                name: image.name,
              });
            }
          });
          showToast('Picture updated successfully', ToastTypes.SUCCESS);
          updatedImages.map(async (image, key) => {
            const file = isEmpty(image.image) ? [] : await storePictures('service', image.image, 'asd', true);
            setValue(`servicePic${key + 1}`, file);
          });

          if (imageLoop.length === 4 && !isEmpty(imageLoop[3].image)) {
            updatedImages.push({ id: 3, image: '', name: '' });
          }

          return updatedImages;
        });
      } else {
        handleClose();
      }
    } else {
      handleClose();
      setImageLoop(() => {
        const updatedImages: { id: number; image: string; name: string }[] = [];
        imageLoop.forEach((image, key) => {
          if (image.id !== picSelected.id) {
            updatedImages.push({
              id: image.id < picSelected.id ? image.id : image.id - 1,
              image: image.image,
              name: 'image',
            });
          }
        });

        updatedImages.map(async (image, key) => {
          const file = isEmpty(image.image) ? [] : await storePictures('service', image.image, 'asd', true);
          setValue(`servicePic${key + 1}`, file);
        });

        if (imageLoop.length === 4 && !isEmpty(imageLoop[3].image)) {
          updatedImages.push({ id: 3, image: '', name: '' });
        }

        return updatedImages;
      });
    }
  };

  return (
    <Box sx={{ marginTop: '1em', marginBottom: '2em' }}>
      <Typography className='subHeading'>Image</Typography>
      <Typography sx={subText}>Upload images that represent your service </Typography>
      <ReactSortable
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: imageLoop.length === 4 ? 'space-between' : 'flex-start',
        }}
        list={imageLoop}
        setList={(e) => {
          setImageLoop(e);
          e.map(async (value, key) => {
            if (!isEmpty(value.image)) {
              setValue(`servicePic${key + 1}`, await storePictures('service', value.image, 'asd', true));
            }
          });
        }}
        group='cards'
        animation={150}
      >
        {imageLoop.map((value) => (
          <Box key={value.id} sx={{ marginRight: { xs: '0', md: imageLoop.length < 4 ? '1em' : '0' } }}>
            <Controller
              name={`servicePic${value.id + 1}`}
              control={control}
              render={({ field }) => {
                return (
                  <>
                    <label htmlFor={`image${value.id}`}>
                      <MuiBox
                        sx={{
                          width: { xs: '40vw', md: '208px' },
                          position: 'relative',
                          backgroundImage: !isEmpty(value.image)
                            ? `url(${value.image.toString()}) !important`
                            : Color.bgGreyLight,
                          border: value.image ? 'none' : `1px dashed  ${Color.textBlue}`,
                        }}
                      >
                        {isEmpty(field.value) && isEmpty(value.image) ? (
                          <Typography
                            sx={{
                              width: '70%',
                              fontSize: '12px',
                              textAlign: 'center',
                            }}
                          >
                            Tap or drop files here to upload
                          </Typography>
                        ) : (
                          <>
                            <button
                              onClick={(e) => {
                                handleClick(e);
                                setFieldValueNumber(value);
                                e.preventDefault();
                              }}
                              style={{
                                position: 'absolute',
                                top: 5,
                                right: 10,
                                border: 'none',
                                backgroundColor: 'transparent',
                              }}
                            >
                              <HiOutlineDotsHorizontal fontSize={20} color='#3e63ea' />
                            </button>
                            <RemoveImageMenuComponent
                              handleChangePic={() => handleChangePic(fieldValueNumber.id)}
                              handleDelete={() => handleDelete(fieldValueNumber)}
                              anchorEl={anchorEl}
                              handleClose={handleClose}
                              open={open}
                              disabled={false}
                              isLoading={isLoading}
                            />
                          </>
                        )}
                      </MuiBox>
                    </label>
                    <Box sx={{ display: 'none' }}>
                      <input
                        id={`image${value.id}`}
                        name={`image${value.id}`}
                        type='file'
                        onClick={(e) => {
                          (e.target as HTMLInputElement).value = '';
                        }}
                        onChange={(e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                          setError(`servicePic${value.id + 1}`, { type: undefined, message: undefined }, { shouldFocus: false });
                          const target = e.target as typeof e.target & {
                            files: FileList;
                            result: string;
                          };
                          if (target.files[0].size <= 5000000) {
                            const res = ReadFile(target.files[0]);
                            res.then((res: any) => {
                              setImageLoop(() => {
                                let imageString = '';
                                const images = imageLoop.map((image) => {
                                  if (image.id === value.id) {
                                    imageString = image.image[0];
                                  }
                                  return image.id === value.id
                                    ? {
                                        id: value.id,
                                        image: res as string,
                                        name: 'image',
                                      }
                                    : image;
                                });
                                if (images.length < 4 && isEmpty(imageString)) {
                                  return [
                                    ...images,
                                    {
                                      id: imageLoop.length,
                                      image: '',
                                      name: 'image',
                                    },
                                  ];
                                }

                                return images;
                              });
                            });
                            setValue(`servicePic${value.id + 1}`, target.files);
                          } else {
                            setError(
                              `servicePic${value.id + 1}`,
                              { message: `The picture ${value.id + 1} file size cannot exceed 5mb` },
                              { shouldFocus: true },
                            );
                            setValue(`servicePic${value.id + 1}`, []);
                          }
                        }}
                        accept={'image/*'}
                      />
                    </Box>
                  </>
                );
              }}
            />
          </Box>
        ))}
      </ReactSortable>
      {Boolean(errors.servicePic1?.message) && (
        <Typography className='errorMessage'>{errors.servicePic1?.message as never}</Typography>
      )}
      {Boolean(errors.servicePic2?.message) && (
        <Typography className='errorMessage'>{errors.servicePic2?.message as never}</Typography>
      )}
      {Boolean(errors.servicePic3?.message) && (
        <Typography className='errorMessage'>{errors.servicePic3?.message as never}</Typography>
      )}
      {Boolean(errors.servicePic4?.message) && (
        <Typography className='errorMessage'>{errors.servicePic4?.message as never}</Typography>
      )}
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
        Tip: The first one you select will be displayed as the main image. (max 4 images).
      </Typography>
      <ul
        style={{
          fontWeight: '400',
          fontSize: '12px',
          color: '#7E7E7E',
          wordBreak: 'break-all',
          width: '100%',
        }}
      >
        <li>Requirements: Minimum 150 x 150 px (recommended: 400 x 400 px).</li>
        <li>Format: .jpg or .png </li>
        <li>Max file size: 5 MB</li>
      </ul>
    </Box>
  );
};

export default ServiceImageComponent;
