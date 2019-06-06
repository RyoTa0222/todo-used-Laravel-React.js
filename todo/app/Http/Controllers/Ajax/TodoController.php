<?php

namespace App\Http\Controllers\Ajax;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

//Modelを使う
use App\Models\Todo;

class TodoController extends Controller
{   
     //全てのデータを取得
    public function getTodos()
    {
        $data = Todo::all();
        return $data;
    }

    //データの追加
    public function addTodo(Request $request)
    {
        $todo = new Todo;
        $todo->title = $request->title;
        $todo->complete = $request->complete;
        $todo->Month = $request->Month;
        $todo->Day = $request->Day;
        $todo->save();

        $data = Todo::all();
        return $data;
    }

    //データの削除
    public function delTodo(Request $request)
    {
        $todo = Todo::find($request->id);
        $todo->delete();

        $data = Todo::all();
        return $data;
    }

    //データの訂正
    public function correctTodo(Request $request)
    {
        $todo = Todo::find($request->id);
        $todo->complete = $request->complete;
        $todo->save();

        $data = Todo::all();
        return $data;
    }

    //データ内容の変更
    public function changeTodo(Request $request)
    {
        $todo = Todo::find($request->id);
        $todo->title = $request->value;
        $todo->save();

        $data = Todo::all();
        return $data;
    }
}
