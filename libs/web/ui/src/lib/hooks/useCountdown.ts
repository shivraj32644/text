import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * @param countdownTime - changing this resets the timer
 * @param interval - pass null to pause countdown
 */
export const useCountdown = (
  countdownTime: number,
  interval: number | null = 1000
): [number, () => void] => {
  const initialCounter = Math.max(countdownTime, 0); // to prevent negative value as countdown time

  const [counter, setCounter] = useState(initialCounter);

  let intervalDelay: number | null = interval;
  if (interval && counter < 1) {
    // to support interval of less than one second, when counter is in decimal
    // so if counter is 0.5, intervalDelay would be 1000 * 0.5 i.e half a second
    intervalDelay = interval * counter;
  }

  useEffect(() => {
    setCounter(initialCounter);
  }, [initialCounter]);

  useInterval(
    () => {
      setCounter(Math.max(counter - 1, 0)); // Math.max used to limit min value to zero
    },
    counter !== 0 ? intervalDelay : null
  );

  const restart = useCallback(
    () => setCounter(initialCounter),
    [initialCounter]
  );

  return [counter, restart];
};

export function useInterval(callback: () => void, delay: number | null = 1000) {
  // remember the latest callback
  const savedCallback = useRefValue(callback);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return (): void => clearInterval(id);
    }
    return;
  }, [delay, savedCallback]);
}

/**
 * pass `savedValue` into dependency and use `savedValue.current` to access value
 * savedValue.current will have the latest value
 */
export function useRefValue<T>(value: T) {
  const savedValue = useRef(value);

  // Remember the latest value.
  savedValue.current = value;

  return savedValue;
}
