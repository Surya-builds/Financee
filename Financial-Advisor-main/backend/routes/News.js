const newsService = require('../misc/NewsService');
const express = require("express");
const router = express.Router();

router.get('/fetch', async (req, res) => {
    try {
      const news = await newsService.getNews();
      res.json({
        success: true,
        timestamp: new Date().toISOString(),
        data: news
      });
    } catch (error) {
      console.error('Error in news endpoint:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch news'
      });
    }
  });

module.exports = router;