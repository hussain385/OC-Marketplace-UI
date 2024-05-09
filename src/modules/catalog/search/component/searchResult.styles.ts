import { styled } from '@mui/material';

export const MainCatalogsContainer = styled('div')`
  max-width: 1440px;
  margin-inline: auto;
  margin-top: 24px;

  & .sort-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;

    & .MuiTypography-root {
      color: #7e7e7e;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      letter-spacing: -0.42px;
    }
  }

  & .pagination-container {
    display: flex;
    justify-content: end;
  }

  & > .empty-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 260px);
    flex-direction: column;
  }
`;

export const OptionsContainer = styled('div')`
  display: flex;
  gap: 6px;
  width: 100%;
  align-items: center;
  margin-top: 24px;

  & .options {
    display: flex;
    gap: 4px;
  }
`;

export const CatalogContainer = styled('div')`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    justify-content: center;
  }
`;
