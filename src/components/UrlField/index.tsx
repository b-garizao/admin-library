import { LinkOutlined, GlobalOutlined } from "@ant-design/icons";
import { Input, Select } from "../Inputs";
import { Text } from "../Text";

interface UrlFieldProps {
  routes: { label: string; value: string }[];
  isExternal: boolean;
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
}

/**
 * Smart URL input:
 * - When isExternal=true  → free-text input for any URL
 * - When isExternal=false → select from known internal pages
 */
export const UrlField = ({
  routes,
  isExternal,
  value,
  onChange,
  placeholder,
}: UrlFieldProps) => {
  if (isExternal) {
    return (
      <Input
        prefix={<GlobalOutlined className="text-gray-400" />}
        placeholder={placeholder ?? "https://example.com"}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-[39px] flex! items-center!"
      />
    );
  }
  return (
    <Select
      showSearch
      allowClear
      placeholder="Select a page"
      value={value || undefined}
      onChange={(v) => onChange?.(v ?? "")}
      options={routes.map((r) => ({
        label: (
          <span className="flex items-center gap-2">
            <LinkOutlined className="text-gray-400 text-xs" />
            {r.label}
            <Text className="text-xs">{r.value}</Text>
          </span>
        ),
        value: r.value,
      }))}
    />
  );
};
