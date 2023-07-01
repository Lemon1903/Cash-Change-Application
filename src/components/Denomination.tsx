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
  const imgWidth = type === "coin" ? "w-32 lg:w-36" : "w-36 md:w-auto";

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (setQuantity) {
      setQuantity(denomination, getValidatedValue(Number(e.target.value)));
    }
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <img className={imgWidth} src={image} alt={`${value} denomination`} />
      <input
        id={denomination}
        type="number"
        className="w-36 border border-border px-4 py-3 text-2xl disabled:bg-output disabled:drop-shadow-md md:w-40 xl:text-3xl"
        disabled={isDisabled}
        value={quantity.toString()}
        onChange={handleQuantityChange}
      />
    </div>
  );
}
