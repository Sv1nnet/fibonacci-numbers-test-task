import {
  it,
  describe,
  expect,
} from '@jest/globals';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import History from '../History';

configure({ adapter: new Adapter() });

describe('Test History component', () => {
  it('Should match snapshot with', () => {
    const component = shallow(<History />, {
      wrappingComponent: MemoryRouter,
    });
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Should download history and update state. DB has to have at least one record for the IP which we make request from, and server has to be running', async () => {
    const { container } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>,
    );
    await screen.findByText('Results');
    expect(container.querySelector('table')).toBeTruthy();
  });
});
