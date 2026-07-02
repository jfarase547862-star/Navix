<?php

use App\Http\Controllers\Visitor\OfficeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Models\Office;
use Inertia\Inertia;

const PROFILE_PATH = '/profile';

// ── Kiosk Routes ─────────────────────────────────────────────
Route::prefix('kiosk')->name('kiosk.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('kiosk/landingpage');
    })->name('home');

    Route::get('/directory', function () {
        return Inertia::render('kiosk/directory');
    })->name('directory');

    Route::get('/offices', function () {
        return Inertia::render('kiosk/offices');
    })->name('offices');

    Route::get('/scan', function () {
        return Inertia::render('kiosk/scan');
    })->name('scan');

  Route::get('/map', function () {
    return Inertia::render('kiosk/map');
})->name('map');

    Route::get('/office/{officeId}', [OfficeController::class, 'show'])
        ->name('office.show');
});
// ── Mobile Routes ────────────────────────────────────────────
Route::prefix('m')->name('mobile.')->group(function () {
    Route::get('/home', function () {
        return Inertia::render('mobile/home');
    })->name('home');

    Route::get('/scan', function () {
        return Inertia::render('mobile/scan');
    })->name('scan');

    Route::get('/search', function () {
        return Inertia::render('mobile/search');
    })->name('search');

    Route::get('/map', function () {
        return Inertia::render('mobile/mobile-map');
    })->name('map');

    Route::get('/navigation', function () {
        return Inertia::render('mobile/navigation');
    })->name('navigation');

    Route::get('/office/{officeId}', [OfficeController::class, 'show'])
        ->name('office.show');
});

Route::get('/navigate/{officeId}', function (string $officeId) {
    return Inertia::render('mobile/navigate', ['officeId' => $officeId]);
})->name('navigate');

Route::get('/accessibility/{officeId}', function (string $officeId) {
    return Inertia::render('mobile/navigate', ['officeId' => $officeId, 'mode' => 'accessibility']);
})->name('accessibility');
// ── Kiosk Routes ─────────────────────────────────────────────
Route::prefix('kiosk')->name('kiosk.')->group(function () {
    Route::get('/map', function () {
        return Inertia::render('kiosk/map');
    })->name('map');
});

// ── Auth Routes ─────────────────────────────────────────────
Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

// ── Admin Routes ─────────────────────────────────────────────
Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard',     fn() => Inertia::render('admin/dashboard'))->name('admin.dashboard');
    Route::get('/offices',       fn() => Inertia::render('admin/offices'))->name('admin.offices');
    Route::get('/departments',   fn() => Inertia::render('admin/departments'))->name('admin.departments');
    Route::get('/floor-maps',    fn() => Inertia::render('admin/floor-maps'))->name('admin.floor-maps');
    Route::get('/nodes',         fn() => Inertia::render('admin/nodes'))->name('admin.nodes');
    Route::get('/qr-code',      fn() => Inertia::render('admin/qr-code'))->name('admin.qr-code');
    Route::get('/analytics',     fn() => Inertia::render('admin/analytics'))->name('admin.analytics');
    Route::get('/users',         fn() => Inertia::render('admin/users'))->name('admin.users');
    Route::get('/roles',         fn() => Inertia::render('admin/roles'))->name('admin.roles');
    Route::get('/notifications', fn() => Inertia::render('admin/notifications'))->name('admin.notifications');
    Route::get('/settings',      fn() => Inertia::render('admin/settings'))->name('admin.settings');
});

// ── Superadmin Routes ────────────────────────────────────────
Route::prefix('superadmin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard',      fn() => Inertia::render('superadmin/supadmin-dashboard'))->name('superadmin.dashboard');
    Route::get('/admin-accounts', fn() => Inertia::render('superadmin/admin-accounts'))->name('superadmin.admin-accounts');
    Route::get('/system-settings', fn() => Inertia::render('superadmin/system-settings'))->name('superadmin.system-settings');
    Route::get('/database-schema', fn() => Inertia::render('superadmin/database-schema'))->name('superadmin.database-schema');
    Route::get('/deployment',     fn() => Inertia::render('superadmin/deployment'))->name('superadmin.deployment');
    Route::get('/performance',    fn() => Inertia::render('superadmin/performance'))->name('superadmin.performance');
    Route::get('/backup-recovery', fn() => Inertia::render('superadmin/backup-recovery'))->name('superadmin.backup-recovery');
    Route::get('/offices',        fn() => Inertia::render('superadmin/offices'))->name('superadmin.offices');
    Route::get('/departments',    fn() => Inertia::render('superadmin/departments'))->name('superadmin.departments');
    Route::get('/floor-maps',     fn() => Inertia::render('superadmin/floor-maps'))->name('superadmin.floor-maps');
    Route::get('/nodes',          fn() => Inertia::render('superadmin/nodes'))->name('superadmin.nodes');
    Route::get('/qr-code',        fn() => Inertia::render('superadmin/qr-code'))->name('superadmin.qr-code');
    Route::get('/analytics',      fn() => Inertia::render('superadmin/analytics'))->name('superadmin.analytics');
    Route::get('/users',          fn() => Inertia::render('superadmin/users'))->name('superadmin.users');
    Route::get('/roles',          fn() => Inertia::render('superadmin/roles'))->name('superadmin.roles');
    Route::get('/notifications',  fn() => Inertia::render('superadmin/notifications'))->name('superadmin.notifications');
    Route::get('/settings',       fn() => Inertia::render('superadmin/settings'))->name('superadmin.settings');
});
// ── Profile Routes ───────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get(PROFILE_PATH,    [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch(PROFILE_PATH,  [ProfileController::class, 'update'])->name('profile.update');
    Route::delete(PROFILE_PATH, [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
