import React from 'react';
import { it, describe, expect } from '@jest/globals';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import MainPage from '../MainPage';

configure({ adapter: new Adapter() });

describe('Test MainPage', () => {
  it('Should match MainPage snapshot', () => {
    const component = shallow(<MainPage />);

    expect(toJson(component)).toMatchSnapshot();
  });
});
