import createCache from '@emotion/cache'

const isBrowser = typeof document !== 'undefined'

// On the client side, Create a meta tag at the top of the <head> and set it as insertionPoint.
// This assures that Material UI styles are loaded first.
// It allows developers to easily override Material UI styles with other styling solutions, like CSS modules.
export default function createEmotionCache() {
  let insertionPoint

  console.log('isBrowser = ', isBrowser)

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector(
      'meta[name="emotion-insertion-point"]',
    ) as HTMLElement
    console.log('emotionInsertionPoint = ', emotionInsertionPoint)

    insertionPoint = emotionInsertionPoint ?? undefined
  }

  console.log('insertionPoint = ', insertionPoint)

  const temp = createCache({ key: 'css', insertionPoint })
  console.log('temp = ', temp)
  return temp
}
