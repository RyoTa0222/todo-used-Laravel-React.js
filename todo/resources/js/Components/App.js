import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Input } from './input';
import Loader from 'react-loader-spinner';
import { Clock } from './clock';
import { List } from './list';
import moment from 'moment';
import 'rodal/lib/rodal.css';
import NotificationSystem from 'react-notification-system';
//Styles
import { Notification } from '../Styles/List/style.js';
import { Container } from '../Styles/Common/style.js';
import { TitleContainer } from '../Styles/Common/style.js';

//親コンポーネント(app)
class App extends Component {
    constructor(props) {
        super(props);
        var Month = moment().format('M');
        var Day = moment().format('D');
        this.state = {
            todo: [],
            id: 0,
            loaded: true,
            visible: false,
            value: '',
            Month: Month,
            Day: Day,
            valueModal: '',
        };
        //通知
        this.notificationSystem = React.createRef();
        this.notificationSystemDelete = React.createRef();
        this.notificationSystemModal = React.createRef();
        //input
        this.addTodo = this.addTodo.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.enterAdd = this.enterAdd.bind(this);
        //list
        this.handleOnChangeModal = this.handleOnChangeModal.bind(this);
        this.correctTodo = this.correctTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.changeTodo = this.changeTodo.bind(this);
        this.enterModal = this.enterModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteNotification = this.deleteNotification.bind(this);
        //common
        this.show = this.show.bind(this);
    }


    componentWillMount() {
        setTimeout(() => {
            this.setState({ loaded: false })
        }, 500);
    }

    //初期のtodoを取得
    componentDidMount() {
        axios
            .get('/api/get')
            .then((res) => {
                var { data } = res;
                for (var x = 0; x < data.length; x++) {
                    if (data[x].complete === 0) {
                        data[x].complete = false;
                    } else if (data[x].complete === 1) {
                        data[x].complete = true;
                    } else {
                        return 0;
                    }
                }
                // todosを更新（描画がかかる）
                this.setState({
                    todo: data
                });
                console.log("init");
            })
            .catch(error => {
                console.log(error)
            })
    }

    //通知機能
    deleteNotification(i) {
        const notification = this.notificationSystemDelete.current;
        notification.addNotification({
            level: 'info',
            autoDismiss: 20,
            children: (
                <Notification>
                    <h2><i className="far fa-trash-alt"></i>削除してもよろしいですか</h2>
                    <button onClick={() => this.deleteTodo(i)}>Delete</button>
                </Notification>
            )
        });
    }

    //modalの表示
    show(i) {
        var { todo } = this.state;
        this.setState({
            id: i,
            visible: true,
            valueModal: todo[i].title,
        });
    }

    //modalの非表示
    closeModal() {
        this.setState({
            visible: false
        });
    }

    //inputのvalue変更
    handleOnChange(e) {
        var { value } = e.target;
        this.setState({
            value: value,
        })
    }

    //modalのvalue変更
    handleOnChangeModal(e) {
        var { value } = e.target;
        this.setState({
            valueModal: value,
        })
    }

    //新規追加
    addTodo() {
        var { todo } = this.state;
        var { value } = this.state;
        var month = moment().format('M');
        var day = moment().format('D');
        if (value !== '') {
            //追加
            todo.push({
                title: value,
                complete: false,
                Month: month,
                Day: day,
            });

            //databaseに書き込み
            axios
                .post('/api/add', {
                    title: value,
                    complete: false,
                    Month: month,
                    Day: day,
                })
                .then((res) => {
                    var { data } = res;
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].complete === 0) {
                            data[x].complete = false;
                        } else if (data[x].complete === 1) {
                            data[x].complete = true;
                        } else {
                            return 0;
                        }
                    }
                    //戻り値をセット
                    this.setState({
                        todo: data
                    })
                })
                .catch((error) => {
                    console.log(error);
                })

        } else {
            const notification = this.notificationSystem.current;
            notification.addNotification({
                level: 'error',
                autoDismiss: 5,
                title: "記入がありません",
                message: "メモを記入してください"
            });
        }
        //inputの中身を空にする
        this.setState({
            value: '',
        })
    }

    //Enter_新規追加
    enterAdd(e) {
        var { todo } = this.state;
        var { value } = this.state;
        var month = moment().format('M');
        var day = moment().format('D');
        if (e.keyCode === 13) {
            if (value !== '') {
                //追加
                todo.push({
                    title: value,
                    complete: false,
                    Month: month,
                    Day: day,
                });

                //databaseに書き込み
                axios
                    .post('/api/add', {
                        title: value,
                        complete: false,
                        Month: month,
                        Day: day,
                    })
                    .then((res) => {
                        var { data } = res;
                        for (var x = 0; x < data.length; x++) {
                            if (data[x].complete === 0) {
                                data[x].complete = false;
                            } else if (data[x].complete === 1) {
                                data[x].complete = true;
                            } else {
                                return 0;
                            }
                        }
                        //戻り値をセット
                        this.setState({
                            todo: data
                        })
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            } else {
                const notification = this.notificationSystem.current;
                notification.addNotification({
                    level: 'error',
                    autoDismiss: 5,
                    title: "記入がありません",
                    message: "メモを記入してください"
                });
            }
        } else {
            return 0;
        }
        //inputの中身を空にする
        this.setState({
            value: '',
        })
    }

    //取り消し機能
    correctTodo(i) {
        //コピー
        var { todo } = this.state;
        const todoCorrect = todo.slice();
        todoCorrect[i].complete = (todoCorrect[i].complete) ? false : true;
        //更新
        // this.setState({
        //     todo: todoCorrect
        // });

        //databaseの訂正
        axios
            .post('/api/correct', {
                id: todo[i].id,
                complete: todoCorrect[i].complete,
            })
            .then((res) => {
                var { data } = res;
                for (var x = 0; x < data.length; x++) {
                    if (data[x].complete === 0) {
                        data[x].complete = false;
                    } else if (data[x].complete === 1) {
                        data[x].complete = true;
                    } else {
                        return 0;
                    }
                }
                this.setState({
                    todo: data,
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //削除機能
    deleteTodo(i) {
        var { todo } = this.state;
        //databaseから削除
        axios
            .post('/api/dele', {
                id: todo[i].id,
            })
            .then((res) => {
                var { data } = res;
                for (var x = 0; x < data.length; x++) {
                    if (data[x].complete === 0) {
                        data[x].complete = false;
                    } else if (data[x].complete === 1) {
                        data[x].complete = true;
                    } else {
                        return 0;
                    }
                }
                this.setState({
                    todo: data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //modalで入力した内容の更新
    changeTodo() {
        var { todo } = this.state;
        var { valueModal } = this.state;
        var { id } = this.state;
        var todoId = this.state.todo[id].id;
        var modalInput = todo.slice();
        var month = moment().format('M');
        var day = moment().format('D');
        if (valueModal !== '') {
            //内容の変更
            modalInput[id] = { title: valueModal, complete: false, Month: month, Day: day, id: todoId };
            //databaseの内容を更新
            axios
                .post('/api/change', {
                    id: todoId,
                    value: valueModal,
                })
                .then((res) => {
                    var { data } = res;
                    for (var x = 0; x < data.length; x++) {
                        if (data[x].complete === 0) {
                            data[x].complete = false;
                        } else if (data[x].complete === 1) {
                            data[x].complete = true;
                        } else {
                            return 0;
                        }
                    }
                    this.setState({
                        todo: data
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            const notification = this.notificationSystemModal.current;
            notification.addNotification({
                level: 'error',
                autoDismiss: 5,
                title: "記入がありません",
                message: "変更内容を記入してください"
            });
        }
        this.setState({
            valueModal: '',
        })
    }

    //enterModalで入力した内容の更新
    enterModal(e) {
        var { todo } = this.state;
        var { valueModal } = this.state;
        var { id } = this.state;
        var todoId = this.state.todo[id].id;
        var month = moment().format('M');
        var day = moment().format('D');

        if (e.keyCode === 13) {
            if (valueModal !== '') {
                //内容の変更
                var modalInput = todo.slice();
                modalInput[id] = { title: valueModal, complete: false, Month: month, Day: day, id: todoId, };
                //databaseの内容を更新
                axios
                    .post('/api/change', {
                        id: todoId,
                        value: valueModal,
                    })
                    .then((res) => {
                        var { data } = res;
                        for (var x = 0; x < data.length; x++) {
                            if (data[x].complete === 0) {
                                data[x].complete = false;
                            } else if (data[x].complete === 1) {
                                data[x].complete = true;
                            } else {
                                return 0;
                            }
                        }
                        this.setState({
                            todo: data
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                const notification = this.notificationSystemModal.current;
                notification.addNotification({
                    level: 'error',
                    autoDismiss: 5,
                    title: "記入がありません",
                    message: "変更内容を記入してください"
                });
            }
        } else {
            return 0;
        }
        this.setState({
            valueModal: '',
        })
    }


    render() {
        const { loaded } = this.state;
        return (
            <Container>
                <div id="main_todo" className={(loaded) ? "unshow" : "show"}>
                    <TitleContainer>
                        <h1>TODOアプリ</h1>
                    </TitleContainer>
                    <Clock />
                    <Input enterAdd={this.enterAdd}
                        addTodo={this.addTodo}
                        ref="inputValue"
                        infos={this.state}
                        handleOnChange={this.handleOnChange}
                    />
                    <NotificationSystem ref={this.notificationSystem} />
                    <NotificationSystem ref={this.notificationSystemDelete} />
                    <NotificationSystem ref={this.notificationSystemModal} />
                    <List todos={this.state}
                        show={this.show}
                        correctTodo={this.correctTodo}
                        changeTodo={this.changeTodo}
                        enterModal={this.enterModal}
                        closeModal={this.closeModal}
                        deleteNotification={this.deleteNotification}
                        handleOnChangeModal={this.handleOnChangeModal}
                    />
                </div>
                <div className={(loaded) ? "icon_show" : "unshow"}>
                    <Loader loaded={this.state.loaded}
                        type="CradleLoader"
                        color="#000"
                        height="100"
                        width="100"
                    />
                </div>
            </Container>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));