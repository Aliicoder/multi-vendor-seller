import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useRef  } from "react"

interface FilesPreviewerCarousel {
  filesUrls:string[]
  previewMedia:{
    url: string;
    index: number;
  }
  setPreviewMedia: React.Dispatch<React.SetStateAction<{ url: string; index: number }>>;
}

function FilesPreviewerCarousel({filesUrls,previewMedia,setPreviewMedia}:FilesPreviewerCarousel) { 
  const refImages = useRef<(HTMLImageElement | null)[]>([]);
  const refWrappers = useRef<(HTMLDivElement | null)[]>([]);
  const handleImageLoad = (imgRef:HTMLImageElement, containerRef:HTMLDivElement) => {
    if(imgRef && containerRef){
      const imgHeight = imgRef.offsetHeight;
      const containerHeight = containerRef.offsetHeight; 
      if (imgHeight > containerHeight) {
        imgRef.classList.add('w-full');
        imgRef.classList.remove('h-full');
      } else {
        imgRef.classList.add('h-full');
        imgRef.classList.remove('w-full');
      }
    }
  };
  return (
      <>
      
       {
        filesUrls && filesUrls.length > 0 ?
         
        <Carousel className=" w-full mx-auto ">    
          <CarouselContent className="-ml-1">
            { 
              filesUrls.map((url:string,i:number) => (
                <CarouselItem onClick={()=> setPreviewMedia({url,index:i})} key={url} className="basis-2/12  ">
                  <Card className=" border-0 shadow-none bg-transparent">
                    <CardContent className="p-0">
                      <div className={` ${url == previewMedia.url ? "border-blue-500": ""}
                          flex items-center rounded-md p-3 bg-white border`}>
                        <div ref={(el)=> ( refWrappers.current[i] = el )} 
                          className="  flex justify-center items-center aspect-square  ">
                          <img  
                            ref={(el)=> (refImages.current[i]=el) } 
                            className=""
                            src={url} 
                            onLoad={() => handleImageLoad(refImages.current[i]!, refWrappers.current[i]!)} 
                            />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              </CarouselItem>
            ))
          }
          </CarouselContent>
  
        </Carousel>
        :
         
        <Carousel className=" w-full mx-auto ">    
          <CarouselContent className="-ml-1">   
                <CarouselItem className="basis-3/12  ">
                  <Card className=" border-0 shadow-none bg-transparent">
                    <CardContent className="p-0">
                      <div className="flex items-center rounded-md p-3 bg-white border">
                        <div className="  flex justify-center items-center aspect-square  ">
                          <img  
                            className=" opacity-0"
                            src={"/chooseImage.png"} 
                            />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              </CarouselItem>
          </CarouselContent>
        </Carousel>
       }

      </>
  )
}


export default FilesPreviewerCarousel