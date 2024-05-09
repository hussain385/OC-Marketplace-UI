import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchBoxComponent } from './search-box.component';
export default {
  title: 'Components/Search Box',
  component: SearchBoxComponent,
} as ComponentMeta<typeof SearchBoxComponent>;

const Template: ComponentStory<typeof SearchBoxComponent> = (args) => <SearchBoxComponent {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  placeholder: 'Search for order',
};
