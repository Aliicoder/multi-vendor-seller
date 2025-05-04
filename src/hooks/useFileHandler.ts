import { useEffect, useState } from "react";
const initialPreviewState = {url:"/chooseImage.png",index:0}

export default (form:any) => {

  const [files,setFiles] = useState<File[]>([])
  const [filesUrls,setFilesUrls] = useState<string[]>([])
  const [previewMedia,setPreviewMedia] = useState(initialPreviewState)
  

  const handleFilesChange = (e:React.ChangeEvent<HTMLInputElement>,fieldChange :(value:File[])=> void) =>{
    if(e.target.files && e.target.files.length > 0){
      let newFiles = e.target.files
      let urls = []
      for(let file of newFiles)
        urls.push(URL.createObjectURL(file))
      fieldChange([...files,...newFiles]) 
      setFiles([...files,...newFiles])
      setFilesUrls([...filesUrls,...urls])
    }
  }
  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>,fieldChange :(value:File[])=> void) =>{
    if( e.target.files && files && filesUrls){ 
      let changedFile = e.target.files[0]
      let tempFiles = [...files] ; 
      let tempFilesUrls = [...filesUrls] ;
      let changedFileUrl = URL.createObjectURL(changedFile) ;
      tempFiles[previewMedia.index] = changedFile ; 
      tempFilesUrls[previewMedia.index] = changedFileUrl ; 
      fieldChange([...tempFiles])
      setFiles([...tempFiles])
      setFilesUrls([...tempFilesUrls])
    }
  }
  const handleFileRemove = () =>{
    if(files && filesUrls){
      const updatedFiles = files.filter((_,index)=> index != previewMedia.index )
      const updatedFilesUrls = filesUrls.filter((_,index)=> index != previewMedia.index)
      setFiles([...updatedFiles])
      setFilesUrls([...updatedFilesUrls])
      form.setValue("media[]",updatedFiles)
    } 
  }
  
  useEffect(() =>{
    if(filesUrls && filesUrls[0])
      setPreviewMedia({url:filesUrls[0],index:0})
    else
      setPreviewMedia(initialPreviewState)
  },[files,filesUrls])

  return { files,filesUrls,previewMedia,setPreviewMedia,handleFileChange,handleFileRemove,handleFilesChange,}
}
