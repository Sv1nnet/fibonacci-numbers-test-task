import React from 'react';
import {
  jest,
  it,
  describe,
  expect,
} from '@jest/globals';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter } from 'react-router-dom';
import 'materialize-css';
import App from '../App';

configure({ adapter: new Adapter() });

// I don't use snapshots here because a "key" prop in Router has always different value

describe('Test App', () => {
  it('Should contain MainPage component for the route "/"', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find('MainPage').length).toBe(1);
  });

  it('Should contain History for the route "/history"', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/history']}>
        <App />
      </MemoryRouter>,
    );

    expect(component.find('History').length).toBe(1);
  });

  it('Should contain MainPage for the unexisting route "/asd"', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    expect(component.find('MainPage').length).toBe(1);
  });
});
