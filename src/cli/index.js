#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { camelCase, kebabCase, upperFirst } = require('lodash');

const componentsDir = path.join(__dirname, '../components');

const indexTsx = ({ componentName, componentDir }) => `\
import React, { FC } from 'react';
import './style.css';

type ${componentName}Props = {};

const ${componentName}: FC<${componentName}Props> = () => <div className="${componentDir}" />;

export default ${componentName};
`;

const styleCss = ({ componentDir }) => `\
.${componentDir} {
  // component-specific styles go here
}
`;

const testsTsx = ({ componentName }) => `
import React from 'react';
import ReactDOM from 'react-dom';

import ${componentName} from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<${componentName} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

`;

process.argv.slice(2).forEach(arg => {
  const componentName = upperFirst(camelCase(arg));
  const componentDir = kebabCase(arg);

  Object.entries({
    indexTsx,
    styleCss,
    testsTsx,
  }).forEach(([key, value]) => {
    const baseName = kebabCase(key).replace('-', '.');

    const fileDir = path.join(componentsDir, componentDir);
    const filePath = path.join(fileDir, baseName);
    const fileContents = value({ componentName, componentDir });

    fs.existsSync(fileDir) || fs.mkdirSync(fileDir);
    fs.writeFileSync(filePath, fileContents);
  });
});
