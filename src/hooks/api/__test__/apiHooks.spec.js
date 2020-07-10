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
import { useGetHistory, useSendNumber } from '../apiHooks';

configure({ adapter: new Adapter() });

describe('Test apiHooks', () => {
  describe('Test useGetHistory hook', () => {
    const resultProperties = ['id', 'number', 'result'];

    let setupComponent;
    let hook;
    let getHistory;

    beforeEach(() => {
      setupComponent = mountReactHook(useGetHistory); // Mount a Component with our hook
      hook = setupComponent.componentHook;
      getHistory = hook[1];
    });

    it('Should set loading', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getHistory(1).then((data) => {
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

    it('Should get users history. DB has to have records for successful test, if geHistory doesn\'t recieves page number', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getHistory().then((data) => {
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
      expect(state.data.currentPage).toBe(1);
      expect(state.data.maxPages).toBeGreaterThan(0);
      expect(Array.isArray(state.data.results)).toBe(true);
      expect(state.data.results.length).toBeGreaterThan(0);
      resultProperties.forEach((prop) => expect(state.data.results[0]).toHaveProperty(prop));
    });

    it('Should get users history. DB has to have records for successful test, if geHistory recieves first page number', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getHistory(1).then((data) => {
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
      expect(state.data.currentPage).toBe(1);
      expect(state.data.maxPages).toBeGreaterThan(0);
      expect(Array.isArray(state.data.results)).toBe(true);
      expect(state.data.results.length).toBeGreaterThan(0);
      resultProperties.forEach((prop) => expect(state.data.results[0]).toHaveProperty(prop));
    });

    it('Should get users history. DB has to have (10 < records < 20) for successful test, if geHistory recieves existing page number', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getHistory(2).then((data) => {
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
      expect(state.data.currentPage).toBe(2);
      expect(state.data.maxPages).toBe(2);
      expect(Array.isArray(state.data.results)).toBe(true);
      expect(state.data.results.length).toBeGreaterThan(0);
      resultProperties.forEach((prop) => expect(state.data.results[0]).toHaveProperty(prop));
    });

    it('Should get users history. DB has to have (10 < records < 20) for successful test, if geHistory recieves not existing page number', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getHistory(20).then((data) => {
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
      expect(state.data.currentPage).toBe(2);
      expect(state.data.maxPages).toBe(2);
      expect(Array.isArray(state.data.results)).toBe(true);
      expect(state.data.results.length).toBeGreaterThan(0);
      resultProperties.forEach((prop) => expect(state.data.results[0]).toHaveProperty(prop));
    });

    it('Should get users history. DB has to have (10 < records < 20) for successful test, if geHistory recieves not a number', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getHistory('asd').then((data) => {
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
      expect(state.data.currentPage).toBe(1);
      expect(state.data.maxPages).toBe(2);
      expect(Array.isArray(state.data.results)).toBe(true);
      expect(state.data.results.length).toBeGreaterThan(0);
      resultProperties.forEach((prop) => expect(state.data.results[0]).toHaveProperty(prop));
    });
  });

  describe('Test useSendNumber hook', () => {
    let setupComponent;
    let hook;
    let getResult;

    beforeEach(() => {
      setupComponent = mountReactHook(useSendNumber); // Mount a Component with our hook
      hook = setupComponent.componentHook;
      getResult = hook[1];
    });

    it('Should set loading', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getResult(1).then((data) => {
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

    it('Should get result for 10', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getResult(10).then((data) => {
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
      expect(state.data).toBe(55);
    });

    it('Should get error for not a number request', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getResult('asd').then((data) => {
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
      expect(state.error.status).toBe(400);
      expect(state.error.message).toBe('Provided argument is not a number type');
    });

    it('Should get error if number is not provided', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getResult().then((data) => {
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
      expect(state.error.status).toBe(400);
      expect(state.error.message).toBe('Provided argument is not a number type');
    });

    it('Should get error if number less than zero', async () => {
      let requestPromise;
      let state = hook[0];
      await act(async () => {
        requestPromise = getResult(-12).then((data) => {
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
      expect(state.error.status).toBe(400);
      expect(state.error.message).toBe('Provided number can\'t be less than zero');
    });
  });
});
