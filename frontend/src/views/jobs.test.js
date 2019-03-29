import expect from 'expect';
import Jobs from './jobs.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests cityInstance.js", () => {
  test("Only one city instance page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<Jobs />);
    expect(wrapper.length).toBe(1);
  });

});
