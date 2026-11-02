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
            'status' => 'sometimes|required|boolean|unique:user_address,status,' . $this->route('id') . ',id,user_id,' . $this->user()->id.',status,1',
        ];
    }
    public function messages(): array
{
    return [
        'status.unique' => 'there can only be one active address per user. Please deactivate the current active address before setting a new one.',
    ];
}
}
