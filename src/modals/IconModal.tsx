import React, { useMemo, useState, useEffect } from "react";
import { Modal, Input, Empty, Tooltip, Button } from "antd";
import { Lineicons } from "@lineiconshq/react-lineicons";
import * as FreeIcons from "@lineiconshq/free-icons";
import type { IconData } from "@lineiconshq/free-icons";

const PAGE_SIZE = 100;

const isIconData = (v: unknown): v is IconData =>
  typeof v === "object" &&
  v !== null &&
  "svg" in v &&
  "viewBox" in v &&
  "name" in v;

const LINEICONS_LIST: { value: string; title: string; icon: IconData }[] =
  Object.entries(FreeIcons)
    .filter(
      (entry): entry is [string, IconData] =>
        isIconData(entry[1]) && entry[0] !== "IconName",
    )
    .map(([key, icon]) => ({
      value: key,
      title:
        key
          .replace(/([A-Z])/g, " $1")
          .replace(/^(Outlined|Solid|Bulk|Duotone|Stroke)\s*/i, "")
          .trim() || key,
      icon,
    }))
    .sort((a, b) => a.value.localeCompare(b.value));

interface IconModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (iconName: string) => void;
  selectedValue?: string;
}

export const IconModal = ({
  open,
  onClose,
  onSelect,
  selectedValue,
}: IconModalProps) => {
  const [search, setSearch] = useState("");
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return LINEICONS_LIST;
    return LINEICONS_LIST.filter(
      (i) =>
        i.title.toLowerCase().includes(q) || i.value.toLowerCase().includes(q),
    );
  }, [search]);

  // Reset display count when search changes
  useEffect(() => {
    setDisplayCount(PAGE_SIZE);
  }, [search]);

  const handleSelect = (iconValue: string) => {
    onSelect(iconValue);
    onClose();
    setSearch("");
  };

  const handleCancel = () => {
    onClose();
    setSearch("");
  };

  const visibleIcons = filtered.slice(0, displayCount);
  const hasMore = filtered.length > displayCount;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <span>Select Icon</span>
          <span className="text-xs font-normal text-gray-400">
            ({filtered.length} available)
          </span>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={720}
      centered
      bodyStyle={{ padding: "0" }}
    >
      <div className="flex flex-col h-[70vh]">
        <div className="p-4 border-b bg-gray-50/50">
          <Input
            placeholder="Search icon by name (e.g., home, user, arrow)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
            size="large"
            className="rounded-lg shadow-sm"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {visibleIcons.map((item) => (
              <Tooltip
                title={item.value}
                key={item.value}
                mouseEnterDelay={0.5}
              >
                <div
                  className={`
                    aspect-square flex items-center justify-center rounded-lg cursor-pointer
                    border-2 transition-all duration-200 hover:scale-105
                    ${
                      selectedValue === item.value
                        ? "border-primary bg-primary/10 text-primary shadow-md"
                        : "border-gray-100 hover:border-primary/30 hover:bg-gray-50 text-gray-600"
                    }
                  `}
                  onClick={() => handleSelect(item.value)}
                >
                  <Lineicons icon={item.icon} size={28} />
                </div>
              </Tooltip>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6 mb-2">
              <Button
                onClick={() => setDisplayCount((prev) => prev + PAGE_SIZE)}
                className="rounded-full px-8"
              >
                Load more icons ({filtered.length - displayCount} remaining)
              </Button>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="py-20">
              <Empty
                description={`No icons match "${search}"`}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};