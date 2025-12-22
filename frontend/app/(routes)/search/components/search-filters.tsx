import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  nombre: string;
};


type Props = {
  brands: string[];
  categories: Category[];
  onBrandChange: (brand: string | null) => void;
  onCategoryChange: (categoryId: number | null) => void;
  onPriceChange: (range: [number, number] | null) => void;
  resetKey: number;
  onClear: () => void;
};

const SearchFilters = ({ brands, categories,onBrandChange, onPriceChange,onCategoryChange, resetKey, onClear }: Props) => {
  const [min, setMin] = useState<number | "">("");
  const [max, setMax] = useState<number | "">("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<string>("");

    useEffect(() => {
        setMin("");
        setMax("");
        setBrand("");
        setCategory("");
        onPriceChange(null);
        onBrandChange(null);
        onCategoryChange(null);
    }, [resetKey]);

  return (
    <div className="sm:w-[250px] sm:mt-5 p-6">
        <p className="mb-3 font-bold">Filtros:</p>

        {categories.length > 1 && (
            <div className="border border-gray-200 shadow-sm rounded-lg p-2 my-5">
                <p className="mb-3 font-bold">Categorías</p>

                <RadioGroup
                value={category}
                onValueChange={(value) => {
                    setCategory(value);
                    onCategoryChange(Number(value));
                }}
                >
                {categories.map(c => (
                    <div key={c.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={String(c.id)} id={`cat-${c.id}`} />
                    <Label htmlFor={`cat-${c.id}`}>{c.nombre}</Label>
                    </div>
                ))}
                </RadioGroup>
            </div>
            )}

      {/* Marcas */}
      {brands.length > 1 && (
      <div className="border border-gray-200 shadow-sm rounded-lg p-2 my-5">
        <p className="mb-3 font-bold">Marcas</p>
        <RadioGroup
          value={brand}
          onValueChange={(value) => {
            setBrand(value);
            onBrandChange(value);
          }}
        >
          {brands.map(b => (
            <div key={b} className="flex items-center space-x-2">
              <RadioGroupItem value={b} id={b} />
              <Label htmlFor={b}>{b}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    )}
      {/* Precio */}
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
        className="mt-3 px-3 py-1"
        onClick={() =>
          min === "" && max === ""
            ? onPriceChange(null)
            : onPriceChange([Number(min) || 0, Number(max) || NaN])
        }
      >
        Aplicar
      </Button>
      </div>
            <Button
        className="mt-3 px-3 py-1"
        onClick={onClear} 
      >
        Limpiar filtros
      </Button>
    </div>
  );
};

export default SearchFilters;