import React, { useState, useEffect } from 'react';
import "../styles/News.css";

const NewsArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("api/news/fetch", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch news');
      }

      const newsArray = Array.isArray(data.data) ? data.data : Object.values(data.data);
      setNewsData(newsArray);
      
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setError(error.message || "Failed to fetch news. Please try again later.");
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    
    // Set up auto-refresh every 5 minutes
    const refreshInterval = setInterval(fetchNews, 300000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const formatDate = (timestamp) => {
    try {
      const year = timestamp.slice(0, 4);
      const month = timestamp.slice(4, 6);
      const day = timestamp.slice(6, 8);
      const hour = timestamp.slice(9, 11);
      const minute = timestamp.slice(11, 13);
      
      const date = new Date(
        year,
        parseInt(month) - 1,
        day,
        hour,
        minute
      );

      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Error formatting date:', e);
      return timestamp;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch(sentiment?.toLowerCase()) {
      case 'positive': return '#4CAF50';
      case 'negative': return '#f44336';
      case 'neutral': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  if (loading) {
    return (
      <div className="news-container">
        <div className="loading-state">
          <div className="loader"></div>
          <p>Loading latest news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchNews} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!newsData || newsData.length === 0) {
    return (
      <div className="news-container">
        <div className="empty-state">
          <p>No news articles available.</p>
          <button onClick={fetchNews} className="retry-button">
            Refresh News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="news_section">
      <div className="news_header">
        <h1>Latest Financial News</h1>
        <button onClick={fetchNews} className="button1 RefreshBtn">
          Refresh
        </button>
      </div>
      
      <div className="news-container">
        {newsData.slice(0, 5).map((article, index) => (
          <div 
            key={index}
            className={`news-card ${selectedArticle === index ? 'expanded' : ''}`}
            onClick={() => setSelectedArticle(selectedArticle === index ? null : index)}
          >
            <div className="news-header">
              <h3>{article.title}</h3>
              <div className="news-meta">
                <span className="source">{article.source}</span>
                <span className="time">{formatDate(article.timePublished)}</span>
              </div>
            </div>
            
            <div className="news-content">
              <p>{article.summary}</p>
              
              <div className="news-footer">
                {article.topics && article.topics.length > 0 && (
                  <div className="topics">
                    {article.topics.map((topicObj, i) => (
                      <span 
                        key={i} 
                        className="topic-tag"
                        style={{
                          opacity: topicObj.relevance_score || 1
                        }}
                        title={`Relevance: ${(topicObj.relevance_score * 100).toFixed(1)}%`}
                      >
                        {topicObj.topic}
                      </span>
                    ))}
                  </div>
                )}
                
                {article.sentiment && (
                  <div 
                    className="sentiment-indicator"
                    style={{ backgroundColor: getSentimentColor(article.sentiment) }}
                  >
                    {article.sentiment}
                  </div>
                )}
              </div>

              {article.url && (
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="read-more"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read Full Article ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;