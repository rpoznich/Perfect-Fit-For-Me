import expect from 'expect';
import EventInstance from './eventsInstance.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests eventsInstance.js", () => {
  test("Only one event instance page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<EventInstance />);
    expect(wrapper.length).toBe(1);
  });

});
