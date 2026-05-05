import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  describe('formatMessage', () => {
    it('должен возвращать валидную JSON строку', () => {
      const result = logger.formatMessage('log', 'test message');
      expect(() => JSON.parse(result)).not.toThrow();
    });

    it('должен содержать поле level', () => {
      const result = JSON.parse(logger.formatMessage('log', 'test'));
      expect(result).toHaveProperty('level', 'log');
    });

    it('должен содержать поле message', () => {
      const result = JSON.parse(logger.formatMessage('log', 'test message'));
      expect(result).toHaveProperty('message', 'test message');
    });

    it('должен содержать поле timestamp', () => {
      const result = JSON.parse(logger.formatMessage('log', 'test'));
      expect(result).toHaveProperty('timestamp');
    });

    it('должен корректно передавать optionalParams', () => {
      const result = JSON.parse(
        logger.formatMessage('log', 'test', 'param1', 'param2'),
      );
      expect(result).toHaveProperty('optionalParams');
    });

    it('должен корректно обрабатывать все уровни логирования', () => {
      const levels = ['log', 'error', 'warn', 'debug', 'verbose'];
      levels.forEach((level) => {
        const result = JSON.parse(logger.formatMessage(level, 'msg'));
        expect(result.level).toBe(level);
      });
    });
  });

  describe('методы логирования', () => {
    it('log должен вызывать console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('тест');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('log должен передавать валидный JSON в console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('тест');
      const arg = spy.mock.calls[0][0];
      expect(() => JSON.parse(arg)).not.toThrow();
      expect(JSON.parse(arg).level).toBe('log');
      spy.mockRestore();
    });

    it('error должен вызывать console.error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('ошибка');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('error должен передавать JSON с уровнем error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('ошибка');
      const arg = spy.mock.calls[0][0];
      expect(JSON.parse(arg).level).toBe('error');
      spy.mockRestore();
    });

    it('warn должен вызывать console.warn', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('предупреждение');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('warn должен передавать JSON с уровнем warn', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('предупреждение');
      const arg = spy.mock.calls[0][0];
      expect(JSON.parse(arg).level).toBe('warn');
      spy.mockRestore();
    });

    it('debug должен вызывать console.debug', () => {
      const spy = jest.spyOn(console, 'debug').mockImplementation(() => {});
      logger.debug('отладка');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('verbose должен вызывать console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.verbose('подробно');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  });
});
