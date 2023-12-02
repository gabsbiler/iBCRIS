<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    use HasFactory;

    protected $table = "households";
    protected $primaryKey = "id";
    protected $fillable = ['barangay', 'sitio', 'husn', 'bsn', 'hsn', 'address'];

    public function householdMembers()
    {
        return $this->hasMany(HouseholdMember::class);
    }
}
