import React from 'react';
import TextInput from "../Components/Options/TextInput";

import GridPage from "./Grid";

export default class OptionsPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            refs: {},
        };

        this.optionsList = {};
    }

    render() {
        return (
            <GridPage active={'fuck'}>
                <TextInput ref={(ref) => {
                    this.optionsList.test = ref?.getOptionData;
                }} options={{}} clientValidate={eval(`(value)=>{
                if(value.includes('1'))return {validated: false, error: 'This cannot include "1" char!'};
                else return {};
            }`)}/>
            </GridPage>
        )
    }
}
