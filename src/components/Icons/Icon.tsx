import { getIcon } from "../../libs";

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className }: IconProps) => {
  const IconComponent = getIcon(name);
  return <IconComponent className={className} />;
};
