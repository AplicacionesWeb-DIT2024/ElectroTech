import { Button } from "@/components/ui/button";
import FilterBrand from "./filter-brand";
import FilterPrice from "./filter-price";


type FiltersControlsCategoryProps = {
    setFilterBrand: (brand: string) => void
    setPriceRange: (range: [number, number] | null) => void;
    slug: string| string[];
    resetKey: number;
    onClear: () => void;
}

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
    const { setFilterBrand, setPriceRange , slug,resetKey, onClear } = props

    return (
        <div className="sm:w-[250px] sm:mt-5 p-6">
            <p className="mb-3 font-bold">Filtros:</p>
            <FilterBrand setFilterBrand={setFilterBrand} slug={slug} resetKey={resetKey}/>
            <FilterPrice setPriceRange={setPriceRange} resetKey={resetKey}/>
            <Button
                className="mt-3 px-3 py-1"
                onClick={onClear} 
                >
                Limpiar filtros
            </Button>
        </div>
    );
}

export default FiltersControlsCategory;