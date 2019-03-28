import expect from 'expect';
import Home from './home.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests home.js", () => {
  test("Only one home page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<Home />);
    expect(wrapper.length).toBe(1);
  });

});
