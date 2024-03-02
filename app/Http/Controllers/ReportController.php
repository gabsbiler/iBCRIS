<?php

namespace App\Http\Controllers;

use App\Models\Lookup;
use Illuminate\Support\Facades\DB;
use App\Models\Demographic;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Request;
use Mockery\Undefined;

class ReportController extends Controller
{
    private $dateFrom = '';
    private $dateTo = '';
    private $barangay = '';
    private $ageRange = null;
    //
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'barangay' => 'required | string',
            'dateFrom' => 'required | date',
            'dateTo' => 'required | date',
            'ageRange' => 'required | array'
        ]);
        $this->dateFrom = $validated['dateFrom'];
        $this->dateTo = $validated['dateTo'];
        $this->barangay = $validated['barangay'];
        $this->ageRange = $validated['ageRange'];

        return response()->json([
            'totalCountGender' => $this->countGender(),
            'countGenderByAge' => $this->countGenderByAge(),
            'countMaritalByAge' => $this->countMaritalByAge(),
            'countMaritalStatus' => $this->countMaritalStatus(),
            'dateFrom' => $this->dateFrom,
            'dateTo' => $this->dateTo,
            'barangay' => $this->barangay,
            'ageRange' => $this->ageRange
        ]);
    }

    private function countGender()
    {
        $maleCount = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('households.barangay', $this->barangay)
            ->where('member_details._5', '01')
            ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
            ->count();
        $femaleCount = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('households.barangay', $this->barangay)
            ->where('member_details._5', '02')
            ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
            ->count();
        $unknown = DB::table('households')
            ->join('household_members', 'households.id', '=', 'household_members.household_id')
            ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
            ->where('households.barangay', $this->barangay)
            ->whereNotIn('member_details._5', ['01', '02'])->count();

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
            $male = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._5', '01')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $female = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._5', '02')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $unknown = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->whereNotIn('member_details._5', ['01', '02'])
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
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
            $unknown = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->whereNotIn('member_details._21', ['1', '2', '3', '4', '5', '6', '7'])
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $single = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._21', '1')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();


            $married = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._21', '2')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $consensual = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._21', '3')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $widow = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._21', '4')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $divorced = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._21', '5')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $commonLaw = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._21', '6')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $legallySeparated = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._21', '9')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
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
                    'legallySeparated' => $legallySeparated
                ]
            ];
        }
        return $maritalCountByAge;
    }

    private function countMaritalStatus()
    {
        $maleMaritalStatsByAge = [];
        foreach ($this->ageRange as $age) {
            // $singleMale = Demographic::whereBetween('_7', [$age['from'], $age['to']])
            //     ->where('_5', '01')
            //     ->where('_21', '1')
            //     ->count();

            $singleMale = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._5', '01')
                ->where('member_details._21', '1')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $singleFemale = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._5', '02')
                ->where('member_details._21', '1')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $marriedMale = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._5', '01')
                ->where('member_details._21', '2')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $marriedFemale = DB::table('households')
                ->join('household_members', 'households.id', '=', 'household_members.household_id')
                ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                ->where('households.barangay', $this->barangay)
                ->where('member_details._5', '02')
                ->where('member_details._21', '2')
                ->whereBetween('member_details._7', [$age['from'], $age['to']])
                ->whereBetween('member_details.created_at', [$this->dateFrom, $this->dateTo])
                ->count();

            $maleMaritalStatsByAge[] = [
                'age' => $age,
                'singleMale' => $singleMale,
                'singleFemale' => $singleFemale,
                'marriedMale' => $marriedMale,
                'marriedFemale' => $marriedFemale
            ];
        }

        return $maleMaritalStatsByAge;
    }

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

    public function getRbi(Request $request)
    {

        $validated = $request->validate([
            'barangay' => 'required | array',
            'dateFrom' => 'required | date',
            'dateTo' => 'required | date',
            'ageRange' => 'required | array'
        ]);

        $ages = [];
        $male = 0;
        $female = 0;
        $household = 0;
        $unknown = 0;
        $results = [];
        foreach ($validated['barangay'] as $barangay) {
            // household
            try {
                $household = DB::table('households')
                    ->where('households.barangay', $barangay)
                    ->whereBetween('households.created_at', [$validated['dateFrom'], $validated['dateTo']])
                    ->count();
            } catch (Exception $e) {
                return response()->json($e);
            }


            // male
            try {
                $male = DB::table('households')
                    ->join('household_members', 'households.id', '=', 'household_members.household_id')
                    ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                    ->where('households.barangay', $barangay)
                    ->where('member_details._5', '01')
                    ->whereBetween('member_details.created_at', [$validated['dateFrom'], $validated['dateTo']])
                    ->count();
            } catch (Exception $e) {
                return response()->json($e);
            }

            // female
            try {
                $female = DB::table('households')
                    ->join('household_members', 'households.id', '=', 'household_members.household_id')
                    ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                    ->where('households.barangay', $barangay)
                    ->where('member_details._5', '02')
                    ->whereBetween('member_details.created_at', [$validated['dateFrom'], $validated['dateTo']])
                    ->count();
            } catch (Exception $e) {
                return response()->json($e);
            }

            // unknown
            try {
                $unknown = DB::table('households')
                    ->join('household_members', 'households.id', '=', 'household_members.household_id')
                    ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                    ->where('households.barangay', $barangay)
                    ->whereNot('member_details._5', '02')
                    ->whereNot('member_details._5', '01')
                    ->whereBetween('member_details.created_at', [$validated['dateFrom'], $validated['dateTo']])
                    ->count();
            } catch (Exception $e) {
                return response()->json($e);
            }

            // Age Range
            foreach ($validated['ageRange'] as $ageRange) {
                try {
                    $age = DB::table('households')
                        ->join('household_members', 'households.id', '=', 'household_members.household_id')
                        ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                        ->where('households.barangay', $barangay)
                        ->whereBetween('member_details._7', [$ageRange['from'], $ageRange['to']])
                        ->whereBetween('member_details.created_at', [$validated['dateFrom'], $validated['dateTo']])
                        ->count();

                    $ages[] = $age;
                } catch (Exception $e) {
                    return response()->json($e);
                }
            };


            $results[] = [
                'household' => $household,
                'barangay' => $barangay,
                'ageRange' => $ages,
                'male' => $male,
                'female' => $female,
                'unknown' => $unknown
            ];

            $ages = [];
            $male = 0;
            $female = 0;
            $household = 0;
            $unknown = 0;
        }
        return response()->json($results);
    }

    public function generateCustomReport(Request $request)
    {
        $validated = $request->validate([
            'barangay' => 'required|string',
            'dateFrom' => 'required|date',
            'dateTo' => 'required|date',
            'ageRange' => 'required|array',
            'selectedLookup' => 'required|array',
            'selectedIndicators'  => 'required|array'
        ]);

        $results = [];
        foreach ($validated['ageRange'] as $age) {
            $resultWithIndicator = [];
            foreach ($validated['selectedIndicators'] as $indicator) {
                $columnNumber = $validated['selectedLookup']['column_number'];
                $columnName = "member_details._" . $columnNumber;

                $count = DB::table('households')
                    ->join('household_members', 'households.id', '=', 'household_members.household_id')
                    ->join('member_details', 'household_members.id', '=', 'member_details.household_member_id')
                    ->where('households.barangay', $validated['barangay'])
                    ->where($columnName, $indicator['lookup_key'])
                    ->whereBetween('member_details._7', [$age['from'], $age['to']]) // Assuming '_7' is your age column
                    ->whereBetween('member_details.created_at', [$validated['dateFrom'], $validated['dateTo']])
                    ->count();

                $resultWithIndicator[] = [
                    'indicator' => '[' . $indicator['lookup_key'] . '] ' . $indicator['description'],
                    'count' => $count,
                ];
            }

            $results[] = [
                'result' => $resultWithIndicator,
                'ageRange' => $age['from'] . '-' . $age['to'],
            ];
        }

        return response()->json($results);
    }
}
