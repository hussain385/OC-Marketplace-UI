import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import OfficerInfoComponent from '.';

export default {
  title: 'Onboarding/Office Info',
  component: OfficerInfoComponent,
} as ComponentMeta<typeof OfficerInfoComponent>;

const Template: ComponentStory<typeof OfficerInfoComponent> = (args) => <OfficerInfoComponent {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  id: 'SX134-------78',
  role: 'Chief Financial Officer',
  name: 'Tony Hou',
  isClickable: false,
};
