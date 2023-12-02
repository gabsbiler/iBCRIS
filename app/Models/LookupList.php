<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LookupList extends Model
{
    use HasFactory;

    protected $table = "lookup_list";

    protected $primaryKey = "id";

    public function lookup()
    {
        return $this->belongsTo(Lookup::class);
    }
}
