import {getCityCodeByName} from '../index';

describe('getCityCodeByName', () => {
  test('success', async () => {
    const cityCode = await getCityCodeByName('深圳');
    expect(cityCode).toBe('101280601');
  });
  test('should trow error when getting the wrong name', () => {
     expect(async () => {
       await getCityCodeByName('jfkjg');
     })
    .rejects
    .toThrowError();
  });
});
