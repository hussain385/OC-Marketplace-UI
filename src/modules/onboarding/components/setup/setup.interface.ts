import React from 'react';

export interface Props {
  steps: {
    label: string;
    component: React.ReactNode;
  }[];
}
