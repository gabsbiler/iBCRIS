<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        Gate::define('access-dashboard', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('access-users', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('access-records', function ($user) {
            return in_array($user->role, ['admin', 'brgyEncoder']);
        });

        Gate::define('access-reports', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('access-lookups', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('access-mass-uploads', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('access-record-batch', function ($user) {
            return $user->role === 'admin';
        });
    }
}
