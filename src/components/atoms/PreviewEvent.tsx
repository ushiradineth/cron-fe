import { generateEventTime } from "@/components/atoms/Event";
import { PIXEL_PER_QUARTER } from "@/lib/consts";
import { useSettingStore } from "@/lib/stores/settings";
import { cn, getTimeFromPixelOffset } from "@/lib/utils";

interface Props {
  preview: { height: number; top: number };
  title: string;
  day: Date;
}

export default function PreviewEvent({ preview, title, day }: Props) {
  const { settings } = useSettingStore();

  return (
    <div
      style={{
        top: preview.top,
        height: Math.max(preview.height, PIXEL_PER_QUARTER),
      }}
      className={cn(
        "flex flex-col h-full w-full text-foreground font-medium absolute z-50 bg-orange-400",
        Math.max(preview.height, PIXEL_PER_QUARTER) > 30 ? "p-1" : "px-1",
      )}>
      <p className="truncate text-sm">{title}</p>
      <p className="text-xs opacity-75">
        {generateEventTime(
          getTimeFromPixelOffset(preview.top, day),
          getTimeFromPixelOffset(preview.top + preview.height, day),
          settings.clock,
        )}
      </p>
    </div>
  );
}
