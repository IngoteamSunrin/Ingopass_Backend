import { CheckPermissionMiddleware } from './check-permission.middleware';

describe('CheckPermissionMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckPermissionMiddleware()).toBeDefined();
  });
});
