import { ComponentStory, ComponentMeta } from '@storybook/react';

import Block from '../components/Block';

export default {
    title: 'Block',
    component: Block,
    parameters: {
        layout: 'centered',
    },
} as ComponentMeta<typeof Block>;

const Template: ComponentStory<typeof Block> = (args) => <Block {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'Title',
    children: ['text, a very long one'],
};
