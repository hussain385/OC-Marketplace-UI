import { Box, styled } from '@mui/material';
import { Breakpoints } from '../../../../../../theme';

export const AddMainContainer = styled(Box)`
  padding: 40px 56px;
  margin: 16px;
  gap: 24px;
  display: flex;
  max-width: 768px;
  width: 100%;
  min-height: 240px;
  align-items: center;

  border-radius: 4px;
  border: 1px solid #eaeaea;

  & > svg {
    width: 320px;
    height: 200px;
    transform: rotateY(180deg);
  }

  & > div {
    & .head {
      color: var(--black-text, #000);

      /* Subtitle T3 */
      font-size: 20px !important;
      font-style: normal;
      font-weight: 700;
      line-height: 24px; /* 120% */
      letter-spacing: -0.5px;
      margin-bottom: 8px;
    }

    & .sub {
      color: #7e7e7e;

      font-size: 14px !important;
      font-style: normal;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.5px;
      margin-bottom: 24px;
    }

    & > button {
      padding: 8px 32px;
      border-radius: 2px;
    }
  }

  & > .card-box {
    display: flex;
    gap: 16px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid var(--line, #eaeaea);

    & > .text-container {
      display: flex;
      justify-content: space-between;
      align-items: start;
      width: 100%;

      & > .container-h {
        display: flex;
        flex-wrap: wrap;
        align-items: start;
        gap: 8px;

        & > .head-container {
          display: flex;
          flex-direction: column;
          gap: 10px;

          & > .head-bank > span {
            font-weight: 700;
          }
        }
      }

      & > .menu-btn {
        padding: 0;
      }
    }

    & > img {
      width: 56px;
      height: 56px;
    }
  }

  & > .warn-admin {
    display: flex;
    width: 100%;
    gap: 10px;
    font-size: 12px !important;
    align-items: center;
    padding: 5px 10px;
    border-radius: 4px;
    background: rgba(255, 236, 169, 0.5);
  }

  & > .pending-btn-container {
    display: flex;
    justify-content: space-between;
    width: 100%;

    & > div {
      display: flex;
      gap: 16px;
    }
  }

  @media (max-width: ${Breakpoints.md}px) {
    flex-direction: column;
  }
`;

export const VerifyAccountModal = styled(Box)`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  & > svg {
    width: 72px;
    height: 72px;
  }

  & > .head {
    color: var(--black-text, #000);
    text-align: center;
    font-size: 20px !important;
    font-style: normal;
    font-weight: 700;
    line-height: 26px; /* 130% */
    letter-spacing: -0.4px;
  }

  & > .sub {
    color: var(--grey-text-7-e, #7e7e7e);
    text-align: center;

    /* Text Regular */
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.5px;
  }
`;

export const AddBankModal = styled(Box)`
  & > .sub-body {
    color: var(--grey-text-7-e, #7e7e7e);

    font-size: 14px !important;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
    letter-spacing: -0.5px;
    margin-bottom: 24px;
  }

  & > .subHeading {
    margin-bottom: 8px;
  }

  & .bank-tile {
    display: flex;
    gap: 16px;
    align-items: center;

    border-radius: 4px;
    border: 1px solid var(--line, #eaeaea);

    & > img {
      width: 56px;
      height: 56px;
    }

    @media (max-width: ${Breakpoints.md}px) {
      flex-direction: column;
      align-items: start;
    }
  }

  & > .bank-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }
`;
