import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = ['test'];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(result); // Mocking asynchronous method with mockResolvedValue
      expect(await usersController.findAll()).toBe(result);
    });
  });
});
