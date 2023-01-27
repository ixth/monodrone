import { ComponentStory, ComponentMeta } from '@storybook/react';

import Mode from '../components/Mode';

export default {
    title: 'Mode',
    component: Mode,
    argTypes: {
        value: {
            options: ['standby', 'sawtooth', 'square'],
            control: { type: 'select' },
        },
        onChange: { action: 'changed' },
    },
} as ComponentMeta<typeof Mode>;

const Template: ComponentStory<typeof Mode> = (args) => <Mode {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    value: 'standby',
};
