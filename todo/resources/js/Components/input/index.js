import React, { Component } from 'react';
//styles
import { FormContainer } from '../../Styles/Input/style.js';
import { AddButtonContainer } from '../../Styles/Input/style.js';
import { AddButton } from '../../Styles/Input/style.js';

export class Input extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <FormContainer>
                    <input type="text" value={this.props.infos.value} autoFocus="focus" placeholder="メモを記入してください" onChange={e => this.props.handleOnChange(e)} onKeyUp={e => this.props.enterAdd(e)} />
                    <AddButtonContainer>
                        <AddButton onClick={() => this.props.addTodo()}>追加</AddButton>
                    </AddButtonContainer>
                </FormContainer>
            </>
        )
    }
}