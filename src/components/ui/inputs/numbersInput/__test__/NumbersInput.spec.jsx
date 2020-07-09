import React from 'react';
import {
  jest,
  it,
  describe,
  expect,
} from '@jest/globals';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'materialize-css';
import toJson from 'enzyme-to-json';
import NumbersInput from '../NumbersInput';

configure({ adapter: new Adapter() });

describe('Testing NumbersInput component', () => {
  it('Should match snapshot with empty props', () => {
    const fn = jest.fn();
    const component = shallow(<NumbersInput onKeyUp={fn} onChange={fn} />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('NumbersInput should have input with empty value', () => {
    const fn = jest.fn();
    const component = mount(<NumbersInput onKeyUp={fn} onChange={fn} />);
    const input = component.find('input');

    input.simulate('change', { target: { value: 'a' } });
    expect(input.instance().value).toBeFalsy();
  });

  it('NumbersInput should have input with number value', () => {
    const value = '5';
    const fn = jest.fn();
    const component = mount(<NumbersInput onKeyUp={fn} onChange={fn} />);
    const input = component.find('input');

    input.simulate('change', { target: { value } });
    expect(input.instance().value).toBe(value);
  });

  it('NumbersInput should have input with number value', () => {
    const value = '5';
    const fn = jest.fn();
    const component = mount(<NumbersInput onKeyUp={fn} onChange={fn} />);
    const input = component.find('input');

    input.simulate('change', { target: { value } });
    expect(input.instance().value).toBe(value);
  });

  it('NumbersInput should be disabled it "disable" prop provided as true', () => {
    const fn = jest.fn();
    const component = mount(<NumbersInput disabled onKeyUp={fn} onChange={fn} />);
    const input = component.find('input');

    expect(input.instance().disabled).toBe(true);
  });
});
