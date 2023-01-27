import { ComponentStory, ComponentMeta } from '@storybook/react';

import Knob from '../components/Knob/uncontrolled';

export default {
    title: 'Knob',
    component: Knob,
    argTypes: {
        value: {
            control: { type: 'range', min: 0, max: 1, step: 1 / 100 },
        },
        spread: {
            control: { type: 'range', min: 0, max: 1, step: 1 / 360 },
        },
        onChange: { action: 'changed' },
    },
} as ComponentMeta<typeof Knob>;

const Template: ComponentStory<typeof Knob> = (args) => <Knob {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    initialValue: 0,
    spread: 1 / 2,
};
