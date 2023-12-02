<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demographic extends Model
{
    use HasFactory;

    protected $table = "member_details";
    protected $primaryKey = "id";
    protected $fillable = ['household_member_id', 'lastname', 'firstname', 'middlename'];
}
