import { ComponentMeta, ComponentStory } from '@storybook/react';

import Label from '../components/Label';

export default {
    title: 'Label',
    component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: ['label text'],
};
