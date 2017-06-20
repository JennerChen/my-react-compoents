import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import React from 'react';
import Foo from '../src/foo';

describe('<Foo/>', () => {
	describe('Foo componet feature',()=>{
		const component = shallow(
			<Foo message="" isOpen={ false }/>
		);
		test('Foo init state should display Foo Works only', () => {
			expect(component.text()).toEqual('Foo Works!');
		});
		
		test("Foo change props message need change state of Foo's message", () => {
			component.setProps({
				'message': 'zhang qing'
			});
			expect(component.state().message).toEqual('zhang qing');
		});
		test("Foo change props isOpen need change state of Foo's isOpen", () => {
			component.setProps({
				isOpen: true
			});
			expect(component.state("isOpen")).toEqual(true);
		});
		test("Foo will display current message when props isOpen equal true", ()=>{
			let message = "my message";
			component.setProps({
				isOpen: true,
				message
			});
			expect(component.find('span').text()).toEqual(message);
		});
		test("Foo toggle message when click container", ()=>{
			let message = "my message";
			component.setProps({
				isOpen: false,
				message
			});
			component.first().simulate('click');
			expect(component.state('isOpen')).toEqual(true);
			expect(component.find('span').exists()).toEqual(true);
			
			component.first().simulate('click');
			expect(component.state('isOpen')).toEqual(false);
			expect(component.find('span').exists()).toEqual(false);
		})
	})
	
	
});

