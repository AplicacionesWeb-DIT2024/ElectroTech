"use client"
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from 'embla-carousel-autoplay'
import useNews from "@/hooks/useNews"; 


const CarouselTextBanner = () => {
      // Llamamos al hook useNews para obtener las novedades
    const { news, loading, error } = useNews();

    if (loading) {
        return (
        <div className="bg-gray-200 dark:bg-primary text-center p-4">
            <p>Cargando novedades...</p>
        </div>
        );
    }

    if (error) {
        return (
        <div className="bg-gray-200 dark:bg-primary text-center p-4">
            <p>Error al cargar las novedades: {error}</p>
        </div>
        );
    }
    return (
        <div className="bg-gray-200 dark:bg-primary">
            <Carousel className="w-full max-w-4xl mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2500
                    })
                ]}
            >
                <CarouselContent>
                    {news.map(({ id, title, description }) => (
                        <CarouselItem key={id} className="cursor-pointer">
                            <div>
                                <Card className="shadow-none border-none bg-transparent">
                                    <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                                        <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                                        <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}

export default CarouselTextBanner;