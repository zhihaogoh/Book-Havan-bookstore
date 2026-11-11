<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
        $itemRules = (new StoreOrderItemRequest)->rules();
        unset($itemRules['order_id']);
        $itemRules['items'] = ['sometimes', 'array', 'min:1'];

        return array_merge([
            'address_id' => ['required', 'integer', 'exists:user_address,id'],
            'status' => ['required', 'string', 'max:255'],
            'currency' => ['required', 'string', 'max:3'],
            'subtotal' => ['required_without:items', 'numeric', 'min:0'],
            'discount_total' => ['nullable', 'numeric', 'min:0'],
            'shipping_total' => ['nullable', 'numeric', 'min:0'],
            'tax_total' => ['nullable', 'numeric', 'min:0'],
            'grand_total' => ['required_without:items', 'numeric', 'min:0'],
            'placed_at' => ['nullable', 'date'],
        ], $itemRules);
    }
}
