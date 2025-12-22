import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type FilterPriceProps = {
  setPriceRange: (range: [number, number] | null) => void;
  resetKey: number;
};

const FilterPrice = ({ setPriceRange, resetKey }: FilterPriceProps) => {
  const [min, setMin] = useState<number | "">("");
  const [max, setMax] = useState<number | "">("");

  useEffect(() => {
    setMin("");
    setMax("")
    setPriceRange(null);
  }, [resetKey]);  

  const handleApply = () => {
    if (min === "" && max === "") {
      setPriceRange(null);
    } else {
      setPriceRange([Number(min) || 0, Number(max) || NaN]);
    }
  };

  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-2 my-5">
      <p className="mb-3 font-bold">Rango de precios</p>

      <div className="flex gap-2 items-center">
        <Input
          type="number"
          placeholder="Mín"
          className="w-20 p-1"
          value={min}
          onChange={(e) => setMin(e.target.value ? Number(e.target.value) : "")}
        />
        <span>-</span>
        <Input
          type="number"
          placeholder="Máx"
          className="w-20 p-1"
          value={max}
          onChange={(e) => setMax(e.target.value ? Number(e.target.value) : "")}
        />
      </div>

      <Button
        onClick={handleApply}
        className="mt-3 px-3 py-1"
      >
        Aplicar
      </Button>
    </div>
  );
};

export default FilterPrice;