import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { NotFoundException } from '@nestjs/common';

const mockFilms = [
  {
    id: '1',
    title: 'Тестовый фильм',
    rating: 8.5,
    director: 'Алан Смит',
    tags: ['драма'],
    image: 'image.jpg',
    cover: 'cover.jpg',
    about: 'Описание',
    description: 'Lorem Ipsum',
    schedule: [],
  },
];

const mockSchedule = [
  {
    id: 'session-1',
    daytime: '2024-01-01 10:00',
    hall: 1,
    rows: 10,
    seats: 10,
    price: 500,
    taken: [],
    filmId: '1',
  },
];

const mockFilmsService = {
  findAll: jest.fn(),
  findSchedule: jest.fn(),
};

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFilms', () => {
    it('должен вернуть список фильмов с total', async () => {
      const expected = { total: 1, items: mockFilms };
      mockFilmsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(result).toEqual(expected);
      expect(mockFilmsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('должен вернуть пустой список если фильмов нет', async () => {
      const expected = { total: 0, items: [] };
      mockFilmsService.findAll.mockResolvedValue(expected);

      const result = await controller.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('getSchedule', () => {
    it('должен вернуть расписание фильма по id', async () => {
      const expected = { total: 1, items: mockSchedule };
      mockFilmsService.findSchedule.mockResolvedValue(expected);

      const result = await controller.getSchedule('1');

      expect(result).toEqual(expected);
      expect(mockFilmsService.findSchedule).toHaveBeenCalledWith('1');
    });

    it('должен выбросить NotFoundException если фильм не найден', async () => {
      mockFilmsService.findSchedule.mockRejectedValue(
        new NotFoundException('Film with id 999 not found'),
      );

      await expect(controller.getSchedule('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
