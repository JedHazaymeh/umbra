import { useEffect } from 'react'

import log from '../../../utils/logger'

export default function Home() {
  // log mounts
  useEffect(() => {
    log('navy', 'Route: Home Mounted')
    return () => log('darkred', 'Route: Home Unmounted')
  })

  return (
    <div>
      <h4>Umbra</h4>
      <p>Version 0.3.0</p>
    </div>
  )
}