import React, { useState } from "react";
import { Tooltip } from "antd";
import { Lineicons } from "@lineiconshq/react-lineicons";
import * as FreeIcons from "@lineiconshq/free-icons";
import type { IconData } from "@lineiconshq/free-icons";
import { SearchOutlined } from "@ant-design/icons";
import { IconModal } from "../../modals";
import { getIcon } from "../../libs/icosLibs";

type IconSelectValue = string | IconData | undefined;

interface IconSelectProps {
  value?: IconSelectValue;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const normalizeValue = (value: IconSelectValue): string | undefined => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "name" in value) return (value as IconData).name;
  return undefined;
};

const findIcon = (value: IconSelectValue): IconData | undefined => {
  const name = normalizeValue(value);
  if (!name) return undefined;

  const directIcon = (FreeIcons as Record<string, any>)[name];
  if (directIcon) return directIcon as IconData;

  const fallbackIcon = getIcon(name);
  if (fallbackIcon && typeof fallbackIcon !== "string") {
    return fallbackIcon as IconData;
  }

  return undefined;
};

export const IconSelect: React.FC<IconSelectProps> = ({
  value,
  onChange,
  placeholder = "Select Icon",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = (iconName: string) => {
    onChange?.(iconName);
  };

  const currentIcon = findIcon(value || "");

  return (
    <div className="inline-block">
      <Tooltip title={value || placeholder}>
        <div 
          className={`
            w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200
            ${value 
              ? "bg-white border-gray-200 hover:border-primary shadow-sm text-primary" 
              : "bg-gray-50 border-dashed border-gray-300 hover:border-primary/50 text-gray-400"
            }
            cursor-pointer
          `}
          onClick={() => setIsModalOpen(true)}
        >
          {currentIcon ? (
            <Lineicons icon={currentIcon} size={28} />
          ) : (
            <SearchOutlined className="text-xl" />
          )}
        </div>
      </Tooltip>

      <IconModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
        selectedValue={value}
      />
    </div>
  );
};
