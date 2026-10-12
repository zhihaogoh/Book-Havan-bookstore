<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
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
            'categories_name' => 'required|string|max:255|unique:categories,categories_name,' . $this->route('id'),
            'slug' => 'required|string|max:255|unique:categories,slug,' . $this->route('id'),
        ];
    }


    public function messages(): array
    {
        return [
            'categories_name.required' => 'Category name is required.',
            'categories_name.unique' => 'This category name is already taken.',
            'slug.required' => 'Slug is required.',
            'slug.unique' => 'This slug is already taken.',
        ];
    }
}
