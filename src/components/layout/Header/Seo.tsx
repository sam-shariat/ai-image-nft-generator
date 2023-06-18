import React from 'react'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL_TWITTER } from 'utils/config'
import { DefaultSeo } from 'next-seo'

export function Seo() {
  const origin = SITE_URL;

  return (
    <DefaultSeo
      title={SITE_NAME}
      defaultTitle={SITE_NAME}
      titleTemplate={`%s | ${SITE_NAME}`}
      description={SITE_DESCRIPTION}
      defaultOpenGraphImageWidth={1200}
      defaultOpenGraphImageHeight={550}
      openGraph={{
        type: 'website',
        siteName: SITE_NAME,
        url: origin,
        images: [
          {
            url: `${origin}/origin.png`,
            alt: `${SITE_NAME} Open Graph Image`,
          },
        ],
      }}
      twitter={{
        handle: `@${SOCIAL_TWITTER}`,
        site: `@${SOCIAL_TWITTER}`,
        cardType: 'summary_large_image',
      }}
    />
  )
}
