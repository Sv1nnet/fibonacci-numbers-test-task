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
import RedirectButton from '../RedirectButton';

configure({ adapter: new Adapter() });

describe('Testing RedirectButton component', () => {
  it('Should match snapshot with required props', () => {
    const component = shallow(<RedirectButton to="/test-to" text="test text" />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should match snapshot with extra class', () => {
    const testClass = 'test-class';
    const testTo = '/test-to';
    const textTo = 'test text';
    const component = shallow(<RedirectButton className={testClass} to={testTo} text={textTo} />);

    expect(component.find('Link').prop('className').includes(testClass)).toBe(true);
    expect(component.find('Link').prop('to').includes(testTo)).toBe(true);
    expect(component.find('Button').props().children).toBe(textTo);
    expect(toJson(component)).toMatchSnapshot();
  });
});
