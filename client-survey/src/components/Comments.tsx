interface CommentsProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Comments({ value, onChange }: CommentsProps) {
  return (
    <fieldset className="border border-gray-300 rounded-md p-4">
      <legend className="text-sm sm:text-md font-medium text-gray-700 px-3 sm:px-4 py-1 bg-gray-100 border border-gray-300 rounded-md">
        COMMENTS/SUGGESTIONS
      </legend>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your comments or suggestions..."
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
      />
    </fieldset>
  );
}
