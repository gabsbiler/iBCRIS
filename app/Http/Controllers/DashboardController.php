<?php

namespace App\Http\Controllers;

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
}
