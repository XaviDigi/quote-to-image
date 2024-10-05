import React from 'react'

interface ImagePreviewProps {
  imageUrl: string
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 bg-light-beige rounded-lg overflow-hidden">
      <img src={imageUrl} alt="Generated Quote" className="object-contain w-full h-full" />
    </div>
  )
}

export default ImagePreview