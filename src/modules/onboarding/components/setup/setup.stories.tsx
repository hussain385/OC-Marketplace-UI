import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SetupOrganisationComponent from '.';

export default {
  title: 'Onboarding/Setup Orginasation',
  component: SetupOrganisationComponent,
} as ComponentMeta<typeof SetupOrganisationComponent>;

const Template: ComponentStory<typeof SetupOrganisationComponent> = (args) => <SetupOrganisationComponent {...args} />;

export const SingaporeCompany = Template.bind({});
SingaporeCompany.args = {
  steps: [
    { label: 'Search organistaion', component: <div>Search organisation</div> },
    { label: 'Identify authorised officer ', component: <div>Authorize Officer</div> },
    { label: 'Review details ', component: <div>Review</div> },
  ],
};
export const NonSingaporeCompany = Template.bind({});
NonSingaporeCompany.args = {
  steps: [
    { label: 'Organistaion name', component: <div>Search organisation</div> },
    { label: 'Identify authorised officer ', component: <div>Authorize Officer</div> },
    { label: 'Review details ', component: <div>Review</div> },
  ],
};
