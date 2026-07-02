<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = [
            [
                'user_id' => 'ADM-001',
                'first_name' => 'Admin',
                'last_name' => 'User',
                'middle_name' => 'N/A',
                'email' => 'admin@davanav.gov',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'admin',
            ],
            [
                'user_id' => 'SUP-001',
                'first_name' => 'Superadmin',
                'last_name' => 'User',
                'middle_name' => 'N/A',
                'email' => 'superadmin@davanav.gov',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
                'role' => 'superadmin',
            ],
        ];

        foreach ($accounts as $account) {
            User::updateOrCreate(
                ['email' => $account['email']],
                $account,
            );
        }
    }
}
