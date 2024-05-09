import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const MilestoneTimeline = styled(Box)`
  & > .milestone-main {
    margin-top: 10px;

    & > .milestone-head {
      margin-top: 6px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;

      & > .head {
        margin-left: 16px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > * {
          font-weight: 700;
          color: #404145;
        }
      }

      & .flag-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #dadbdd;
        border-radius: 90px;

        & > svg {
          color: #96979c;
        }
      }

      & > .init,
      & > .flag-icon {
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
      }
    }

    & > .milestone-body {
      margin-left: 16px;
      border-left: 1px solid #dadbdd;
      height: 71px;
      padding-left: 32px;

      & > .days {
        color: #74767d;
      }
    }
  }

  & > .milestone-main:last-child {
    & > .milestone-body {
      border-left: none;
      height: auto;
    }
  }
`;
