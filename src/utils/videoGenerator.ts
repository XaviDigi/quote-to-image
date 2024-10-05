import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

const ffmpeg = new FFmpeg()

const generateCanvas = (quote: string, theme: string): fabric.Canvas => {
  const canvas = new fabric.Canvas(null, {
    width: 1280,
    height: 720,
  })

  const background = new fabric.Rect({
    width: canvas.width,
    height: canvas.height,
    fill: theme === 'minimalistic' ? '#ffffff' : 
          theme === 'vintage' ? '#f3e5d8' : 
          theme === 'artistic' ? '#e6f3ff' : '#000000',
  })

  canvas.add(background)

  const text = new fabric.Text(quote, {
    fontSize: 48,
    fontFamily: theme === 'minimalistic' ? 'Arial' : 
                theme === 'vintage' ? 'Georgia' : 
                theme === 'artistic' ? 'Brush Script MT' : 'Helvetica',
    fill: theme === 'cinematic' ? '#ffffff' : '#000000',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    left: canvas.width / 2,
    top: canvas.height / 2,
  })

  canvas.add(text)

  return canvas
}

const canvasToVideo = async (canvas: fabric.Canvas, music: string): Promise<string> => {
  if (!ffmpeg.loaded) {
    await ffmpeg.load()
  }

  const fps = 30
  const duration = 5 // 5 seconds video

  for (let i = 0; i < fps * duration; i++) {
    const dataUrl = canvas.toDataURL('image/png')
    const data = atob(dataUrl.split(',')[1])
    const arrayBuffer = new ArrayBuffer(data.length)
    const uintArray = new Uint8Array(arrayBuffer)

    for (let j = 0; j < data.length; j++) {
      uintArray[j] = data.charCodeAt(j)
    }

    await ffmpeg.writeFile(`frame_${i.toString().padStart(4, '0')}.png`, uintArray)
  }

  // Write audio file
  const audioResponse = await fetch(`/audio/${music}.mp3`)
  const audioData = await audioResponse.arrayBuffer()
  await ffmpeg.writeFile('audio.mp3', new Uint8Array(audioData))

  // Generate video
  await ffmpeg.exec([
    '-framerate', `${fps}`,
    '-i', 'frame_%04d.png',
    '-i', 'audio.mp3',
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-shortest',
    'output.mp4'
  ])

  const data = await ffmpeg.readFile('output.mp4')
  const videoBlob = new Blob([data.buffer], { type: 'video/mp4' })
  return URL.createObjectURL(videoBlob)
}

export const generateVideo = async (quote: string, theme: string, music: string): Promise<string> => {
  const canvas = generateCanvas(quote, theme)
  return await canvasToVideo(canvas, music)
}