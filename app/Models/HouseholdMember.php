<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HouseholdMember extends Model
{
    use HasFactory;

    protected $table = "household_members";
    protected $primaryKey = "id";

    public function household()
    {
        return $this->belongsTo(Household::class);
    }

    public function demographic()
    {
        return $this->hasOne(Demographic::class);
    }
}
