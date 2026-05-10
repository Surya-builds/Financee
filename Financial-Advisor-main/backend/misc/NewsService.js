// newsService.js
const NodeCache = require('node-cache');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

class NewsService {
  constructor() {
    // Cache with 2 hour TTL (time to live)
    this.cache = new NodeCache({ stdTTL: 7200 });
    this.cacheKey = 'financial_news';
    this.backupFilePath = path.join(process.cwd(), 'data', 'news-backup.json');
    
    // Create data directory if it doesn't exist
    fs.mkdir(path.join(process.cwd(), 'data'), { recursive: true }).catch(console.error);
  }

  async fetchNews() {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=finance&apikey=${process.env.ALPHA_VANTAGE_API_KEY}&limit=10`
      );

      if (!response.data || !response.data.feed) {
        throw new Error('Invalid response from news API');
      }

      const processedNews = response.data.feed.map(article => ({
        title: article.title,
        url: article.url,
        summary: article.summary,
        source: article.source,
        timePublished: article.time_published,
        topics: article.topics,
        sentiment: article.overall_sentiment_label
      }));

      // Update cache
      this.cache.set(this.cacheKey, processedNews);

      // Backup to file
      await this.backupToFile(processedNews);

      return processedNews;
    } catch (error) {
      console.error('Error fetching news:', error);
      // Try to load from backup file if API fails
      return this.loadFromBackup();
    }
  }

  async backupToFile(news) {
    try {
      await fs.writeFile(
        this.backupFilePath,
        JSON.stringify({ timestamp: Date.now(), news }),
        'utf8'
      );
    } catch (error) {
      console.error('Error backing up news:', error);
    }
  }

  async loadFromBackup() {
    try {
      const data = await fs.readFile(this.backupFilePath, 'utf8');
      const { news } = JSON.parse(data);
      return news;
    } catch (error) {
      console.error('Error loading news backup:', error);
      return [];
    }
  }

  async getNews() {
    // Try to get from cache first
    let news = this.cache.get(this.cacheKey);
    
    if (news) {
      return news;
    }

    // If not in cache, fetch new data
    news = await this.fetchNews();
    return news;
  }

  // Start periodic updates
  startPeriodicUpdates(intervalMinutes = 60) {
    setInterval(async () => {
      console.log('Updating news cache...');
      await this.fetchNews();
    }, intervalMinutes * 60 * 1000);
  }
}

module.exports = new NewsService();