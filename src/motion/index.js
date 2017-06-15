import React from 'react';
import ReactDom from 'react-dom'
import {Motion, spring, TransitionMotion} from 'react-motion';

const wrapStyle = {
	display: "inline-block",
	width: 100
}

const groupStyle = {
	display: "inline-block",
	width: 100,
	height: 30
};
const itemStyle = {
	padding: "6px 5px",
	boxSizing: "border-box",
	width: "100%",
	height: 30,
	backgroundColor: "#efefef"
}
class App extends React.Component {
	render() {
		return <div>
			<h1> React Motion Demo</h1>
			<Group/>
			<Demo2/>
			<Plane/>
		</div>
	}
}


class Group extends React.Component {
	state = {
		collapse: true,
		list: ["baidu", "google", "yahoo", "bing", "sougou", "360"]
	};
	
	willEnter = (s) => {
		return {
			height: 0,
			opacity: .5
		}
	};
	willLeave = () => {
		return {
			height: spring(0), opacity: spring(0)
		}
	};
	
	renderItems = () => {
		let displayItemArr = this.state.collapse ? [] : this.state.list;
		return <TransitionMotion
			willEnter={ this.willEnter }
			willLeave={ this.willLeave }
			styles={ displayItemArr.map(l => ({
				key: l,
				style: {height: spring(30), opacity: spring(1)}
			})) }
		>
			{ interpolateStyles =>
				<div>{
					interpolateStyles.map(s => <Items
						key={ s.key }
						name={ s.key } style={ {...s.style, overflow: s.style.height === 30 ? 'inherit' : 'hidden'} }/>)
				}</div>
			}
		</TransitionMotion>;
	};
	
	render() {
		return <div style={ wrapStyle }>
			<div style={ groupStyle } onClick={ () => this.setState({
				collapse: !this.state.collapse
			}) }> 点我
			</div>
			{ this.renderItems()  }
		</div>
	}
}

class Items extends React.Component {
	render() {
		const {name, style} = this.props;
		return <div style={ {...style} }>
			<div style={ itemStyle }>{ name}</div>
		</div>
	}
}
class Demo2 extends React.Component {
	
	state = {
		items: [{key: 'a', size: 10}, {key: 'b', size: 20}, {key: 'c', size: 30}],
	};
	
	componentDidMount() {
		this.setState({
			items: [{key: 'a', size: 10}, {key: 'b', size: 20}], // remove c.
		});
// 		setInterval(()=>{
// 			this.setState( {
// 				items: this.state.items.concat({
// 					key: Math.random(),
// 					size: parseInt(Math.random()* 50)
// 				})
// 			} )
// 		},3000)
	}
	
	willLeave() {
		// triggered when c's gone. Keeping c until its width/height reach 0.
		return {width: spring(0), height: spring(0)};
	}
	
	render() {
		return (
			<TransitionMotion
				willLeave={this.willLeave}
				styles={this.state.items.map(item => ({
					key: item.key,
					style: {width: item.size, height: item.size},
				}))}>
				{interpolatedStyles =>
					// first render: a, b, c. Second: still a, b, c! Only last one's a, b.
					<div>
						{interpolatedStyles.map(config => {
							return <div key={config.key} style={{...config.style, border: '1px solid'}}/>
						})}
					</div>
				}
			</TransitionMotion>
		)
	}
}

class Plane extends React.Component {
	state = {
		x: 0,
		y: 0,
		offsetX: 0,
		offsetY: 0
	};
	
	render() {
		const {x, offsetX, y, offsetY} = this.state;
		return <Motion
			onRest={ () => {
				console.log('done')
				this.setState({
					x: Math.max(0,x + offsetX ),
					y: Math.max(0,y + offsetY),
					offsetX: 0,
					offsetY: 0
				})
			}}
			style={ {x: spring(x + offsetX), y: spring(y + offsetY)} }
			defaultStyle={ {x, y} }>
			{ interploateStyle => (
				<div
					onClick={ () => {
						this.setState({
							offsetX: Math.max(-x, Math.random() * 666 * (Math.random() - 0.1 > 0 ? 1 : -1)),
							offsetY: Math.max(-y, Math.random() * 333 * (Math.random() - 0.1 > 0 ? 1 : -1))
						})
					} } style={ {
					left: interploateStyle.x,
					top: interploateStyle.y,
					position: "absolute",
					width: 100,
					height: 100,
					display: "inline-block",
					backgroundColor: "#efefef"
				} }>
					Click To Fly!
				</div>
			) }
		
		</Motion>
	}
}
ReactDom.render(<App/>, document.getElementById("root"));