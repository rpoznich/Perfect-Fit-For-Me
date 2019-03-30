import expect from 'expect';
import JobInstance from './jobsInstance.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests jobsInstance.js", () => {
  test("Only one job instance page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<JobInstance />);
    expect(wrapper.length).toBe(1);
  });

});
