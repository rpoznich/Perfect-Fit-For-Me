import expect from 'expect';
import CitySearch from './citySearch.js';
import React from 'react';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });

//Written by Ryan Poznich
describe("Tests citySearch.js", () => {
  test("Only one city search listing page loaded, and it loaded without breaking", () => {
  	const wrapper = shallow(<CitySearch />);
    expect(wrapper.length).toBe(1);
  });

});

describe("Tests citySearch.js 2", () => {
    test("The site will run", () => {
        const wrapper = shallow(<CitySearch />);
      expect(wrapper.length).toBe(1);
    });
  
  });