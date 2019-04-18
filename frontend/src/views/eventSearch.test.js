import expect from 'expect';
import EventSearch from './eventSearch.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests eventSearch.js", () => {
  test("Only one events search listing page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<EventSearch />);
    expect(wrapper.length).toBe(1);
  });

});

describe("Tests eventSearch.js 2", () => {
    test("event search runs reasonably", () => {
        const wrapper = shallow(<EventSearch />);
      expect(wrapper.length).toBe(1);
    });
  
  });