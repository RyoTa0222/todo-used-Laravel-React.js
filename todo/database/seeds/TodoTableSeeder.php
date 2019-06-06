<?php

use Illuminate\Database\Seeder;

class TodoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('todos') -> insert([
            [
                'title' => 'JavaScript覚える',
                'complete' => false,
                'Month' => '4',
                'Day' => '10',
            ],
            [
                'title' => 'jQuery覚えるのは保留',
                'complete' => false,
                'Month' => '4',
                'Day' => '20',
            ],
            [
                'title' => 'ES2015覚える',
                'complete' => false,
                'Month' => '5',
                'Day' => '1',
            ],
            [
                'title' => 'React覚える',
                'complete' => false,
                'Month' => '5',
                'Day' => '5',
            ],
            [
                'title' => '隼を倒す',
                'complete' => false,
                'Month' => '5',
                'Day' => '12',
            ],
        ]);
    }
}
