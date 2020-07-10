import {
  it,
  describe,
  expect,
} from '@jest/globals';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Nav from '../Nav';

configure({ adapter: new Adapter() });

describe('Test Nav', () => {
  it('Shoul match snapshot', () => {
    const component = shallow(<Nav />);

    expect(toJson(component)).toMatchSnapshot();
  });
});
