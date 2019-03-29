import expect from 'expect';
import App from './App.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests App.js", () => {
  test("The app renders, and does not crash", () => {
  	const wrapper = shallow(<App />);
    expect(wrapper.length).toBe(1);
  });

});

