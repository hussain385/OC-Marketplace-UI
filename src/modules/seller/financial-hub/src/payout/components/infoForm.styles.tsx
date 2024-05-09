import { Box, styled } from '@mui/material';
import { Breakpoints } from '../../../../../../theme';

export const InfoFormModal = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  & > .head {
    color: var(--black-text, #000);
    font-size: 24px !important;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.72px;
    margin-bottom: 16px;
  }

  & > .body {
    color: var(--black-text, #000);
    font-size: 14px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.42px;

    & > span {
      color: var(--black-text, var(--pri-blue, #2752e7));
      font-weight: 600;
    }
  }

  & > .body-light {
    color: var(--grey-text-7e, #7e7e7e);
    text-align: center;

    /* Text Regular */
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.5px;
  }

  & > .resend-text {
    color: var(--grey-text-7-e, #7e7e7e);
    text-align: center;
    font-size: 12px !important;
    font-style: normal;
    font-weight: 700;
    line-height: 135%; /* 16.2px */
    letter-spacing: -0.5px;
    margin-top: 16px;

    & > span {
      color: var(--text-hint, var(--pri-blue, #2752e7));
      font-size: 12px !important;
      font-style: normal;
      font-weight: 700;
      line-height: 135%;
      letter-spacing: -0.5px;
      cursor: pointer;
    }
  }

  & > button {
    width: 100%;
    border-radius: 4px;
    max-width: 320px;
    padding: 10px 0px;
    margin-top: 40px;
  }

  @media (max-width: ${Breakpoints.sm}px) {
    align-items: start;
    text-align: start;

    & :nth-child(2) {
      margin-bottom: 16px;
    }

    & > button {
      max-width: 100%;
    }
  }
`;
