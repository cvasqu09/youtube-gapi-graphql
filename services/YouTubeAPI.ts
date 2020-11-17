import axios from 'axios';

const YouTubeAPIInstance = axios.create({
  baseURL: process.env['YOUTUBE_API_BASE_URL'],
  timeout: 1000,
});

export class YouTubeAPI {
  private apiInstance = YouTubeAPIInstance;
  private MAX_RESULTS = 25;

  async getPlaylists(): Promise<any> {
    try {
      const res = await this.apiInstance.get('/playlists', {
        params: {
          maxResults: this.MAX_RESULTS,
          mine: true,
          part: 'snippet,contentDetails',
        },
      });
      console.log('getPlaylists results', res);
      return res.data.items;
    } catch(e) {
      // console.log('e', e);
    }
  }
}
