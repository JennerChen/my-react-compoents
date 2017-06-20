import React from 'react';
import propTypes from 'prop-types';
export default class Foo extends React.Component {
	
	static propTypes = {
		message: propTypes.string,
		isOpen: propTypes.bool.isRequired
	};
	
	static defaultProps = {
		isOpen: false
	};
	
	
	constructor(props) {
		super(props);
		this.state = {
			message: this.props.message,
			isOpen: this.props.isOpen
		}
	}
	
	
	componentWillReceiveProps(nextProps) {
		if (nextProps.message !== this.props.message) {
			this.setState({
				message: nextProps.message
			})
		}
		if (nextProps.isOpen !== this.props.isOpen) {
			this.setState({
				isOpen: nextProps.isOpen
			})
		}
	}
	
	render() {
		const {message, isOpen} = this.state;
		return <div onClick={ () => this.setState({
			isOpen: !isOpen
		}) }>
			Foo Works!
			{ isOpen ? <span>{ message }</span> : null}
		</div>
	}
}