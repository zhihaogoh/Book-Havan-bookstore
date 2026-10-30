<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
            'first_name' => ['sometimes','required','string','max:255'],
            'last_name' => ['sometimes','nullable','string','max:255'],
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users', 'email')->ignore($this->user()->id)],
            'phone_number' => ['sometimes', 'nullable', 'string', 'max:20', Rule::unique('users', 'phone_number')->ignore($this->user()->id)],
            'gender' => ['sometimes','nullable','string','in:male,female,other'],
            'date_of_birth' => ['sometimes','nullable','date'],
            'user_role' => ['sometimes','in:admin,user'],
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'First name is required.',
            'last_name.required' => 'Last name is required.',
            'email.required' => 'Email is required.',
            'email.email' => 'Email must be a valid email address.',
            'phone_number.unique' => 'Phone number has already been taken.',
            'gender.in' => 'Gender must be either male, female, or other.',
            'user_role.in' => 'User role must be either admin or user.',
        ];
    }
}
