import { Box, styled } from '@mui/material';
import { Breakpoints } from '../../../../../../theme';

export const MainFormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 16px;
  max-width: 758px;
  width: 100%;

  border-radius: 4px;
  border: 1px solid var(--line, #eaeaea);
  background: #fff;

  & > .head-container > .head {
    color: var(--black-text, #000);

    /* Subtitle T3 */
    font-size: 20px !important;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 120% */
    letter-spacing: -0.5px;
  }

  & > .head-container > .sub {
    color: #7e7e7e;

    /* Text Regular */
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.5px;
  }

  .sub-head {
    margin-top: 16px;
    color: var(--Black-Text, #000);
    font-size: 16px !important;
    font-style: normal;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  & .form-row {
    display: flex;
    gap: 16px;

    @media (max-width: ${Breakpoints.md}px) {
      flex-direction: column;
      gap: 24px;
    }
  }

  & > .btn-container {
    display: flex;
    gap: 16px;
    align-self: end;

    @media (max-width: ${Breakpoints.md}px) {
      align-self: normal;
      justify-content: space-between;
    }
  }

  & > .btn-container.isView {
    align-self: normal;
    justify-content: space-between;
  }

  & > .view-tile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    & :first-child {
      width: 40%;
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 171.429% */
      letter-spacing: -0.42px;
    }

    & :nth-child(2) {
      width: 60%;
      border-radius: 3px;
      border: 1px solid #eaeaea;
      background: #f6f6f6;
      padding: 10px 16px;
      min-height: 44px;
    }

    @media (max-width: ${Breakpoints.md}px) {
      flex-direction: column;

      & :first-child {
        width: 100%;
      }

      & :nth-child(2) {
        width: 100%;
      }
    }
  }
`;
