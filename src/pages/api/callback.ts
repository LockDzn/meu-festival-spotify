// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { serialize } from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.query

  if (state === null) {
    res.redirect('/#')
  } else {
    const params = new URLSearchParams()
    params.append('code', code as string)
    params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI as string)
    params.append('grant_type', 'authorization_code')

    const config = {
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(
            process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_SECRET
          ).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      params,
      config
    )

    var expires = new Date()
    expires.setSeconds(expires.getSeconds() + response.data.expires_in)

    res.setHeader(
      'Set-Cookie',
      serialize('token', response.data.access_token, {
        path: '/',
        expires: expires,
      })
    )

    res.redirect('/')
  }
}
