import React from 'react'
import ReactPlayer from 'react-player'

interface VideoPreviewProps {
  videoUrl: string
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <ReactPlayer
        url={videoUrl}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  )
}

export default VideoPreview