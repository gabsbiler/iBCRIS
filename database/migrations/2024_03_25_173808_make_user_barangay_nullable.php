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
        // Ensure there are no NULL values in the 'barangay' column
        DB::table('users')->whereNull('barangay')->update(['barangay' => 'default_value']);

        // Now modify the column to be nullable
        Schema::table('users', function (Blueprint $table) {
            $table->string('barangay')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('barangay')->nullable(false)->change();
        });
    }
};
