import expect from 'expect';
import City from './cities.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests cities.js", () => {
  test("Only one city listing page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<City />);
    expect(wrapper.length).toBe(1);
  });

});
