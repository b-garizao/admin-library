import type { ButtonProps } from "./Button.types";
import { Button as ButtonAntd, ConfigProvider } from "antd";
import type { ConfigProviderProps, GetProp } from "antd";
import { useDarkMode } from "../../hooks";

type WaveConfig = GetProp<ConfigProviderProps, "wave">;

const createHolder = (node: HTMLElement) => {
  const { borderWidth } = getComputedStyle(node);
  const borderWidthNum = Number.parseInt(borderWidth, 10);
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.inset = `-${borderWidthNum}px`;
  div.style.borderRadius = "inherit";
  div.style.background = "transparent";
  div.style.zIndex = "999";
  div.style.pointerEvents = "none";
  div.style.overflow = "hidden";
  node.appendChild(div);
  return div;
};

const createDot = (
  holder: HTMLElement,
  color: string,
  left: number,
  top: number,
  size = 0,
) => {
  const dot = document.createElement("div");
  dot.style.position = "absolute";
  dot.style.left = `${left}px`;
  dot.style.top = `${top}px`;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.borderRadius = "50%";
  dot.style.background = color;
  dot.style.transform = "translate3d(-50%, -50%, 0)";
  dot.style.transition = "all 1s ease-out";
  holder.appendChild(dot);
  return dot;
};

// ✅ Definida FUERA del componente - referencia estable
const showInsetEffect: WaveConfig["showEffect"] = (
  node,
  { event, component },
) => {
  if (component !== "Button") return;

  const holder = createHolder(node);
  const rect = holder.getBoundingClientRect();
  const left = event.clientX - rect.left;
  const top = event.clientY - rect.top;
  const dot = createDot(holder, "rgba(255, 255, 255, 0.65)", left, top);

  requestAnimationFrame(() => {
    dot.ontransitionend = () => holder.remove();
    dot.style.width = "200px";
    dot.style.height = "200px";
    dot.style.opacity = "0";
  });
};

// ✅ Definida FUERA del componente - referencia estable
const waveConfig: WaveConfig = { showEffect: showInsetEffect };

const variantClasses: Record<string, string> = {
  outlined:
    "dark:bg-gray-800! dark:text-gray-400! dark:ring-gray-700! dark:hover:bg-white/[0.03]! dark:hover:text-gray-300! dark:border-white!",
};

export const Button = ({
  className,
  children,
  variant = "solid",
  startIcon,
  endIcon,
  size,
  ...rest
}: ButtonProps) => {
  const isDark = useDarkMode();

  return (
    <ConfigProvider wave={waveConfig}>
      <ButtonAntd
        type={isDark ? "default" : "primary"}
        size="large"
        className={`inline-flex! items-center! justify-center! gap-2! rounded-lg! transition! ${size == "small" ? "h-8!" : "h-10!"} ${variantClasses[variant] ?? ""} ${className}`}
        {...rest}
        classNames={{
          icon: "flex",
        }}
      >
        {startIcon && <span className="flex items-center">{startIcon}</span>}
        {children}
        {endIcon && <span className="flex items-center">{endIcon}</span>}
      </ButtonAntd>
    </ConfigProvider>
  );
};
