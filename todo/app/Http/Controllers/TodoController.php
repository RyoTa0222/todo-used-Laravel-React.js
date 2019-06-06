<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

//Modelを使う
use App\Models\Todo;

class TodoController extends Controller
{
    public function index()
    {
        //全てのデータを取得
        $data = Todo::all();
        
        //todoの配列を作成
        $todo_category=[];

        //格納
        foreach($data as $d)
        {
            $todo_category[] = [
                'title' => $d->title,
                'complete' => $d->complete,
                'Month' => $d->Month,
                'Day' => $d->Day,
            ];
        }
        // dd($todo_category);
        return view('todo', compact('todo_category'));
    }
}
