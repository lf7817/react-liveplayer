import { LivePlayerEvents, LivePlayerNativeProps, LivePlayerOtherProps } from './types'

export function normalizeProps(data: LivePlayerOtherProps): {
  events: LivePlayerEvents
  player: LivePlayerNativeProps
} {
  return Object.keys(data).reduce(
    (rtn, key) => {
      // @ts-expect-error
      const value = data[key]
      if (key.startsWith('on')) {
        // @ts-expect-error
        rtn.events[key] = value
      }
      else {
        // @ts-expect-error
        rtn.player[key] = value
      }

      return rtn
    },
    { events: {}, player: {} },
  )
}

const EventMap: Record<keyof LivePlayerEvents, string> = {
  onMessage: 'message',
  onError: 'error',
  onEnded: 'ended',
  onTimeUpdate: 'timeUpdate',
  onPause: 'pause',
  onPlay: 'play',
  onFullscreen: 'fullscreen',
  onSnapOutside: 'snapOutside',
  onSnapInside: 'snapInside',
  onCustomButtons: 'customButtons',
}

export function dealEvents(dom: HTMLElement, events: LivePlayerEvents) {
  const dispose: { key: string, event: (e: Event) => void }[] = [];

  (Object.keys(events) as (keyof LivePlayerEvents)[]).forEach((key) => {
    // @ts-expect-error
    dom.addEventListener(EventMap[key], events[key])
    dispose.push({
      key: EventMap[key],
      event: events[key]!,
    })
  })

  return dispose
}
