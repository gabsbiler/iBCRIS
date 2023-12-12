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
            $table->string("BSN")->nullable();
            $table->string("HUSN")->nullable();
            $table->string("HSN")->nullable();
            $table->string("Barangay")->nullable();
            $table->string("sitio")->nullable();
            $table->string("address")->nullable();
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

            //demographics
            $table->text('_3')->nullable(); //(3) How is __ related to household head?
            $table->text('_4')->nullable(); //(4) Family Nucleus
            $table->text('_5')->nullable(); //(5) is __ Male or Female
            $table->date('_6')->nullable(); //(6) When was ____ born? (mm-dd-yyyy)
            $table->text('_7')->nullable(); //(7) How old is ___ as of his/her last birthday?
            $table->text('_8')->nullable(); //(8) What __'s citizenship?
            $table->text('_9')->nullable(); //(9) What is ____'s religion/ religious affiliation?
            $table->text('_10')->nullable(); //(10) What is ____'s ethnicity?
            $table->text('_11')->nullable(); //(11) What is __'s highest educational attainment?
            $table->text('_12a')->nullable(); //(12a) Is __ currently enrolled?
            $table->text('_12b')->nullable(); //(12b) What type of school is __ on?
            $table->text('_12c')->nullable(); //(12c) In what barangay and city/ municipality is __ currently attending school?

            //skills dev
            $table->text('_13a')->nullable(); //(13a) What type of skills do you have?
            $table->text('_13b')->nullable(); //(13b) What type of skills development training is __ interested to join?
            $table->text('_14a')->nullable(); //(14a) Indicator for OFW/OCW and Not Working?
            $table->text('_14a_1')->nullable(); //(14a) Indicate Reason (for NOT WORKING)
            $table->text('_14a_2')->nullable(); //(14a) How many years working as OFW
            $table->text('_14b')->nullable(); //(14b) What is __'s usual activity/ occupation during the past 12 months?
            $table->text('_14c')->nullable(); //(14c) What is the major source of __'s income?
            $table->text('_14d')->nullable(); //(14d) Monthly Income
            $table->text('_14e')->nullable(); //(14e) What is the status of __'s work/ business?
            $table->text('_14f')->nullable(); //(14f) In what barangay and city/ municipality is __'s work/business located?

            //residency
            $table->text('_15a')->nullable(); //(15a) In what year did __ started residing in this housing unit?
            $table->text('_15b')->nullable(); //(15b) Before moving in this housing unit, where did __ reside?
            $table->text('_15c')->nullable(); //(15c) In what barangay/ city/ municipality did __ resides before?
            $table->text('_16a')->nullable(); //(16a) Type of Resident
            $table->text('_16b')->nullable(); //(16b) What are the reason why  __ left his/her previous residence?
            $table->text('_16c')->nullable(); //(16c) Does __ plan to return to previous residence?
            $table->text('_16c_1')->nullable(); //(16c) WHEN to return
            $table->text('_16d')->nullable(); //(16d) What are the reasons why __ transferred in this barangay?
            $table->text('_16e')->nullable(); //(16e) Is Migration permanent?
            $table->text('_16f')->nullable(); //(16f) How long do they intend to stay in the community?

            //birth n marriages
            $table->text('_17')->nullable(); //(17) In what City/ Municipality/ and province was born?
            $table->text('_18')->nullable(); //(18) Is ____'s birth registered with the LRCO?
            $table->text('_19')->nullable(); //(19) Why was ___'s birth not registered?
            $table->text('_20a')->nullable(); //(20a) Where was  __ delivered?
            $table->text('_20b')->nullable(); //(20b) Who attended in the delivery of __?
            $table->text('_20c')->nullable(); //(20c) What is the last vaccine received by ____?
            $table->text('_21')->nullable(); //(21) What is ______'s marital status?
            $table->text('_22')->nullable(); //(22) When did ___'s marriage occur?
            $table->text('_23')->nullable(); //(23) In what City/ Municipality/ and province did ___'s marriage occur?
            $table->text('_24')->nullable(); //(24) Type of Marriage ceremony?
            $table->text('_25')->nullable(); //(25) Is __'s marriage registered with the LCRO?
            $table->text('_26')->nullable(); //(26)Why was ___'s marriage not registered?

            //death
            $table->text('_27a')->nullable(); //(27a) Surname
            $table->text('_27b')->nullable(); //(27b) Given Name
            $table->text('_27c')->nullable(); //(27c) Middle Name
            $table->text('_28')->nullable(); //(28) Relationship of the deceased to the Household Head
            $table->text('_29')->nullable(); //(29) Is __ Male or Female?
            $table->text('_30')->nullable(); //(30) Date of Birth
            $table->text('_31')->nullable(); //(31) Date of Death
            $table->text('_32')->nullable(); //(32) Age at the time of death
            $table->text('_33')->nullable(); //(33) Place of Death (Municipal/City, Province)
            $table->text('_34')->nullable(); //(34) What is __'s cause of death?
            $table->text('_35')->nullable(); //(35) Is ____'s death registered with the LCRO?
            $table->text('_36')->nullable(); //(36) Why was ___'s death not registered?
            $table->text('_37')->nullable(); // (37) Is deceased female age 15-49?
            $table->text('_38')->nullable(); //(38) Maternal Condition

            //health
            $table->text('_39a')->nullable(); //(39a) Any pregnant female members in this household?
            $table->text('_39b')->nullable(); //(39b) Number of Pregnancies
            $table->text('_39c_1')->nullable(); //(39c.1) Is female age 10-54 using Family Planning Method?
            $table->text('_39c_2')->nullable(); //(39c.2) Family Planning Method?
            $table->text('_39d')->nullable(); //(39d) Where did they obtain the FP method?
            $table->text('_39e_1')->nullable(); //(39e.1) Is there any intension to use Modern FP method?
            $table->text('_39e_2')->nullable(); //(39e.2) Modern FP method?
            $table->text('_40')->nullable(); //(40) What is the primary health insurance __ have?
            $table->text('_41a')->nullable(); //(41a) What facility did __ visited in the past 12 months?
            $table->text('_41b')->nullable(); //(41b) What is the reason for the visit in health facility?
            $table->text('_42_1')->nullable(); //(42.1) Is there a member of the HH that undergo Continuous Medical Care
            $table->text('_42_2')->nullable(); //(42.2) Continuous Medical Care

            //SocioCivi
            $table->text('_43_1')->nullable(); //(43.1) Is there a member of the HH that has Mental Health Issues
            $table->text('_43_2')->nullable(); //(43.2) Mental Health Issue
            $table->text('_44_1')->nullable(); //(44.1) Is there a member of HH that has Nutritional Issues?
            $table->text('_44_2')->nullable(); //(44.2) Nutritional Issue?
            $table->text('_45')->nullable(); //(45) Is there a member of HH that has any disabilities?
            $table->text('_45_1')->nullable(); //(45) Disability/ies
            $table->text('_46')->nullable(); // (46) Is there a member of the HH that is a solo parent?
            $table->text('_46_1')->nullable(); //Is he/ she registered?
            $table->text('_47')->nullable(); //(47) Is there a member of Indegenous People(IPs)
            $table->text('_47_1')->nullable(); //(47) Specify the ethnic group belongs to
            $table->text('_48')->nullable(); //(48) Is __ a registered senior citizen?
            $table->text('_49_1')->nullable(); //(49.1) Is there a member of LGBTQ++ in the House Hold?
            $table->text('_49_2')->nullable(); //(49.2) Select gender
            $table->text('_50')->nullable(); //(50) Is __ a registered voter?
            $table->text('_50_1')->nullable(); //(50) To what brgy is ___ a registered voter?

            //teenage pregnancy
            $table->text('isPregnant')->nullable(); //Is the HH enaged in teenage pregnancy incident in the last 3 years?
            $table->text('_51')->nullable(); //(51) When the incidence occurred?
            $table->text('_51_1')->nullable(); //(51) Age during the incidence occurred?
            $table->text('_52')->nullable(); //(52) Age of Father of the child during incidence occurred?
            $table->text('_53_1')->nullable(); //(53.1) Is teenager studying?
            $table->text('_53_2')->nullable(); //(53.2) Is Father Studying?
            $table->text('_54_1')->nullable(); //(54.1) Where he/she studying
            $table->text('_54')->nullable(); //(54) Where he/she is studying?
            $table->text('_55')->nullable(); //(55) Delivery Complication?
            $table->text('_56')->nullable(); //(56) What are the complications?
            $table->text('_57')->nullable(); //(57) Next Action Plan


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
