import { it, describe, expect } from '@jest/globals';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Result from '../Result';

configure({ adapter: new Adapter() });

describe('Test Result component', () => {
  it('Should match snapshot with empty props', () => {
    const component = shallow(<Result />);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should render result inside <h4> in Result', () => {
    const result = 154;
    const component = shallow(<Result result={result} />);

    expect(component.find('h4').text()).toBe(result.toString());
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should render as an error message inside <h4> and have error class in Result', () => {
    const result = 'Error occured';
    const errorClassesRegexp = /\s(red-text accent-4)(\s|$)/;
    const component = shallow(<Result error result={result} />);

    expect(component.find('h4').hasClass(errorClassesRegexp)).toBe(true);
    expect(component.find('h4').text()).toBe(result);
    expect(toJson(component)).toMatchSnapshot();
  });
});
