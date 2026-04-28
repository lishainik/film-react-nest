import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  describe('formatMessage', () => {
    it('должен заканчиваться символом новой строки', () => {
      const result = logger.formatMessage('log', 'test');
      expect(result.endsWith('\n')).toBe(true);
    });

    it('должен содержать поле level', () => {
      const result = logger.formatMessage('log', 'test');
      expect(result).toContain('level=log');
    });

    it('должен содержать поле message', () => {
      const result = logger.formatMessage('log', 'test message');
      expect(result).toContain('message=test message');
    });

    it('должен содержать поле timestamp', () => {
      const result = logger.formatMessage('log', 'test');
      expect(result).toContain('timestamp=');
    });

    it('поля должны разделяться символом табуляции', () => {
      const result = logger.formatMessage('log', 'test');
      const withoutNewline = result.trimEnd();
      const fields = withoutNewline.split('\t');
      expect(fields.length).toBeGreaterThanOrEqual(3);
    });

    it('каждое поле должно быть в формате key=value', () => {
      const result = logger.formatMessage('log', 'test');
      const withoutNewline = result.trimEnd();
      const fields = withoutNewline.split('\t');
      fields.forEach((field) => {
        expect(field).toMatch(/^.+=.*/);
      });
    });

    it('должен корректно обрабатывать все уровни логирования', () => {
      const levels = ['log', 'error', 'warn', 'debug', 'verbose'];
      levels.forEach((level) => {
        const result = logger.formatMessage(level, 'msg');
        expect(result).toContain(`level=${level}`);
      });
    });

    it('должен корректно обрабатывать объект в optionalParams', () => {
      const result = logger.formatMessage('log', 'test', { key: 'value' });
      expect(result).toContain('param_0=');
    });

    it('должен корректно обрабатывать строку в optionalParams', () => {
      const result = logger.formatMessage('log', 'test', 'extra');
      expect(result).toContain('param_0=extra');
    });
  });

  describe('методы логирования', () => {
    it('log должен вызывать console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('тест');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('log должен передавать TSKV строку в console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
      logger.log('тест');
      const arg = spy.mock.calls[0][0];
      expect(arg).toContain('level=log');
      expect(arg).toContain('message=тест');
      spy.mockRestore();
    });

    it('error должен вызывать console.error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('ошибка');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it('error должен передавать TSKV строку с уровнем error', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
      logger.error('ошибка');
      const arg = spy.mock.calls[0][0];
      expect(arg).toContain('level=error');
      spy.mockRestore();
    });

    it('warn должен вызывать console.warn', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      logger.warn('предупреждение');
      expect(spy).toHaveBeenCalledTimes(1);
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
