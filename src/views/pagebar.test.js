import expect from 'expect';
import PageBar from './pagebar.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests pagebar.js", () => {
  test("Only one pagebar", () => {
  	const wrapper = shallow(<PageBar />);
    expect(wrapper.length).toBe(1);
  });

});
