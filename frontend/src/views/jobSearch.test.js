import expect from 'expect';
import JobSearch from './jobSearch.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests jobSearch.js", () => {
  test("Only one job search listing page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<JobSearch />);
    expect(wrapper.length).toBe(1);
  });

});