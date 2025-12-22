import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";
import { useEffect, useState } from "react";

type FilterBrandProps = {
    setFilterBrand: (brand: string) => void
    slug: string|string[];
    resetKey: number;
}

const FilterBrand = (props: FilterBrandProps) => {
    const { setFilterBrand, slug, resetKey } = props;
    const { result, loading }: FilterTypes = useGetProductField(slug)
    const [brand, setBrand] = useState("");

    useEffect(() => {
        setBrand("");
        setFilterBrand("");
    }, [resetKey]);  

    return (
        <div>
            {loading && result === null && (
                <p>Cargando...</p>
            )}
        {result !== null && result.length > 1 && (
        <div className="border border-gray-200 shadow-sm rounded-lg p-2 my-5">
            <p className="mb-3 font-bold">Marcas</p>

            <RadioGroup
            value={brand}
            onValueChange={(value) => {
                setBrand(value);
                setFilterBrand(value);
            }}
            >
                {result !== null && result.map((brand: string) => (
                    <div key={brand} className="flex items-center space-x-2">
                        <RadioGroupItem value={brand} id={brand} />
                        <Label htmlFor={brand}>{brand}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
        )}
        </div>
    );
}

export default FilterBrand;