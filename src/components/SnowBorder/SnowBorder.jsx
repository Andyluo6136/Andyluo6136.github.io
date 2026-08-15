import './SnowBorder.css';

export default function PineBorder() {
  return (
    <div className="snow-border" aria-hidden="true">
      {/* Edge Frost / Snow Accumulation */}
      <div className="snow-edge snow-edge--top" />
      <div className="snow-edge snow-edge--bottom" />
      <div className="snow-edge snow-edge--left" />
      <div className="snow-edge snow-edge--right" />

      {/* Corner Frost Vignettes */}
      <div className="snow-corner snow-corner--top-left" />
      <div className="snow-corner snow-corner--top-right" />
      <div className="snow-corner snow-corner--bottom-left" />
      <div className="snow-corner snow-corner--bottom-right" />
    </div>
  );
}