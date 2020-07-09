import React from 'react';
import {
  it,
  describe,
  expect,
} from '@jest/globals';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'materialize-css';
import toJson from 'enzyme-to-json';
import Icon from '../Icon';

configure({ adapter: new Adapter() });

describe('Testing Icon component', () => {
  it('Should match snapshot with empty props', () => {
    const component = shallow(<Icon />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should match snapshot with extra class passed to props', () => {
    const testClass = 'test-class';
    const component = shallow(<Icon className={testClass} />);

    expect(component.find('span').prop('className').includes(testClass)).toBe(true);
    expect(toJson(component)).toMatchSnapshot();
  });
});
