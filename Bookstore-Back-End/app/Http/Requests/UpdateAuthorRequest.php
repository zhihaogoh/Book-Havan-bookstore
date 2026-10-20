<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAuthorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    
    public function rules(): array
    {
        return [
            'author_name' => 'required|string|max:225|unique:authors,author_name,' . (int) $this->route('id'),
            'author_bio' => 'required|string|max:225'
        ];
    }
}
