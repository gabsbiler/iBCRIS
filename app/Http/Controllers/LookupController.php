<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lookup;

class LookupController extends Controller
{

    public function show()
    {
        $lookup = Lookup::with('lookupList')->get();
        return $lookup;
    }


    public function showLookupList(Request $request)
    {
        $lookup = Lookup::with('lookupList')->where('column_number', $request->column_number)->get();

        foreach ($lookup as $item) {
            $lookupList = $item->lookupList;
        }
        // return $request;
        return $lookupList;
    }
}
