import { ResultFilterTypes } from "@/types/filters"
import { useEffect, useState } from "react"

export function useGetProductField(categorySlug: string|string[]) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categorias/${categorySlug}/marcas`
    const [result, setResult] = useState<string[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setResult(json)
                setLoading(false)
            } catch (error: any) {
                setError(error)
                setLoading(false)
            }
        })()
    }, [url])

    return { loading, result, error }
}