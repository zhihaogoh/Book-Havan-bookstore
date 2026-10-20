<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'recipient_name' => 'sometimes|required|string|max:255',
            'recipent_phone' => 'sometimes|required|string|max:255',
            'address_1' => 'sometimes|required|string|max:255',
            'address_2' => 'sometimes|required|string|max:255',
            'city' => 'sometimes|required|string|max:255',
            'state' => 'sometimes|required|string|max:255',
            'postal_code' => 'sometimes|required|string|max:255',
            'country' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|boolean',
        ];
    }
}
