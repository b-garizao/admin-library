import React from 'react';

interface MediaPreviewProps {
  /** URL of the image or video to display */
  src: string | null | undefined;
  /** Alt text for images (optional) */
  alt?: string;
  /** Maximum width in pixels (default: 200) */
  maxWidth?: number | string;
  /** Maximum height in pixels (default: 120) */
  maxHeight?: number | string;
  /** Border radius in pixels (default: 4) */
  borderRadius?: number;
  /** Show video controls (default: true) */
  showControls?: boolean;
  /** Optional className for additional styling */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
}

/**
 * MediaPreview component
 * 
 * Renders an image or video preview based on the file type.
 * Automatically detects video files by extension (.mp4, .webm, .ogg)
 * and renders a video player. For images, renders a standard img tag.
 */
const MediaPreview: React.FC<MediaPreviewProps> = ({
  src,
  alt = 'Preview',
  maxWidth = 200,
  maxHeight = 120,
  borderRadius = 4,
  showControls = true,
  className,
  style,
}) => {
  // Don't render anything if no source
  if (!src) return null;

  // Check if the source is a video file
  const isVideo = src.toLowerCase().match(/\.(mp4|webm|ogg)$/);

  const containerStyle: React.CSSProperties = {
    maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
    maxHeight: typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
    width: 'auto',
    height: 'auto',
    borderRadius,
    objectFit: 'cover',
    ...style,
  };

  if (isVideo) {
    return (
      <video 
        controls={showControls} 
        style={containerStyle}
        className={className}
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={containerStyle}
      className={className}
    />
  );
};

export default MediaPreview;
