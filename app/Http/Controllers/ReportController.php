<?php

namespace App\Http\Controllers;

use App\Models\Lookup;
use Illuminate\Support\Facades\DB;
use App\Models\Demographic;
use Carbon\Carbon;

use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    private $dateFrom = '';
    private $dateTo = '';
    private $barangay = '';
    private $ageRange = null;
    //
    public function generate(Request $request)
    {
        $this->dateFrom = Carbon::parse($request['dateFrom'])->toDateString();
        $this->dateTo = Carbon::parse($request['dateTo'])->toDateString();
        $this->barangay = $request['barangay'];
        $this->ageRange = $request['ageRange'];

        return response()->json([
            'totalCountGender' => $this->countGender(),
            'countGenderByAge' => $this->countGenderByAge(),
            'countMaritalByAge' => $this->countMaritalByAge(),
            'countMaleMaritalStats' => $this->countMaleMaritalStats(),
            'countFemaleMaritalStats' => $this->countFemaleMaritalStats(),
            'dateFrom' => $this->dateFrom,
            'dateTo' => $this->dateTo,
            'barangay' => $this->barangay,
            'ageRange' => $this->ageRange
        ]);
    }

    private function countGender()
    {
        $maleCount = Demographic::where('_5', '01')->count();
        $femaleCount = Demographic::where('_5', '02')->count();
        $unknown = Demographic::whereNotIn('_5', ['01', '02'])->count();

        return [
            'Male' => $maleCount,
            'Female' => $femaleCount,
            'Unknown' => $unknown
        ];
    }

    private function countGenderByAge()
    {
        $genderCountByAge = [];

        foreach ($this->ageRange as $age) {
            $male = Demographic::whereBetween('_7', [$age['from'], $age['to']])->where('_5', '01')
                // ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= ?", [$this->dateFrom])
                // ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= ?", [$this->dateTo])
                ->count();

            $female = Demographic::whereBetween('_7', [$age['from'], $age['to']])->where('_5', '02')
                // ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= ?", [$this->dateFrom])
                // ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= ?", [$this->dateTo])
                ->count();

            $unknown = Demographic::whereBetween('_7', [$age['from'], $age['to']])->whereNotIn('_5', ['01', '02'])
                // ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= ?", [$this->dateFrom])
                // ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= ?", [$this->dateTo])
                ->count();

            $genderCountByAge[] = [
                'age' => $age,
                'male' => $male,
                'female' => $female,
                'unknown' => $unknown
            ];
        }

        return $genderCountByAge;
    }

    private function countMaritalByAge()
    {
        $maritalCountByAge = [];
        foreach ($this->ageRange as $age) {
            $unknown = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->whereNotIn('_5', ['01', '02'])
                ->count();
            $single = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_21', '1')
                ->count();
            $married = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_21', '2')
                ->count();
            $consensual = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_21', '3')
                ->count();
            $widow = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_21', '4')
                ->count();
            $divorced = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_21', '5')
                ->count();
            $commonLaw = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_21', '5')
                ->count();




            $maritalCountByAge[] = [
                'age' => $age,
                'status' => [
                    'unknown' => $unknown,
                    'single' => $single,
                    'married' => $married,
                    'consensual' => $consensual,
                    'widow' => $widow,
                    'divorced' => $divorced,
                    'commonLaw' => $commonLaw,
                ]
            ];
        }
        return $maritalCountByAge;
    }

    private function countMaleMaritalStats()
    {
        $maleMaritalStatsByAge = [];
        foreach ($this->ageRange as $age) {
            $single = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_5', '01')
                ->where('_21', '1')
                ->count();

            $married = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_5', '01')
                ->where('_21', '2')
                ->count();

            $maleMaritalStatsByAge[] = [
                'age' => $age,
                'single' => $single,
                'married' => $married
            ];
        }

        return $maleMaritalStatsByAge;
    }

    private function countFemaleMaritalStats()
    {
        $femaleMaritalStatsByAge = [];
        foreach ($this->ageRange as $age) {
            $single = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_5', '02')
                ->where('_21', '1')
                ->count();

            $married = Demographic::whereBetween('_7', [$age['from'], $age['to']])
                ->where('_5', '02')
                ->where('_21', '2')
                ->count();

            $femaleMaritalStatsByAge[] = [
                'age' => $age,
                'single' => $single,
                'married' => $married
            ];
        }

        return $femaleMaritalStatsByAge;
    }

    // public function countOfIndicators(Request $request)
    // {
    //     $lookupId = $request->input('indicator');
    //     $barangays = $request->input('barangays');

    //     $lookup = Lookup::with('lookupList')->find($lookupId);

    //     $column = '_' . ($lookup->column_number);

    //     $results = [];

    //     foreach ($lookup->lookupList as $listItem) {
    //         $counts = [];

    //         foreach ($barangays as $barangay) {
    //             // Join the tables and count occurrences of each code for the barangay
    //             $count = DB::table('households')
    //                 ->join('household_members', 'households.id', '=', 'household_members.household_id')
    //                 ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
    //                 ->where('households.barangay', $barangay)
    //                 ->where('member_details.' . $column, $listItem->lookup_key)
    //                 ->count();

    //             $counts[] = $count;
    //         }

    //         $results[] = [
    //             'indicator' => $lookup->lookup_name,
    //             'barangays' => $barangays,
    //             'content' => [
    //                 'code' => $listItem->lookup_key,
    //                 'description' => $listItem->description,
    //                 'count' => $counts
    //             ]
    //         ];
    //     }

    //     return response()->json(['results' => $results]);
    // }

    public function countOfIndicators(Request $request)
    {
        $lookupId = $request->input('indicator');
        $barangays = $request->input('barangays');

        $lookup = Lookup::with('lookupList')->find($lookupId);

        if (!$lookup) {
            return response()->json(['error' => 'Lookup not found'], 404);
        }

        $column = '_' . ($lookup->column_number);
        $content = [];

        foreach ($lookup->lookupList as $listItem) {
            $counts = [];

            foreach ($barangays as $barangay) {
                // Join the tables and count occurrences of each code for the barangay
                $count = DB::table('households')
                    ->join('household_members', 'households.id', '=', 'household_members.household_id')
                    ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                    ->where('households.barangay', $barangay)
                    ->where('member_details.' . $column, $listItem->lookup_key)
                    ->count();

                $counts[] = $count;
            }

            $content[] = [
                'code' => $listItem->lookup_key,
                'description' => $listItem->description,
                'count' => $counts
            ];
        }

        $results = [
            'indicator' => $lookup->lookup_name,
            'barangays' => $barangays,
            'content' => $content
        ];

        return response()->json($results);
    }
}
