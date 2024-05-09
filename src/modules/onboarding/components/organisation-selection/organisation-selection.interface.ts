import React from 'react';

export interface OrganisationProps {
  label?: string;
  onBackBtnListener?: () => void;
  singaporeCompany?: boolean;
  setSingaporeCompany?: React.Dispatch<React.SetStateAction<boolean>>;
  singaporeTitle?: string;
  nonSingaporeTitle?: string;
}
