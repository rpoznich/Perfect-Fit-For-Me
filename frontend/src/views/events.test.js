import expect from 'expect';
import Events from './events.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests events.js", () => {
  test("Only one events listing page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<Events />);
    expect(wrapper.length).toBe(1);
  });

});
