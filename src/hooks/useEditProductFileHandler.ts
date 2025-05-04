import { IProduct } from "@/types/types"
import { useEffect, useState } from "react"
const INITIAL_PREVIEW_STATE = {url:"/chooseImage.png",index:0}
interface IEditProduct {
  form:any
  product:IProduct
}
export default ({form,product}:IEditProduct) =>{
  const [previewMedia,setPreviewMedia] = useState(INITIAL_PREVIEW_STATE)
  const [files,setFiles] = useState<(File|string)[]>([])
  const [filesUrls,setFilesUrls] = useState<string[]>([])
  const [deletedMedia,setDeletedMedia] = useState<(File|string)[]>([])
  
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>,fieldChange :(value:(File|string)[])=> void) =>{
    if(e.target.files && files && filesUrls){ 
      let changedFile = e.target.files[0]
      let tempFiles = [...files] 
      let tempFilesUrls = [...filesUrls] 
      let changedFileUrl = URL.createObjectURL(changedFile) 
      if( !(files[previewMedia.index] instanceof(File)) )
        setDeletedMedia([...deletedMedia,files[previewMedia.index]])
      tempFiles[previewMedia.index] = changedFile 
      tempFilesUrls[previewMedia.index] = changedFileUrl
      setFiles([...tempFiles])
      fieldChange([...tempFiles])
      setFilesUrls([...tempFilesUrls])
    }
  }
  const handleFilesInsertion = (e:React.ChangeEvent<HTMLInputElement>,fieldChange :(value:(File|string)[])=> void) =>{
    if(e.target.files&&e.target.files.length > 0){
      let newFiles = e.target.files
      let urls = []
      for(let file of newFiles)
        urls.push(URL.createObjectURL(file))
      setFiles([...files,...newFiles])
      fieldChange([...files,...newFiles]) 
      setFilesUrls([...filesUrls,...urls])
    }
  }

    const handleFileRemove = () =>{ 
      if(files && filesUrls){
        const updatedFiles = files.filter((_,index)=> index != previewMedia.index )
        const updatedFilesUrls = filesUrls.filter((_,index)=> index != previewMedia.index)
        setFiles([...updatedFiles])
        setFilesUrls([...updatedFilesUrls]) ; 
        if( !(files[previewMedia.index] instanceof(File)) ){
          console.log("file deleted")
          setDeletedMedia([...deletedMedia,files[previewMedia.index]])
        }
        setFiles([...updatedFiles])
        setFilesUrls([...updatedFilesUrls])
        form.setValue("media",updatedFiles)
      } 
    }

    useEffect(() =>{
      form.setValue("deletedMedia",deletedMedia)
    },[deletedMedia])

    useEffect(() =>{
      if(filesUrls && filesUrls[0])
        setPreviewMedia({url:filesUrls[0],index:0})
      else
        setPreviewMedia(INITIAL_PREVIEW_STATE)
    },[files,filesUrls])

    useEffect(()=>{
      if(product){
        form.setValue("name",product.name)
        form.setValue("description",product.description)
        form.setValue("stock",String(product.stock))
        form.setValue("brand",product.brand)
        form.setValue("category",product.category)
        form.setValue("price",String(product.price))
        form.setValue("discount",String(product.discount))
        form.setValue("search",product.category)
        const urls = product.media.flatMap(media => media.url)
        form.setValue("media",urls)
        setFiles(urls)
        setFilesUrls(urls)
      }
    },[])

    return {
      files,filesUrls,previewMedia,handleFileChange,handleFilesInsertion,handleFileRemove, setPreviewMedia
    }
}