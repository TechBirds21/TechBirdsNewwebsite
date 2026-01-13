const RATE_LIMIT_KEY = 'contact_form_submissions';
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 60 * 60 * 1000;

export const checkRateLimit = (): { allowed: boolean; remainingTime?: number } => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    
    if (!stored) {
      return { allowed: true };
    }

    const data = JSON.parse(stored);
    const now = Date.now();
    
    const recentSubmissions = data.timestamps.filter((timestamp: number) => 
      now - timestamp < TIME_WINDOW
    );

    if (recentSubmissions.length >= MAX_SUBMISSIONS) {
      const oldestSubmission = Math.min(...recentSubmissions);
      const remainingTime = TIME_WINDOW - (now - oldestSubmission);
      return { 
        allowed: false, 
        remainingTime: Math.ceil(remainingTime / 1000 / 60)
      };
    }

    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
      timestamps: recentSubmissions
    }));

    return { allowed: true };
  } catch (error) {
    // If there's an error, allow the submission (fail open)
    console.error('Rate limit check error:', error);
    return { allowed: true };
  }
};

export const recordSubmission = (): void => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();
    
    if (!stored) {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({
        timestamps: [now]
      }));
      return;
    }

    const data = JSON.parse(stored);
    data.timestamps.push(now);
    
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data));
  } catch (error) {
  }
};

export const clearRateLimit = (): void => {
  try {
    localStorage.removeItem(RATE_LIMIT_KEY);
  } catch (error) {
  }
};

