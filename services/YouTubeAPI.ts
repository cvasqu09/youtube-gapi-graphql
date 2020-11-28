import axios from 'axios';

const YouTubeAPIInstance = axios.create({
  baseURL: process.env['YOUTUBE_API_BASE_URL'],
  timeout: 1000,
});

export class YouTubeAPI {
  private apiInstance = YouTubeAPIInstance;
  private MAX_RESULTS = 25;

  async getPlaylists(context: any): Promise<any> {
    try {
      const res = await this.apiInstance.get('/playlists', {
        params: {
          maxResults: this.MAX_RESULTS,
          mine: true,
          part: 'snippet,contentDetails',
        },
        headers: this.attachHeaders(context)
      });
      return res.data.items.map(playlist => ({
        ...playlist,
        publishedAt: playlist.snippet?.publishedAt,
        channelId: playlist.snippet?.channelId,
        title: playlist.snippet?.title,
        description: playlist.snippet?.description,
        imageUrl: playlist.snippet?.thumbnails?.high?.url || playlist.snippet?.thumbnails?.medium?.url || '',
        numberOfVideos: playlist.contentDetails?.itemCount
      }));
    } catch (e) {
      console.log('e', e);
    }
  }

  async getPlaylistItems(id: string, context: any): Promise<any> {
    try {
      const res = await this.apiInstance.get('/playlistItems', {
        params: {
          playlistId: id,
          part: 'snippet',
          mine: true,
          maxResults: this.MAX_RESULTS
        },
        headers: this.attachHeaders(context)
      })

      return res.data.items
        .filter((item) => !item.snippet.title.includes('Private video'))
        .map((item) => ({
          publishedAt: item.snippet.publishedAt,
          title: item.snippet.title,
          description: item.snippet.description,
          videoId: item.snippet.resourceId.videoId,
          imageUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
        }));
    } catch (err) {
      console.log('get playlist Items error', err);
    }
  }

  async getVideoInfo(videoIds: string[], context: any): Promise<any> {
    try {
      const res = await this.apiInstance.get('/videos', {
        params: {
          id: videoIds.join(','),
          part: 'snippet',
          maxResults: this.MAX_RESULTS,
        },
        headers: this.attachHeaders(context)
      });

      return res.data.items.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        channelId: item.snippet.channelId,
        tags: item.snippet.tags,
      }));
    } catch (err) {
      console.log('get video info error')
    }
  }

  private attachHeaders = (context) => ({
   authorization: context.authorization
  })
}
