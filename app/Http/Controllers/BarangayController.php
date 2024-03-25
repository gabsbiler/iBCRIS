<?php

namespace App\Http\Controllers;

use App\Models\Barangay;
use Illuminate\Http\Request;

class BarangayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $barangays = Barangay::all();
        return response()->json($barangays, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'barangay' => 'required|string|max:255',
        ]);

        $barangay = Barangay::create($validated);
        return response()->json($barangay, 201); // 201 Created
    }

    /**
     * Display the specified resource.
     */
    public function show(Barangay $barangay)
    {
        return response()->json($barangay, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Barangay $barangay)
    {
        $validated = $request->validate([
            'barangay' => 'required|string|max:255',
        ]);

        $barangay->update($validated);
        return response()->json($barangay, 200); // 200 OK
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barangay $barangay)
    {
        $barangay->delete();
        return response()->json(null, 204); // 204 No Content
    }

    /**
     * Handle server-side processing for Vuetify DataTables.
     */
    public function datatables(Request $request)
    {
        $query = Barangay::query();

        // Pagination
        $itemsPerPage = $request->input('itemsPerPage', 10);
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $itemsPerPage;

        // Search - assuming a generic search for simplicity
        if ($search = $request->input('search', '')) {
            $query->where('barangay', 'like', "%{$search}%");
        }

        // Sorting
        $sortBy = $request->input('sortBy', 'id'); // Default sort
        $sortDesc = $request->input('sortDesc', 'false') == 'true' ? 'desc' : 'asc';
        $query->orderBy($sortBy, $sortDesc);

        // Get paginated result
        $total = $query->count();
        $barangays = $query->offset($offset)->limit($itemsPerPage)->get();

        return response()->json([
            'items' => $barangays,
            'total' => $total,
        ]);
    }
}
