import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query') || 'landscape';

  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    // Rate limit management
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      // Do not log this error in production
      if (process.env.NODE_ENV !== 'production') {
        console.error('Rate limit exceeded on Unsplash API');
      }
      return NextResponse.json(
        { error: 'Rate limit exceeded', type: 'rate_limit' },
        { status: 500 },
      );
    }

    // Other errors
    console.error('Error fetching from Unsplash:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 },
    );
  }
}
