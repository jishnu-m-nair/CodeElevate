import { Field, ErrorMessage } from "formik";

interface FormInputProps {
  name: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
}

export default function FormInput({
  name,
  placeholder,
  type = "text",
  as = "input",
}: FormInputProps) {
  const Component = as === "textarea" ? "textarea" : "input";

  return (
    <div>
      <Field
        as={Component}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white-700/50 border border-gray-600 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-400 text-sm mt-1"
      />
    </div>
  );
}