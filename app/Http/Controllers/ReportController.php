<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    //
    public function generate()
    {
        return response()->json(['message' => 'Hello']);
    }
}
