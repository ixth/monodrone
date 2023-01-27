import { ComponentMeta } from '@storybook/react';

import Fieldset from '../components/Fieldset';
import Legend from '../components/Legend';

export default {
    title: 'Fieldset',
    component: Fieldset,
} as ComponentMeta<typeof Fieldset>;

export const Primary = () => (
    <Fieldset>
        <Legend wide>Legend</Legend>
        content goes here
    </Fieldset>
);
