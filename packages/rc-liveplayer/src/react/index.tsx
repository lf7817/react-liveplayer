import React, { type ForwardRefRenderFunction, forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react'
import type { LivePlayerProps } from './types'
import { dealEvents, normalizeProps } from './utils'
import { LivePlayerRef, PlayerDomRef } from './types'

const LivePlayerCore: ForwardRefRenderFunction<LivePlayerRef, LivePlayerProps> = (props, ref) => {
  const id = useId()
  const playerRef = useRef<PlayerDomRef>(null)
  const { children, className, style, ...rest } = props
  const { events, player } = normalizeProps(rest)

  useEffect(() => {
    const dom = playerRef.current
    if (!dom)
      return

    const dispose = dealEvents(dom, events)

    return () => {
      dispose.forEach((item) => {
        dom.removeEventListener(item.key, item.event)
      })
    }
  }, [])

  useImperativeHandle(ref, () => ({
    play: () => playerRef.current?.play?.(),
    pause: () => playerRef.current?.pause?.(),
    paused: () => playerRef.current?.paused?.(),
    getCurrentTime: () => playerRef.current?.getCurrentTime?.(),
    setCurrentTime: time => playerRef.current?.setCurrentTime?.(time),
    snap: () => playerRef.current?.snap?.(),
    getMuted: () => playerRef.current?.getMuted?.(),
    setMuted: flag => playerRef.current?.setMuted?.(flag),
    isFullscreen: () => playerRef.current?.isFullscreen?.() ?? false,
    requestFullscreen: () => playerRef.current?.requestFullscreen?.(),
    exitFullscreen: () => playerRef.current?.exitFullscreen?.(),
    toggleFullscreen: () => playerRef.current?.toggleFullscreen?.(),
    getVolume: () => playerRef.current?.getVolume?.() ?? 0,
    setVolume: num => playerRef.current?.setVolume?.(num),
    getDuration: () => playerRef.current?.getDuration?.() ?? 0,
  }))

  return (
    <div
      id={id}
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
    >
      {/* @ts-expect-error */}
      <live-player ref={playerRef} aspect="fullscreen" {...player}>
        {children}
        {/* @ts-expect-error */}
      </live-player>
    </div>
  )
}

export const LivePlayer = forwardRef(LivePlayerCore)
