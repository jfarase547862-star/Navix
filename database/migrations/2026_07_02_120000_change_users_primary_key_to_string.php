<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('users')) {
            DB::statement('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey');
            DB::statement('ALTER TABLE users ALTER COLUMN user_id TYPE VARCHAR(20) USING user_id::text');
            DB::statement('ALTER TABLE users ALTER COLUMN user_id DROP DEFAULT');

            $users = DB::table('users')->orderBy('user_id')->get(['user_id']);

            foreach ($users as $index => $user) {
                $newId = 'USR-' . str_pad((string) ($index + 1), 3, '0', STR_PAD_LEFT);
                DB::table('users')->where('user_id', $user->user_id)->update(['user_id' => $newId]);
            }

            DB::statement('ALTER TABLE users ADD PRIMARY KEY (user_id)');
        }

        if (Schema::hasTable('sessions')) {
            DB::statement('ALTER TABLE sessions ALTER COLUMN user_id TYPE VARCHAR(20)');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('sessions')) {
            DB::statement('ALTER TABLE sessions ALTER COLUMN user_id TYPE BIGINT USING user_id::bigint');
        }

        if (Schema::hasTable('users')) {
            DB::statement('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey');
            DB::statement('ALTER TABLE users ALTER COLUMN user_id TYPE BIGINT USING user_id::bigint');
            DB::statement('ALTER TABLE users ALTER COLUMN user_id SET DEFAULT nextval(\'users_user_id_seq\')');
            DB::statement('ALTER TABLE users ADD PRIMARY KEY (user_id)');
        }
    }
};
