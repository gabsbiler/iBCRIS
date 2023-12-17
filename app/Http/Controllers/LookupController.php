<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lookup;
use App\Models\LookupList;
use Illuminate\Support\Facades\DB;

class LookupController extends Controller
{

    public function show()
    {
        $lookup = Lookup::with('lookupList')->get();
        return $lookup;
    }


    public function showLookupList(Request $request)
    {
        $validatedData = $request->validate([
            'lookupid' => 'required|integer'
        ]);

        $lookupLists = Lookup::findOrFail($validatedData['lookupid'])->lookupList;

        return response()->json($lookupLists);
    }


    public function addLookup(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'items' => 'required|array',
            'items.*.code' => 'required|string',
            'items.*.description' => 'required|string'
        ]);

        // Start a database transaction
        DB::beginTransaction();

        try {
            $lookup = new Lookup();
            $lookup->lookup_name = $validatedData['name'];
            $lookup->save();

            foreach ($validatedData['items'] as $itemData) {
                $lookupList = new LookupList();
                $lookupList->lookup_id = $lookup->id;
                $lookupList->lookup_key = $itemData['code'];
                $lookupList->description = $itemData['description'];
                $lookupList->save();
            }

            DB::commit();

            return response()->json(['message' => 'Lookup and its items added successfully']);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function addNewLookupEntry(Request $request)
    {
        $validatedData = $request->validate([
            'lookupid' => 'required|integer',
            'code' => 'required|string',
            'description' => 'required|string',
        ]);

        // Find the lookup by ID
        $lookup = Lookup::findOrFail($validatedData['lookupid']);

        // Create a new LookupList item
        $lookupList = new LookupList();
        $lookupList->lookup_id = $lookup->id; // Set the foreign key reference
        $lookupList->lookup_key = $validatedData['code'];
        $lookupList->description = $validatedData['description'];
        $lookupList->save();

        return response()->json(['message' => 'New lookup entry added successfully']);
    }


    public function deleteLookupEntry(Request $request)
    {
        $validatedData = $request->validate([
            'lookup_id' => 'required|integer',
            'lookupKey' => 'required|string',
        ]);

        // Assuming 'lookup_id' in LookupList model is a foreign key to the Lookup model
        $lookupEntry = LookupList::where('lookup_id', $validatedData['lookup_id'])
            ->where('lookup_key', $validatedData['lookupKey'])
            ->firstOrFail();

        $lookupEntry->delete();

        return response()->json(['message' => 'Lookup entry deleted successfully']);
    }
}
