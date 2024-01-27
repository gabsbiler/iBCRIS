<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Household extends Model
{
    use HasFactory;

    protected $table = "households";
    protected $primaryKey = "id";
    protected $fillable = ['HouseholdKey', 'barangay', 'sitio', 'husn', 'bsn', 'hsn', 'address', 'container_id'];

    public function householdMembers()
    {
        return $this->hasMany(HouseholdMember::class);
    }

    public function householdContainer()
    {
        return $this->belongsTo(HouseholdContainer::class);
    }
}
