import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';

const mockOrderResult = {
  total: 1,
  items: [
    {
      id: 'uuid-1',
      film: 'film-1',
      session: 'session-1',
      daytime: '2024-01-01 10:00',
      row: 1,
      seat: 1,
      price: 500,
    },
  ],
};

const mockOrderService = {
  createOrder: jest.fn(),
};

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('должен успешно создать заказ и вернуть результат', async () => {
      mockOrderService.createOrder.mockResolvedValue(mockOrderResult);

      const dto: OrderDto = {
        email: 'test@test.com',
        phone: '+79001234567',
        tickets: [
          {
            film: 'film-1',
            session: 'session-1',
            daytime: '2024-01-01 10:00',
            row: 1,
            seat: 1,
            price: 500,
          },
        ],
      };

      const result = await controller.create(dto);

      expect(result).toEqual(mockOrderResult);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(dto);
    });

    it('должен выбросить NotFoundException если фильм или сеанс не найден', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new NotFoundException('Film or session not found'),
      );

      const dto: OrderDto = {
        email: 'test@test.com',
        phone: '+79001234567',
        tickets: [
          {
            film: 'nonexistent-film',
            session: 'nonexistent-session',
            daytime: '2024-01-01 10:00',
            row: 1,
            seat: 1,
            price: 500,
          },
        ],
      };

      await expect(controller.create(dto)).rejects.toThrow(NotFoundException);
    });

    it('должен выбросить BadRequestException если место уже занято', async () => {
      mockOrderService.createOrder.mockRejectedValue(
        new BadRequestException('Seat 1:1 is already taken'),
      );

      const dto: OrderDto = {
        email: 'test@test.com',
        phone: '+79001234567',
        tickets: [
          {
            film: 'film-1',
            session: 'session-1',
            daytime: '2024-01-01 10:00',
            row: 1,
            seat: 1,
            price: 500,
          },
        ],
      };

      await expect(controller.create(dto)).rejects.toThrow(BadRequestException);
    });

    it('должен вызывать orderService.createOrder с переданным dto', async () => {
      mockOrderService.createOrder.mockResolvedValue(mockOrderResult);

      const dto: OrderDto = {
        email: 'user@example.com',
        phone: '+79999999999',
        tickets: [],
      };

      await controller.create(dto);

      expect(mockOrderService.createOrder).toHaveBeenCalledTimes(1);
      expect(mockOrderService.createOrder).toHaveBeenCalledWith(dto);
    });
  });
});
