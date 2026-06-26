<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Office;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landingpage');
})->name('home');

Route::get('/directory', function () {
    return Inertia::render('directory');
})->name('directory');

Route::get('/map', function () {
    return Inertia::render('map');
})->name('map');

Route::get('/scan', function () {
    return Inertia::render('scan');
})->name('scan');

Route::get('/office/{officeId}', function (string $officeId) {
    $office = Office::find($officeId);

    abort_if(!$office, 404);

    return Inertia::render('office', [
        'office' => $office,
    ]);
})->name('office.show');


Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';