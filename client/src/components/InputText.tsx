import { Input } from "@/components/ui/input";

export type Props = {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: React.HTMLInputTypeAttribute;
  required?: boolean;
};

export default function InputText({
  label,
  value,
  setValue,
  type,
  required,
}: Props) {
  return (
    <div className="group relative">
      <label className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground">
        <span className="inline-flex bg-background px-2">{label}</span>
      </label>
      <Input
        type={type}
        placeholder=""
        value={value}
        required={required}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
