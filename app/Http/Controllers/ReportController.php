<?php

namespace App\Http\Controllers;

use App\Models\Demographic;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    private $dateFrom = '';
    private $dateTo = '';
    //
    public function generate(Request $request)
    {
        $this->dateFrom = Carbon::parse($request['dateFrom'])->toDateString();
        $this->dateTo = Carbon::parse($request['dateTo'])->toDateString();
        return response()->json([
            'countGender' => $this->countGender(),
            'countGenderByAge' => $this->countGenderByAge(),
            'dateFrom' => $this->dateFrom,
            'dateTo' => $this->dateTo,
        ]);
    }

    private function countGender()
    {
        $maleCount = Demographic::where('_5', '01')->count();
        $femaleCount = Demographic::where('_5', '02')->count();

        return [
            'male_count' => $maleCount,
            'female_count' => $femaleCount,
        ];
    }

    public function countGenderByAge()
    {
        $ageRange = range(1, 50); // Adjust the age range as needed
        $genderCountByAge = [];

        foreach ($ageRange as $age) {
            $maleCount = Demographic::where('_5', '01')
                ->where('_7', $age)
                ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= ?", [$this->dateFrom])
                ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= ?", [$this->dateTo])
                ->count();

            $femaleCount = Demographic::where('_5', '02')
                ->where('_7', $age)
                ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') >= ?", [$this->dateFrom])
                ->whereRaw("DATE_FORMAT(created_at, '%Y-%m-%d') <= ?", [$this->dateTo])
                ->count();

            $genderCountByAge[] = [
                'age' => $age,
                'male' => $maleCount,
                'female' => $femaleCount,
            ];
        }

        return $genderCountByAge;
    }
}
