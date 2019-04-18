import expect from 'expect';
import EventFilter from './eventsFilter.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests eventsFilter.js", () => {
  test("Only one events filter listing page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<EventFilter />);
    expect(wrapper.length).toBe(1);
  });

});

describe("Tests eventsFilter.js 2", () => {
    test("events filter is running reasonably", () => {
        const wrapper = shallow(<EventFilter />);
      expect(wrapper.length).toBe(1);
    });
  
  });