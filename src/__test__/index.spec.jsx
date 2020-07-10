import React from 'react';
import { it, describe, expect } from '@jest/globals';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import index from '../index';

configure({ adapter: new Adapter() });

describe('Test index.jsx', () => {
  it('Should render without crush', () => {
    const component = mount(<div id="root">{index}</div>);

    expect(toJson(component)).toMatchSnapshot();
  });
});
