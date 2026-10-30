<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string', 'current_password'],
            'new_password' => ['required', 'string', 'min:8', 'confirmed','different:current_password'],

        ];
    }
    public function messages(): array
    {
        return [
            'current_password.required' =>
            'Current password is required.',

            'current_password.current_password' =>
            'Current password is incorrect.',

            'new_password.required' =>
            'New password is required.',

            'new_password.min' =>
            'New password must be at least 8 characters.',

            'new_password.confirmed' =>
            'New password confirmation does not match.',

        ];
    }
}
