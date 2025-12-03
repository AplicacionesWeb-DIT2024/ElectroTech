import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";

type FilterBrandProps = {
    setFilterBrand: (brand: string) => void
    slug: string|string[];
}

const FilterBrand = (props: FilterBrandProps) => {
    const { setFilterBrand, slug } = props;
    const { result, loading }: FilterTypes = useGetProductField(slug)

    return (
        <div className="my-5">
            <p className="mb-3 font-bold">Marcas</p>
            {loading && result === null && (
                <p>Cargando marcas...</p>
            )}

            <RadioGroup onValueChange={(value) => setFilterBrand(value)}>
                {result !== null && result.map((brand: string) => (
                    <div key={brand} className="flex items-center space-x-2">
                        <RadioGroupItem value={brand} id={brand} />
                        <Label htmlFor={brand}>{brand}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

export default FilterBrand;