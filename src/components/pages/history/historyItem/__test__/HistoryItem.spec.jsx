import {
  it,
  describe,
  expect,
} from '@jest/globals';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import HistoryItem from '../HistoryItem';

configure({ adapter: new Adapter() });

describe('Test HistoryItem', () => {
  it('Should match snapshot', () => {
    const component = shallow(<HistoryItem number={10} result="55" />);

    expect(toJson(component)).toMatchSnapshot();
  });
});
