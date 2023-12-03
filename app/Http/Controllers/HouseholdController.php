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
        // return $request;
        // Validate the request data
        $validated = $request->validate([
            'household_member_id' => 'required|integer',
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
            '_13a' => 'string|nullable',
            '_13b' => 'string|nullable',
            '_14a' => 'string|nullable',
            '_14b' => 'string|nullable',
            '_14c' => 'string|nullable',
            '_14d' => 'string|nullable',
            '_14e' => 'string|nullable',
            '_14f' => 'string|nullable',
            '_15a' => 'string|nullable',
            '_15b' => 'string|nullable',
            '_15c' => 'string|nullable',
            '_16a' => 'string|nullable',
            '_16b' => 'string|nullable',
            '_16c' => 'string|nullable',
            '_16d' => 'string|nullable',
            '_16e' => 'string|nullable',
            '_16f' => 'string|nullable',
            '_17' => 'string|nullable',
            '_18' => 'string|nullable',
            '_19' => 'string|nullable',
            '_20a' => 'string|nullable',
            '_20b' => 'string|nullable',
            '_21' => 'string|nullable',
            '_22' => 'string|nullable',
            '_23' => 'string|nullable',
            '_24' => 'string|nullable',
            '_25' => 'string|nullable',
            '_26' => 'string|nullable',
            '_39a' => 'string|nullable',
            '_39b' => 'string|nullable',
            '_39bb' => 'string|nullable',
            '_39c_1' => 'string|nullable',
            '_39c_2' => 'string|nullable',
            '_39d' => 'string|nullable',
            '_39e_1' => 'string|nullable',
            '_39e_2' => 'string|nullable',
            '_40' => 'string|nullable',
            '_41a' => 'string|nullable',
            '_41b' => 'string|nullable',
            '_42_1' => 'string|nullable',
            '_42_2' => 'string|nullable',
            '_43_1' => 'string|nullable',
            '_43_2' => 'string|nullable',
            '_44_1' => 'string|nullable',
            '_44_2' => 'string|nullable',
            '_45' => 'string|nullable',
            '_47' => 'string|nullable',
            '_49_1' => 'string|nullable',
            '_49_2' => 'string|nullable',
            '_46' => 'string|nullable',
            '_50' => 'string|nullable',
            '_48' => 'string|nullable',

            '_51' => 'string|nullable',
            '_52' => 'string|nullable',
            '_53_1' => 'string|nullable',
            '_53_2' => 'string|nullable',
            '_54' => 'string|nullable',
            '_55' => 'string|nullable',
            '_56' => 'string|nullable',
            '_57' => 'string|nullable',



        ]);
        try {
            // Find the household member
            $member = HouseholdMember::findOrFail($validated['household_member_id']);

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
            $demographic->_13a = $validated['_13a'];
            $demographic->_13b = $validated['_13b'];
            $demographic->_14a = $validated['_14a'];
            $demographic->_14b = $validated['_14b'];
            $demographic->_14c = $validated['_14c'];
            $demographic->_14d = $validated['_14d'];
            $demographic->_14e = $validated['_14e'];
            $demographic->_14f = $validated['_14f'];
            $demographic->_15a = $validated['_15a'];
            $demographic->_15b = $validated['_15b'];
            $demographic->_15c = $validated['_15c'];
            $demographic->_16a = $validated['_16a'];
            $demographic->_16b = $validated['_16b'];
            $demographic->_16c = $validated['_16c'];
            $demographic->_16d = $validated['_16d'];
            $demographic->_16e = $validated['_16e'];
            $demographic->_16f = $validated['_16f'];
            $demographic->_17 = $validated['_17'];
            $demographic->_18 = $validated['_18'];
            $demographic->_19 = $validated['_19'];
            $demographic->_20a = $validated['_20a'];
            $demographic->_20b = $validated['_20b'];
            $demographic->_21 = $validated['_21'];
            $demographic->_22 = $validated['_22'];
            $demographic->_23 = $validated['_23'];
            $demographic->_24 = $validated['_24'];
            $demographic->_25 = $validated['_25'];
            $demographic->_26 = $validated['_26'];

            $demographic->_39a = $validated['_39a'];
            $demographic->_39b = $validated['_39b'];
            $demographic->_39bb = $validated['_39bb'];
            $demographic->_39c_1 = $validated['_39c_1'];
            $demographic->_39c_2 = $validated['_39c_2'];
            $demographic->_39d = $validated['_39d'];
            $demographic->_39e_1 = $validated['_39e_1'];
            $demographic->_39e_2 = $validated['_39e_2'];
            $demographic->_40 = $validated['_40'];
            $demographic->_41a = $validated['_41a'];
            $demographic->_41b = $validated['_41b'];
            $demographic->_42_1 = $validated['_42_1'];
            $demographic->_42_2 = $validated['_42_2'];
            $demographic->_43_1 = $validated['_43_1'];
            $demographic->_43_2 = $validated['_43_2'];
            $demographic->_44_1 = $validated['_44_1'];
            $demographic->_44_2 = $validated['_44_2'];

            $demographic->_44_2 = $validated['_45'];
            $demographic->_47 = $validated['_47'];
            $demographic->_49_1 = $validated['_49_1'];
            $demographic->_49_2 = $validated['_49_2'];
            $demographic->_46 = $validated['_46'];
            $demographic->_50 = $validated['_50'];
            $demographic->_48 = $validated['_48'];

            $demographic->_51 = $validated['_51'];
            $demographic->_52 = $validated['_52'];
            $demographic->_53_1 = $validated['_53_1'];
            $demographic->_53_2 = $validated['_53_2'];
            $demographic->_54 = $validated['_54'];
            $demographic->_55 = $validated['_55'];
            $demographic->_56 = $validated['_56'];
            $demographic->_57 = $validated['_57'];





            $demographic->save();

            return response()->json(["message" => 'Member updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateDeceasedMember(Request $request)
    {
        $validated = $request->validate([
            'household_member_id' => 'required|integer',
            '_27a' => 'string|nullable',
            '_27b' => 'string|nullable',
            '_27c' => 'string|nullable',
            '_28' => 'string|nullable',
            '_29' => 'string|nullable',
            '_30' => 'string|nullable',
            '_31' => 'string|nullable',
            '_32' => 'string|nullable',
            '_33' => 'string|nullable',
            '_34' => 'string|nullable',
            '_35' => 'string|nullable',
            '_36' => 'string|nullable',
            '_37' => 'string|nullable',
            '_38' => 'string|nullable',
        ]);
        try {
            // Find the household member
            $member = HouseholdMember::findOrFail($validated['household_member_id']);

            // Update the demographic details
            $demographic = $member->demographic;
            $demographic->lastname = $validated['_27a'];
            $demographic->firstname = $validated['_27b'];
            $demographic->firstname = $validated['_27c'];

            $demographic->_27a = $validated['_27a'];
            $demographic->_27b = $validated['_27b'];
            $demographic->_27c = $validated['_27c'];

            $demographic->_28 = $validated['_28'];
            $demographic->_29 = $validated['_29'];
            $demographic->_30 = $validated['_30'];
            $demographic->_31 = $validated['_31'];
            $demographic->_32 = $validated['_32'];
            $demographic->_33 = $validated['_33'];
            $demographic->_34 = $validated['_34'];
            $demographic->_35 = $validated['_35'];
            $demographic->_36 = $validated['_36'];
            $demographic->_37 = $validated['_37'];
            $demographic->_38 = $validated['_38'];
            $demographic->save();

            return response()->json(["message" => 'Member updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteHousehold(Request $request)
    {
        $validated = $request->validate([
            'household_id' => 'required|integer'
        ]);

        DB::beginTransaction();

        try {
            $household = Household::findOrFail($validated['household_id']);

            foreach ($household->householdMembers as $member) {
                if ($member->demographic) {
                    $member->demographic->delete();
                }
                $member->delete();
            }

            $household->delete();
            DB::commit();

            return response()->json(["message" => 'Household deleted successfully'], 200);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteHouseholdMember(Request $request)
    {
        // Validate the request to ensure a member ID is provided
        $validated = $request->validate([
            'household_member_id' => 'required|integer'
        ]);

        // Start a database transaction
        DB::beginTransaction();

        try {
            // Find the household member by ID
            $member = HouseholdMember::findOrFail($validated['household_member_id']);

            // Check if the member is the head of the household
            if ($member->head) {
                return response()->json(["message" => 'Cannot delete the head of the household'], 400);
            }

            // Delete the demographic details for the member
            if ($member->demographic) {
                $member->demographic->delete();
            }

            // Delete the household member
            $member->delete();

            // Commit the transaction
            DB::commit();

            return response()->json(["message" => 'Household member deleted successfully'], 200);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollback();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
