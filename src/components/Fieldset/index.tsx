import { FC } from 'react';

import './styles/style.css';

const Fieldset: FC = ({ children }) => <fieldset className="fieldset">{children}</fieldset>;

export const Control: FC = ({ children }) => <div className="fieldset__control">{children}</div>;

export default Fieldset;
