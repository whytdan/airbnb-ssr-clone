import { fetchHomesByCategory } from '../api/homes';

describe('Check we get first 5 homes by category', () => {
  test('should check if we have any homes', async () => {
    const homes = await fetchHomesByCategory('unique-housing');
    expect(homes.length).toBeGreaterThan(0);
  });

  test('should check if all fetched homes have correct category field', async () => {
    const homes = await fetchHomesByCategory('unique-housing');

    homes.map((home) => {
      expect(home.categories).toContain('unique-housing');
    });
  });
});
