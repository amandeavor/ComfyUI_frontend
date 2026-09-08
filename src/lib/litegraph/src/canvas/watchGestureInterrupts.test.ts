import { describe, expect, it, vi } from 'vitest'

import { watchGestureInterrupts } from './watchGestureInterrupts'

describe('watchGestureInterrupts', () => {
  it('removes every interruption listener when stopped', () => {
    const element = document.createElement('div')
    const onInterrupt = vi.fn()
    const stop = watchGestureInterrupts(element, onInterrupt)

    stop()
    element.dispatchEvent(new Event('lostpointercapture'))
    window.dispatchEvent(new Event('blur'))
    vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('hidden')
    document.dispatchEvent(new Event('visibilitychange'))

    expect(onInterrupt).not.toHaveBeenCalled()
  })
})
