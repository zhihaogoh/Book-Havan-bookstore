<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    protected $table = 'user_address';

    protected $fillable = [
        'user_id',
        'recipient_name',
        'recipent_phone',
        'address_1',
        'address_2',
        'city',
        'state',
        'postal_code',
        'country',
        'status'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
