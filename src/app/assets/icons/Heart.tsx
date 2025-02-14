import HeartFillIconSVG from './heart_fill.svg';
import HeartOutlineIconSVG from './heart_outline.svg';

type Props = {
  width: number;
  height: number;
  fill?: boolean;
  color?: string;
};

export default function Heart({ width, height, fill, color }: Props) {
  const isFill = fill || false;
  return (
    <div>
      {isFill ? (
        <HeartFillIconSVG
          color={color}
          width={width}
          height={height}
        ></HeartFillIconSVG>
      ) : (
        <HeartOutlineIconSVG
          color={color}
          width={width}
          height={height}
        ></HeartOutlineIconSVG>
      )}
    </div>
  );
}
