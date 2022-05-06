import React from 'react';

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'xd',
        };


    }

    updateValue = (v) => this.setState({value: v});

    render() {
        return (
            <>
                <p>{this.state.value}</p>
                <Child updateValue={this.updateValue.bind(this)}/>
            </>
        )
    }
}

class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'xd',
        }
    }

    render() {
        return (
            <>
                <input onChange={(v) => {
                    this.props.updateValue(v.target.value);
                    this.setState({value: v.target.value});
                }} type={'text'} value={this.state.value}/>
            </>
        )
    }
}

export default Parent;
