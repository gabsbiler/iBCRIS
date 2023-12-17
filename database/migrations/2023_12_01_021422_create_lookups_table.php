<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use League\CommonMark\Reference\Reference;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lookups', function (Blueprint $table) {
            $table->id();
            $table->string("lookup_name");
            $table->string("column_number")->default("unassigned");
            $table->timestamps();
        });

        Schema::create('lookup_list', function (Blueprint $table) {
            $table->id();
            $table->string("lookup_key");
            $table->string("description");

            $table->unsignedBigInteger('lookup_id');
            $table->foreign('lookup_id')
                ->references('id')
                ->on('lookups')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lookup_list');
        Schema::dropIfExists('lookups');
    }
};
