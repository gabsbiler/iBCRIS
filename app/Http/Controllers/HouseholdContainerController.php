<?php

namespace App\Http\Controllers;

use App\Models\HouseholdContainer;
use Illuminate\Http\Request;

class HouseholdContainerController extends Controller
{
    public function show()
    {
        $data = HouseholdContainer::get();
        return $data;
    } //
}
