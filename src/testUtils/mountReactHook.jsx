// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';

export const mountReactHook = (hook) => {
  const Component = ({ children }) => children(hook());
  const componentHook = {};
  let componentMount;

  act(() => {
    componentMount = shallow(
      <Component>
        {(hookValues) => {
          Object.assign(componentHook, hookValues);
          if (Array.isArray(hookValues)) componentHook[Symbol.iterator] = Array.prototype[Symbol.iterator];
          return null;
        }}
      </Component>,
    );
  });
  return { componentMount, componentHook };
};

export default mountReactHook;
