/**
 * Throttle function to limit how often a function can be called
 * @param func - The function to throttle
 * @param delay - The delay in milliseconds
 * @returns A throttled version of the function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecutedTime = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    const timeSinceLastExecution = now - lastExecutedTime

    if (timeSinceLastExecution >= delay) {
      lastExecutedTime = now
      func.apply(this, args)
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(
        () => {
          lastExecutedTime = Date.now()
          func.apply(this, args)
        },
        delay - timeSinceLastExecution
      )
    }
  }
}

/**
 * Request Animation Frame based throttle for scroll handlers
 * This ensures the callback runs at most once per frame
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null
  let lastArgs: Parameters<T> | null = null

  return function (this: any, ...args: Parameters<T>) {
    lastArgs = args
    
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        if (lastArgs) {
          func.apply(this, lastArgs)
          lastArgs = null
        }
        rafId = null
      })
    }
  }
}

