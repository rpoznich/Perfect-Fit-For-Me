import expect from 'expect';
import Search from './search.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests search.js", () => {
  test("Only one search listing page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<Search />);
    expect(wrapper.length).toBe(1);
  });

});

describe("Tests search.js 2", () => {
    test("search runs reasonably", () => {
        const wrapper = shallow(<Search />);
      expect(wrapper.length).toBe(1);
    });
  
  });