import { uploadService } from '../../shared/services/uploadService';

// Mock do módulo uploadService
jest.mock('../../shared/services/uploadService', () => ({
  uploadService: {
    uploadImage: jest.fn()
  }
}));

describe('uploadService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve fazer upload de imagem com sucesso', async () => {
    const mockUrl = 'https://example.com/image.jpg';
    (uploadService.uploadImage as jest.Mock).mockResolvedValueOnce(mockUrl);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const url = await uploadService.uploadImage(file);

    expect(url).toBe(mockUrl);
    expect(uploadService.uploadImage).toHaveBeenCalledWith(file);
  });

  test('deve lançar erro quando upload falha', async () => {
    (uploadService.uploadImage as jest.Mock).mockRejectedValueOnce(new Error('Falha no upload da imagem'));

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    await expect(uploadService.uploadImage(file)).rejects.toThrow('Falha no upload da imagem');
  });
});