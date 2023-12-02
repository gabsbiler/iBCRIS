<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('households', function (Blueprint $table) {
            $table->id();
            $table->string("BSN");
            $table->string("HUSN");
            $table->string("HSN");
            $table->string("Barangay");
            $table->string("sitio");
            $table->string("address");
            $table->boolean("surveyStatus")->default(0);
            $table->timestamps();
        });

        // Each members of household
        Schema::create('household_members', function (Blueprint $table) {
            $table->id();
            $table->boolean('head');
            $table->unsignedBigInteger('household_id');
            $table->foreign('household_id')
                ->references('id')
                ->on('households')
                ->onDelete('cascade');
            // $table->unsignedBigInteger('demographic_id');
            // $table->unsignedBigInteger('skills_id');
            // $table->unsignedBigInteger('economic_id');
            // $table->unsignedBigInteger('residency');
            $table->timestamps();
        });

        Schema::create('member_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('household_member_id');
            $table->foreign('household_member_id')
                ->references('id')
                ->on('household_members')
                ->onDelete('cascade');

            $table->text('lastname')->nullable();
            $table->text('firstname')->nullable();
            $table->text('middlename')->nullable();
            $table->string('tags')->default('alive');

            $table->text('_3')->nullable();
            $table->text('_4')->nullable();
            $table->text('_5')->nullable();
            $table->date('_6')->nullable();
            $table->text('_7')->nullable();
            $table->text('_8')->nullable();
            $table->text('_9')->nullable();
            $table->text('_10')->nullable();
            $table->text('_11')->nullable();
            $table->text('_12a')->nullable();
            $table->text('_12b')->nullable();
            $table->text('_12c')->nullable();

            $table->text('_13a')->nullable();
            $table->text('_13b')->nullable();
            $table->text('_14a')->nullable();
            $table->text('_14b')->nullable();
            $table->text('_14c')->nullable();
            $table->text('_14d')->nullable();
            $table->text('_14e')->nullable();
            $table->text('_14f')->nullable();
            $table->text('_15a')->nullable();
            $table->text('_15b')->nullable();
            $table->text('_15c')->nullable();

            $table->text('_16a')->nullable();
            $table->text('_16b')->nullable();
            $table->text('_16c')->nullable();
            $table->text('_16d')->nullable();
            $table->text('_16e')->nullable();
            $table->text('_16f')->nullable();

            $table->text('_18')->nullable();
            $table->text('_19')->nullable();
            $table->text('_20a')->nullable();
            $table->text('_20b')->nullable();
            $table->text('_21')->nullable();
            $table->text('_22')->nullable();
            $table->text('_24')->nullable();
            $table->text('_25')->nullable();

            $table->text('_26')->nullable();
            $table->text('_27')->nullable();
            $table->text('_28')->nullable();
            $table->text('_29')->nullable();
            $table->text('_30')->nullable();
            $table->text('_31')->nullable();
            $table->text('_32')->nullable();
            $table->text('_33')->nullable();
            $table->text('_34')->nullable();
            $table->text('_35')->nullable();
            $table->text('_36')->nullable();
            $table->text('_37')->nullable();
            $table->text('_38')->nullable();

            $table->text('_40')->nullable();
            $table->text('_41a')->nullable();
            $table->text('_41b')->nullable();
            $table->text('_42_1')->nullable();
            $table->text('_42_2')->nullable();
            $table->text('_43_1')->nullable();
            $table->text('_43_2')->nullable();
            $table->text('_44_1')->nullable();
            $table->text('_44_2')->nullable();

            $table->text('_45')->nullable();
            $table->text('_46')->nullable();
            $table->text('_47')->nullable();
            $table->text('_48')->nullable();
            $table->text('_49_1')->nullable();
            $table->text('_49_2')->nullable();
            $table->text('_50')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('member_details');
        Schema::dropIfExists('household_members');
        Schema::dropIfExists('households');
    }
};
