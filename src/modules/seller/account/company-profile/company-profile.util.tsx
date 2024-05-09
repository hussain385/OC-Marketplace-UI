import { Color } from '../../../../theme';

export const storePictures = async (name: string, url: string, uid: string, professionalServices?: boolean) => {
  if (professionalServices) {
    const blob = await fetch(url).then((res) => res.blob());
    return new File([blob], `${name}.${blob.type.split('/').pop()}`, { type: blob.type });
  }

  const blob = await fetch(url).then((res) => res.blob());
  return new File([blob], `${name}@${uid}.${blob.type.split('/').pop()}`, { type: blob.type });
};

export type awardType = {
  number: number | string;
  open: boolean;
  edit: boolean;
  data: {
    uid: string;
    awardPic: File[];
    title: string;
    issuer: string;
    year: string;
    url: string;
    description: string;
  };
};

export type staffType = {
  number: number;
  open: boolean;
  edit: boolean;
  data: {
    uid: string;
    staffPic: File[];
    nameOfStaff: string;
    role: string;
    experience: string;
    url: string;
  };
};

export const topBtnStyle = {
  background: Color.priWhite,
  borderRadius: '2px',
  position: 'absolute',
  top: '-3.8em',
  right: '5em',
  height: '44px',
  textTransform: 'capitalize',
  lineHeight: 1.71,
  paddingInline: '2em',
  letterSpacing: '-0.5px',
  fontSize: '16px',
  fontWeight: 'bold',
};

export const bottomBtnStyle = {
  background: Color.priWhite,
  borderRadius: '2px',
  height: '44px',
  textTransform: 'capitalize',
  lineHeight: 1.71,
  marginBottom: '1em',
  letterSpacing: '-0.5px',
  fontSize: '16px',
  fontWeight: 'bold',
};
