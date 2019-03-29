import expect from 'expect';
import About from './about.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests about.js", () => {
  test("Only one about page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<About />);
    expect(wrapper.length).toBe(1);
  });

});
