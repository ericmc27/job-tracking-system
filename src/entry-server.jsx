import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'


/**
 * @param {string} url
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(url, options) {
  const incomingUrl = !url.includes("/") ? `/${url}` : url
  
  return renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={incomingUrl}>
        <App />
      </StaticRouter>
    </StrictMode>,
    options,
  )
}
