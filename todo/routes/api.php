<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function(){
    Route::get('get', 'Ajax\TodoController@getTodos');
    Route::post('add', 'Ajax\TodoController@addTodo');
    Route::post('dele', 'Ajax\TodoController@delTodo');
    Route::post('correct', 'Ajax\TodoController@correctTodo');
    Route::post('change', 'Ajax\TodoController@changeTodo');
});
