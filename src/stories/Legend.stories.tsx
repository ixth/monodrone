import { ComponentMeta, ComponentStory } from '@storybook/react';

import Legend from '../components/Legend';

export default {
    title: 'Legend',
    component: Legend,
} as ComponentMeta<typeof Legend>;

const Template: ComponentStory<typeof Legend> = (args) => (
    <div style={{ width: '200px' }}>
        <Legend {...args} />
    </div>
);

export const Primary = Template.bind({});
Primary.args = {
    children: ['label text'],
};
