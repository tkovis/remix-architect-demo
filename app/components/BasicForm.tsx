import { ValidatedForm } from "remix-validated-form";

import type { Validator } from "remix-validated-form";

interface BasicFormProps {
  validator: Validator<unknown>;
  children: JSX.Element | Array<JSX.Element>;
}

export default function BasicForm({ validator, children }: BasicFormProps) {
  return (
    <ValidatedForm
      validator={validator}
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      {children}

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </ValidatedForm>
  );
}
