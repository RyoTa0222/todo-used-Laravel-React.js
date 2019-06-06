import React, { Component } from 'react';
import Rodal from 'rodal';
import NotificationSystem from 'react-notification-system';

//styles
import { ListContainer } from '../../Styles/List/style.js';
import { ModalContainer } from '../../Styles/List/style.js';
import { ButtonContainer } from '../../Styles/List/style.js';
import { ButtonDelete } from '../../Styles/List/style.js';
import { ButtonChange } from '../../Styles/List/style.js';
import { DateContainer } from '../../Styles/List/style.js';
import { Modal } from '../../Styles/Modal/style.js';
import { ButtonModalChange } from '../../Styles/Modal/style.js';
import { ButtonModalClose } from '../../Styles/Modal/style.js';

export class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <ListContainer>
                    {this.props.todos.todo.map((todo, i) => {
                        return (
                            <li key={i} className={`name ${(todo.complete) ? "stroke" : ""}`}>
                                <DateContainer>
                                    <div>
                                        <span data-date="month">{todo.Month}</span><span data-date="day">{todo.Day}</span>
                                    </div>
                                </DateContainer>
                                {todo.title}
                                <ButtonContainer>
                                    <ButtonDelete onClick={() => this.props.correctTodo(i)} data-button={(todo.complete) ? "delete" : "complete"} >{(todo.complete) ? "取消" : "完了"}</ButtonDelete>
                                    {!todo.complete && (
                                        <ButtonChange onClick={() => this.props.show(i)}>変更</ButtonChange>
                                    )}
                                    {todo.complete && (
                                        <ButtonChange data-delete onClick={() => this.props.deleteNotification(i)}>削除</ButtonChange>
                                    )}
                                </ButtonContainer>
                            </li>
                        )
                    })}
                </ListContainer>

                <div id="rodal">
                    <Rodal visible={this.props.todos.visible}
                        onClose={this.props.closeModal}
                        width={400}
                        enterAnimation="door"
                        leaveAnimation="door"
                        showCloseButton={false}>
                        <ModalContainer>
                            <p>変更内容を入力してください。</p>
                            < Modal >
                                <input type="text" value={this.props.todos.valueModal} autoFocus="focus" placeholder="メモを記入してください" onChange={e => this.props.handleOnChangeModal(e)} onKeyUp={e => this.props.enterModal(e)} />
                                <ButtonModalClose onClick={this.props.closeModal} className="button button_modal_close button_modal">閉じる</ButtonModalClose>
                                <ButtonModalChange onClick={() => this.props.changeTodo()} className="button button_modal_change button_modal">変更</ButtonModalChange>
                            </Modal >
                        </ModalContainer>
                    </Rodal>
                </div>
            </>
        )
    }
}