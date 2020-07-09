/* eslint-disable prefer-destructuring */
import {
  it,
  describe,
  expect,
  beforeEach,
} from '@jest/globals';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from 'react-dom/test-utils';
import mountReactHook from '@src/testUtils/mountReactHook';
import useRequest from '../useRequest';

configure({ adapter: new Adapter() });

describe('Test useGetHistory hook', () => {
  let setupComponent;
  let hook;
  let makeRequest;

  beforeEach(() => {
    setupComponent = mountReactHook(useRequest); // Mount a Component with our hook
    hook = setupComponent.componentHook;
    makeRequest = hook[1];
  });

  it('Should return default state', () => {
    const dafaultValue = {
      loading: false,
      success: null,
      error: null,
      data: undefined,
      response: null,
    };

    expect(hook[0]).toEqual(dafaultValue);
  });

  it('Should set loading state properly during making request via makeRequest', async () => {
    let requestPromise;
    let state = hook[0];
    await act(async () => {
      requestPromise = makeRequest('http://localhost').then((data) => {
        state = hook[0];
        return data;
      });
    });

    state = hook[0];
    expect(state.loading).toBe(true);

    // Wait for response from a sever
    await requestPromise;

    state = hook[0];
    expect(state.loading).toBe(false);
  });

  it('Should set data and success status once makeRequest resolved successfully', async () => {
    let requestPromise;
    let state = hook[0];
    await act(async () => {
      requestPromise = makeRequest('http://localhost').then((data) => {
        state = hook[0];
        return data;
      });
    });

    state = hook[0];
    expect(state.loading).toBe(true);

    // Wait for response from a sever
    await requestPromise;

    state = hook[0];
    expect(state.loading).toBe(false);
    expect(state.success.status).toBeGreaterThanOrEqual(200);
    expect(state.success.status).toBeLessThan(300);
    expect(state.success.statusText).toBe('OK');
    expect(state.data).toBeTruthy();
    expect(state.response).toBeTruthy();
  });

  it('Should set error status once makeRequest resolved with an error', async () => {
    let requestPromise;
    let state = hook[0];
    await act(async () => {
      requestPromise = makeRequest('http://tlocalthostt')
        .then((data) => {
          state = hook[0];
          return data;
        });
    });

    state = hook[0];
    expect(state.loading).toBe(true);

    // Wait for response from a sever
    await requestPromise;

    state = hook[0];
    expect(state.loading).toBe(false);
    expect(state.error.status).toBeGreaterThanOrEqual(300);
    expect(state.error.statusText).toBeTruthy();
    expect(state.error.message).toBeTruthy();
    expect(state.data).toBeTruthy();
  });
});
