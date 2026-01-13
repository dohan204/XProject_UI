import { useEffect, useRef, useState } from 'react'
import * as faceapi from '@vladmandic/face-api'
import { Box, Typography } from '@mui/material'

type Props = {
  onViolation: () => void
}

export default function CameraProctor({ onViolation }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [loaded, setLoaded] = useState(false)
  const [faceCount, setFaceCount] = useState(0)

  const noFaceCount = useRef(0)
  const multiFaceCount = useRef(0)

  const MAX_NO_FACE = 3
  const MAX_MULTI_FACE = 2

  // load model
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ])
      setLoaded(true)
    }
    loadModels()
  }, [])

  // open camera
  useEffect(() => {
    if (!loaded) return

    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    })

    return () => {
      videoRef.current?.srcObject &&
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach(t => t.stop())
    }
  }, [loaded])

  // detect face
  useEffect(() => {
    if (!loaded) return

    const interval = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      )

      setFaceCount(detections.length)

      // draw
      const dims = {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      }
      faceapi.matchDimensions(canvasRef.current, dims)
      const resized = faceapi.resizeResults(detections, dims)
      canvasRef.current
        .getContext('2d')
        ?.clearRect(0, 0, dims.width, dims.height)
      faceapi.draw.drawDetections(canvasRef.current, resized)

      // logic vi phạm
      if (detections.length === 0) {
        noFaceCount.current++
        if (noFaceCount.current >= MAX_NO_FACE) {
          onViolation()
          noFaceCount.current = 0
        }
      } else if (detections.length > 1) {
        multiFaceCount.current++
        if (multiFaceCount.current >= MAX_MULTI_FACE) {
          onViolation()
          multiFaceCount.current = 0
        }
      } else {
        noFaceCount.current = 0
        multiFaceCount.current = 0
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [loaded, onViolation])

  return (
    <Box
      position="fixed"
      bottom={16}
      right={16}
      width={220}
      bgcolor="black"
      borderRadius={2}
      border="3px solid orange"
      zIndex={9999}
    >
      <Typography
        fontSize={12}
        color="white"
        bgcolor="green"
        p={0.5}
      >
        ● Camera
      </Typography>

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        width="100%"
      />

      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 22,
          left: 0,
          width: '100%',
          height: 'auto'
        }}
      />

      <Typography
        fontSize={11}
        color="white"
        bgcolor={faceCount === 1 ? 'green' : 'red'}
        p={0.5}
      >
        {faceCount === 1
          ? '✓ 1 người'
          : faceCount === 0
          ? '⚠ Không thấy mặt'
          : `⚠ ${faceCount} người`}
      </Typography>
    </Box>
  )
}
