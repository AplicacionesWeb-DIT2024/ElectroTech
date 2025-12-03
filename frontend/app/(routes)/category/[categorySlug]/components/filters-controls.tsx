import FilterBrand from "./filter-brand";
import FilterPrice from "./filter-price";


type FiltersControlsCategoryProps = {
    setFilterBrand: (brand: string) => void
    setPriceRange: (range: [number, number] | null) => void;
    slug: string| string[];
}

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
    const { setFilterBrand, setPriceRange , slug } = props

    return (
        <div className="sm:w-[350px] sm:mt-5 p-6">
            <p className="mb-3 font-bold">Filtros:</p>
            <FilterBrand setFilterBrand={setFilterBrand} slug={slug}/>
            <FilterPrice setPriceRange={setPriceRange} />
        </div>
    );
}

export default FiltersControlsCategory;