<?php

namespace App\Http\Controllers;

use App\Models\Household;
use App\Models\HouseholdMember;
use App\Models\Demographic;
use App\Models\HouseholdContainer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use PhpParser\Node\Stmt\TryCatch;

class HouseholdController extends Controller
{

    public function show(Request $request)
    {
        $query = Household::with(['householdContainer', 'householdMembers.demographic']);

        // Existing barangay filter...
        if ($barangays = $request->input('barangays')) {
            $query->whereIn('Barangay', explode(',', $barangays)); // Assuming barangays are sent as a comma-separated string
        }

        // Add survey status filter
        if ($request->has('surveyStatus')) {
            $query->where('surveyStatus', $request->input('surveyStatus') === 'true');
        }

        if ($containers = $request->input('containers')) {
            $containerNames = explode(',', $containers);
            $query->whereHas('householdContainer', function ($query) use ($containerNames) {
                $query->whereIn('name', $containerNames);
            });
        }

        // Search
        if ($search = $request->input('search')) {
            $query->where('BSN', 'like', "%{$search}%")
                ->orWhere('HUSN', 'like', "%{$search}%")
                ->orWhere('HSN', 'like', "%{$search}%")
                ->orWhere('Barangay', 'like', "%{$search}%")
                ->orWhereHas('householdContainer', function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('householdMembers', function ($query) use ($search) {
                    $query->where('updated_at', 'like', "%{$search}%")
                        ->orWhereHas('demographic', function ($subQuery) use ($search) {
                            $subQuery->where('lastname', 'like', "%{$search}%")
                                ->orWhere('firstname', 'like', "%{$search}%");
                        });
                });
        }

        // Sorting
        if ($sortBy = $request->input('sortBy')) {
            $sortDesc = $request->input('sortDesc') === 'desc' ? 'desc' : 'asc';
            $query->orderBy($sortBy, $sortDesc);
        }

        // Pagination
        $perPage = $request->input('itemsPerPage', 15);
        return $query->paginate($perPage);
    }

    public function showFromBarangay(Request $request, $barangay)
    {
        $query = Household::with(['householdContainer', 'householdMembers.demographic']);

        // Initialize a basic where condition for Barangay
        $query->where('Barangay', '=', $barangay);

        // Search within the specified Barangay
        if ($search = $request->input('search')) {
            $query->where(function ($query) use ($search) {
                $query->where('BSN', 'like', "%{$search}%")
                    ->orWhere('HUSN', 'like', "%{$search}%")
                    ->orWhere('HSN', 'like', "%{$search}%")
                    ->orWhereHas('householdContainer', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })
                    ->orWhereHas('householdMembers', function ($q) use ($search) {
                        $q->where('updated_at', 'like', "%{$search}%")
                            ->orWhereHas('demographic', function ($subQuery) use ($search) {
                                $subQuery->where('lastname', 'like', "%{$search}%")
                                    ->orWhere('firstname', 'like', "%{$search}%");
                            });
                    });
            });
        }

        // Sorting
        if ($sortBy = $request->input('sortBy')) {
            $sortDesc = $request->input('sortDesc') === 'true' ? 'desc' : 'asc'; // Corrected to compare against 'true'
            $query->orderBy($sortBy, $sortDesc);
        }

        // Pagination
        $perPage = $request->input('itemsPerPage', 15);
        return $query->paginate($perPage);
    }



    public function findHousehold(Request $request)
    {
        $members = Household::with(['HouseholdContainer', 'householdMembers.demographic'])
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
            'container_name' => 'required|string'
        ]);
        // Start a database transaction
        DB::beginTransaction();

        try {
            // Check if the HouseholdContainer already exists
            $container = HouseholdContainer::firstOrCreate([
                'name' => $validated['container_name']
            ]);

            // Create the Household with container_id
            $household = Household::create([
                'HouseholdKey' => Str::uuid(),
                'barangay' => $validated['barangay'],
                'sitio' => $validated['sitio'],
                'husn' => $validated['husn'],
                'bsn' => $validated['bsn'],
                'hsn' => $validated['hsn'],
                'address' => $validated['address'],
                'container_id' => $container->id
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

    public function updateHousehold(Request $request, $id)
    {
        $validatedData = $request->validate([
            'barangay' => 'string|nullable',
            'sitio' => 'string|nullable',
            'husn' => 'string|nullable',
            'bsn' => 'string|nullable',
            'hsn' => 'string|nullable',
            'address' => 'string|nullable',
            // Include other fields that you may want to update
        ]);
        try {
            // Find the household by ID
            $household = Household::findOrFail($id);

            // Update the household with validated data
            $household->update($validatedData);

            return response()->json(['message' => 'Household updated successfully.'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions
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
            $demographic->middlename = $validated['middlename'];
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
            $demographic->middlename = $validated['_27c'];

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

    public function multipleUploads(Request $request)
    {
        // return response()->json(['data' => $request['recordbatch']]);
        // return response()->json(['data' => "hell0"]);

        DB::beginTransaction();

        // Check if the HouseholdContainer already exists
        $container = HouseholdContainer::firstOrCreate([
            'name' => $request['recordbatch']
        ]);
        $householdKey = '';

        try {

            $households = [];

            foreach ($request->input('data') as $item) {
                if ($item['household_id'] == null || $item['household_id'] == '') continue;


                // Use the provided household ID from the front end
                $householdKey = $item['household_id'];

                // Check if the household is already processed and mark the first member as head
                $isFirstMember = !isset($households[$householdKey]);

                // Create or update the Household
                $household = Household::updateOrCreate(
                    [
                        'container_id' => $container->id, 'HouseholdKey' => $householdKey, 'bsn' => $item['bsn'], 'husn' => $item['husn'], 'hsn' => $item['hsn'],
                        'barangay' => $request['barangay'], 'sitio' => $item['sitio'], 'address' => $item['address']
                    ]
                );

                if ($isFirstMember) {
                    $households[$householdKey] = $household->toArray();
                    $households[$householdKey]['members'] = [];
                }

                // Create a new HouseholdMember and associate it with the Household
                $member = new HouseholdMember();
                $member->household_id = $household->id; // Directly using the ID from the created/updated household
                $member->head = $isFirstMember; // Mark the first member as head
                $member->save();

                // Prepare demographic data excluding specific keys
                $demographicData = array_diff_key($item, array_flip(['bsn', 'husn', 'hsn', 'barangay', 'sitio', 'address']));

                // Create or update member's demographic details
                $demographic = new Demographic($demographicData);
                $demographic->household_member_id = $member->id;
                $demographic->save();

                // Add the member and demographic details to the household's members array
                $households[$householdKey]['members'][] = [
                    'member' => $member->toArray(),
                    'demographic' => $demographic->toArray()
                ];
            }
            DB::commit();
            return response()->json('Uploaded Successful');
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => $e->getMessage()]);
            // return response()->json($demographic);
        }
    }

    public function updateMemberStatus(Request $request, $id)
    {
        $validatedData = $request->validate([
            'isDead' => 'required|boolean', // true to mark as 'dead', false to mark as 'alive'
        ]);

        $householdMember = Demographic::findOrFail($id);

        $tags = collect(explode(',', $householdMember->tags));

        if ($validatedData['isDead']) {
            // Add 'dead' tag if not already present and remove 'alive' tag
            $tags = $tags->filter(function ($value) {
                return $value !== 'alive';
            });

            if (!$tags->contains('dead')) {
                $tags->push('dead');
            }
        } else {
            // Remove 'dead' tag if present and add 'alive' tag
            $tags = $tags->filter(function ($value) {
                return $value !== 'dead';
            });

            if (!$tags->contains('alive')) {
                $tags->push('alive');
            }
        }

        $householdMember->tags = $tags->join(',');
        $householdMember->save();

        return response()->json(['message' => 'Member status updated successfully']);
    }


    public function updateSurveyStatus(Request $request)
    {

        $validatedData = $request->validate([
            'household_id' => 'required|integer',
            'surveyStatus' => 'required|boolean', // or 'required|string' based on your data type
        ]);

        try {
            $household = Household::findOrFail($validatedData['household_id']);
            $household->surveyStatus = $validatedData['surveyStatus'];
            $household->save();
            return response()->json(['message' => 'Status updated succesfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }


        return response()->json(['message' => 'Survey status updated successfully']);
    }

    public function updateHouseholdContainer(Request $request, $id)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'container_id' => 'required|integer|exists:household_containers,id' // Ensure container_id is provided and exists in the household_containers table
        ]);

        try {
            // Find the household by ID
            $household = Household::findOrFail($id);

            // Update the container_id
            $household->container_id = $validatedData['container_id'];
            $household->save();

            return response()->json(['message' => 'Container updated successfully.'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
