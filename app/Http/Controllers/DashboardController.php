<?php

namespace App\Http\Controllers;

use App\Models\Lookup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function countGender()
    {
        $maleCount = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._5', '01')
            ->count();
        $femaleCount = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._5', '02')
            ->count();
        $unknown = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->whereNotIn('member_details._5', ['01', '02'])->count();

        return [
            'Male' => $maleCount,
            'Female' => $femaleCount,
            'Unknown' => $unknown
        ];
    }

    public function countReligiousAffiliation()
    {
        $baptist = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '10')
            ->count();

        $no_religion = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '00')
            ->count();

        $catholic = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '01')
            ->count();

        $aglipay = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '02')
            ->count();
        $iglesia = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '03')
            ->count();
        $latter = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '04')
            ->count();
        $islam = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '06')
            ->count();
        $Buddhist = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '07')
            ->count();
        $Benevolent = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '08')
            ->count();
        $Seventh = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '09')
            ->count();
        $United = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '11')
            ->count();
        $Episcopal = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '12')
            ->count();
        $Tribal = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '90')
            ->count();

        $Others = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._9', '90')
            ->count();

        return [
            'Convention of the Phil. Baptist Church' => $baptist,
            'No Religion' => $no_religion,
            'Roman Catholic inc Catholic Charismatic' => $catholic,
            'Aglipay/ Iglesia Filipina Independiente' => $aglipay,
            'Iglesia ni Cristo' => $iglesia,
            'Church of Jesus Christ of the Latter Day Saints' => $latter,
            'Islam' => $islam,
            'Buddhist' => $Buddhist,
            'Phil. Benevolent Missionaries Assoc.' => $Benevolent,
            'Seventh Day Adventist' => $Seventh,
            'United Methodist Church' => $United,
            'Phil. Episcopal Church' => $Episcopal,
            'Tribal Religion' => $Tribal,
            'Others' => $Others,
        ];
    }


    public function count($column_number = 11)
    {
        $data = [];

        $lookups = Lookup::join('lookup_list', 'lookups.id', '=', 'lookup_list.lookup_id')
            ->where('column_number', str_replace('_', '.', $column_number))
            ->get();

        foreach ($lookups as $lookup) {
            $dbResponse = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('member_details._' . $column_number, $lookup['lookup_key'])
                ->count();

            $data[$lookup->description] = $dbResponse;
        }

        return $data;
    }

    public function countLookup($column_number = 11, $lookup_number = 00)
    {
        $dbResponse = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('member_details._' . $column_number, $lookup_number)
            ->count();


        return $dbResponse;
    }
}
