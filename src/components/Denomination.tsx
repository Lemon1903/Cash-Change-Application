import { images } from "../lib/data";
import { getDenominationKey, getValidatedValue } from "../lib/utils";

interface IDenominationProps {
  value: number;
  type: "cash" | "coin";
  quantity: number;
  isDisabled: boolean;
  setQuantity?: (denomination: string, quantity: number) => void;
}

export default function Denomination(props: IDenominationProps) {
  const { value, type, quantity, isDisabled, setQuantity } = props;
  const denomination = getDenominationKey(value, type);
  const image = images[denomination];
  const imgWidth = type === "coin" ? "w-36" : "w-auto";

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (setQuantity) {
      setQuantity(denomination, getValidatedValue(Number(e.target.value)));
    }
  }

  return (
    <div className="grid gap-4">
      <img className={imgWidth} src={image} alt={`${value} denomination`} />
      <input
        id={denomination}
        type="number"
        className="w-40 border border-border px-4 py-3 text-3xl disabled:bg-output disabled:drop-shadow-md"
        disabled={isDisabled}
        value={quantity.toString()}
        onChange={handleQuantityChange}
      />
    </div>
  );
}
