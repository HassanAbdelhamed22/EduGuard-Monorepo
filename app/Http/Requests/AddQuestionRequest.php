<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddQuestionRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'quiz_id' => 'required|exists:quizzes,QuizID',
            'content' => 'required|string',
            'type' => 'required|string|in:multiple_choice,true_false,short_answer',
            'marks' => 'required|integer',
            'options' => 'required_if:type,multiple_choice|array',
            'options.*' => 'required_if:type,multiple_choice|string',
            'correct_option' => 'required_if:type,multiple_choice|string|required_if:type,true_false|boolean|required_if:type,short_answer|string',
            'image' => 'nullable|image',
        ];
    }

    public function messages(): array
    {
        return [
            'quiz_id.required' => 'The quiz ID field is required.',
            'quiz_id.exists' => 'The selected quiz ID is invalid.',
            'content.required' => 'The content field is required.',
            'type.required' => 'The type field is required.',
            'type.in' => 'The selected type is invalid.',
            'marks.required' => 'The marks field is required.',
            'options.required_if' => 'The options field is required for multiple choice questions.',
            'options.*.required_if' => 'Each option is required for multiple choice questions.',
            'correct_option.required_if' => 'The correct option field is required for multiple choice, true/false, and short answer questions.',
            'image.image' => 'The image must be an image file.',
        ];
    }
}
