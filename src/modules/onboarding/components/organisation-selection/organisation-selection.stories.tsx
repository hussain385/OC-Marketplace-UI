import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OrganistaionSelectionComponent from '.';

export default {
  title: 'Onboarding/Organisation Selection',
  component: OrganistaionSelectionComponent,
} as ComponentMeta<typeof OrganistaionSelectionComponent>;

const Template: ComponentStory<typeof OrganistaionSelectionComponent> = (args) => <OrganistaionSelectionComponent {...args} />;

export const Selection = Template.bind({});
Selection.args = {
  label: 'Is your organisation incorporated in Singapore?',
};
