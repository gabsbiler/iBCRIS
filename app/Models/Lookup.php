<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lookup extends Model
{
    use HasFactory;

    protected $table = "lookups";
    protected $primaryKey = "id";
    protected $fillable = ['lookup_name'];

    public function lookupList()
    {
        return $this->hasMany(LookupList::class);
    }
}
