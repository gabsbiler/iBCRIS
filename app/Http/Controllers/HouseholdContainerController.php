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
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string' // Validation rule for the 'name' field
        ]);

        try {
            $container = HouseholdContainer::findOrFail($id); // Find the container by ID
            $container->update($validatedData); // Update the container
            return response()->json(['message' => 'Container updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function add(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|unique:household_containers,name' // Ensure name is unique in household_containers table
        ]);

        try {
            $container = HouseholdContainer::create($validatedData);
            return response()->json(['message' => 'Container added successfully', 'container' => $container], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function deleteContainer($id)
    {
        try {
            $container = HouseholdContainer::findOrFail($id);
            $container->delete();
            return response()->json(['message' => 'Container deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
