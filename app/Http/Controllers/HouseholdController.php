<?php

namespace App\Http\Controllers;

use App\Models\Household;
use App\Models\HouseholdMember;
use App\Models\Demographic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HouseholdController extends Controller
{
    public function show()
    {
        $household = Household::with(['householdMembers.demographic'])->get();
        return $household;
    }

    public function findHousehold(Request $request)
    {
        $members = Household::with(['householdMembers.demographic'])
            ->where('id', $request->id)
            ->first();

        if ($members) {
            return $members;
        } else {
            return response()->json(['error' => 'Household not found'], 404);
        }
    }

    public function findHouseholdMember(Request $request)
    {
        // Assuming you have 'household_id' and 'member_id' in the request
        $householdId = $request->household_id;
        $memberId = $request->member_id;

        // Find the household member within a specific household
        $member = HouseholdMember::with('demographic')
            ->where('household_id', $householdId)
            ->where('id', $memberId)
            ->first();

        // Check if the member was found
        if ($member) {
            return $member;
        } else {
            return response()->json(['error' => 'Household member not found'], 404);
        }
        return $householdId + $memberId;
    }

    public function addHousehold(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'barangay' => 'required|string',
            'sitio' => 'required|string',
            'husn' => 'required|string',
            'bsn' => 'required|string',
            'hsn' => 'required|string',
            'address' => 'required|string',
            'lastname' => 'required|string',
            'firstname' => 'required|string',
            'middlename' => 'string|nullable',
        ]);
        // Start a database transaction
        DB::beginTransaction();

        try {
            // Create the Household
            $household = Household::create([
                'barangay' => $validated['barangay'],
                'sitio' => $validated['sitio'],
                'husn' => $validated['husn'],
                'bsn' => $validated['bsn'],
                'hsn' => $validated['hsn'],
                'address' => $validated['address'],
            ]);

            // Create the HouseholdMember
            $member = new HouseholdMember();
            $member->household_id = $household->id;
            $member->head = true; // Assuming the first member is the head
            $member->save();

            // Create the Demographic (member details)
            $demographic = new Demographic([
                'household_member_id' => $member->id,
                'lastname' => $validated['lastname'],
                'firstname' => $validated['firstname'],
                'middlename' => $validated['middlename'] ?? null,
            ]);
            $demographic->save();

            // Commit the transaction
            DB::commit();

            return response()->json(["message" => 'Household Added'], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function addMember(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'household_id' => 'required|integer'
        ]);
        // Start a database transaction
        DB::beginTransaction();

        try {

            // Create the HouseholdMember
            $member = new HouseholdMember();
            $member->household_id = $validated['household_id'];
            $member->head = false; // Assuming the first member is the head
            $member->save();

            // Create the Demographic (member details)
            $demographic = new Demographic([
                'household_member_id' => $member->id,
            ]);
            $demographic->save();

            // Commit the transaction
            DB::commit();

            return response()->json(["message" => 'Member Init Added', "household_member_id" => $demographic->household_member_id], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateMember(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'member_id' => 'required|integer',
            'lastname' => 'string|nullable',
            'firstname' => 'string|nullable',
            'middlename' => 'string|nullable',
            '_3' => 'string|nullable',
            '_4' => 'string|nullable',
            '_5' => 'string|nullable',
            '_6' => 'string|nullable',
            '_7' => 'string|nullable',
            '_8' => 'string|nullable',
            '_9' => 'string|nullable',
            '_10' => 'string|nullable',
            '_11' => 'string|nullable',
            '_12a' => 'string|nullable',
            '_12b' => 'string|nullable',
            '_12c' => 'string|nullable',
        ]);
        // return $validated;
        try {
            // Find the household member
            $member = HouseholdMember::findOrFail($validated['member_id']);

            // Update the demographic details
            $demographic = $member->demographic;
            $demographic->lastname = $validated['lastname'];
            $demographic->firstname = $validated['firstname'];
            $demographic->_3 = $validated['_3'];
            $demographic->_4 = $validated['_4'];
            $demographic->_5 = $validated['_5'];
            $demographic->_6 = $validated['_6'];
            $demographic->_7 = $validated['_7'];
            $demographic->_8 = $validated['_8'];
            $demographic->_9 = $validated['_9'];
            $demographic->_10 = $validated['_10'];
            $demographic->_11 = $validated['_11'];
            $demographic->_12a = $validated['_12a'];
            $demographic->_12b = $validated['_12b'];
            $demographic->_12c = $validated['_12c'];
            $demographic->save();

            return response()->json(["message" => 'Member updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
