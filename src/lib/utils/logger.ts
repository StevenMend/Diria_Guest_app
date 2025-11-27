// src/lib/utils/logger.ts
/**
 * Centralized logging system
 * Logs only show in development, nothing in production
 */

const isDev = import.meta.env.DEV;

class Logger {
  private prefix(level: string): string {
    return `[${level}]`;
  }

  /**
   * Info logs - General information
   * Example: logger.info('User logged in', { userId: '123' })
   */
  info(message: string, ...args: any[]) {
    if (isDev) {
      console.log(this.prefix('INFO'), message, ...args);
    }
  }

  /**
   * Success logs - Successful operations
   * Example: logger.success('Data saved successfully')
   */
  success(message: string, ...args: any[]) {
    if (isDev) {
      console.log(this.prefix('✅'), message, ...args);
    }
  }

  /**
   * Warning logs - Potential issues
   * Example: logger.warn('No data found, using defaults')
   */
  warn(message: string, ...args: any[]) {
    if (isDev) {
      console.warn(this.prefix('⚠️'), message, ...args);
    }
  }

  /**
   * Error logs - Always shown (even in production)
   * Example: logger.error('API call failed', error)
   */
  error(message: string, ...args: any[]) {
    console.error(this.prefix('❌'), message, ...args);
  }

  /**
   * Debug logs - Detailed debugging information
   * Example: logger.debug('Request payload', payload)
   */
  debug(message: string, ...args: any[]) {
    if (isDev) {
      console.log(this.prefix('🔍'), message, ...args);
    }
  }

  /**
   * Feature logs - Feature-specific logs with emoji
   * Example: logger.feature('🍽️', 'RestaurantsPage render')
   */
  feature(emoji: string, message: string, ...args: any[]) {
    if (isDev) {
      console.log(`${emoji} ${message}`, ...args);
    }
  }
}

export const logger = new Logger();
