import { useField } from "remix-validated-form";

interface TextInputProps {
  name: string;
  label: string;
}

export const TextInput = ({ name, label }: TextInputProps) => {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      <label className="flex w-full flex-col gap-1">
        <span>{label}</span>
        <input
          {...getInputProps({ id: name })}
          className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
        />
      </label>
      {error && (
        <div className="pt-1 text-red-700" id="title-error">
          {error}
        </div>
      )}
    </div>
  );
};
