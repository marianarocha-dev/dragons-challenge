import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { dragonsService } from '../services/dragonService';
import { uploadService } from '../../../shared/services/uploadService';
import { useUnsavedChanges } from '../../../shared/hooks/useUnsavedChanges';

const Container = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  color: #666;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ImagePreviewContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px dashed #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: #3498db;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  font-size: 3rem;
  color: #ddd;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background: #e74c3c;

  &:hover {
    background: #c0392b;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #eee;
  border-radius: 2px;
  margin-top: 1rem;
`;

const ProgressBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  background-color: #3498db;
  border-radius: 2px;
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

const UploadInfo = styled.p`
  color: #666;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
`;

function ProgressBar({ progress }: { progress: number }) {
  return (
    <ProgressBarContainer>
      <ProgressBarFill $progress={progress} />
    </ProgressBarContainer>
  );
}

export function CreateDragon() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const hasUnsavedChanges = Boolean(
    name || 
    type || 
    imageFile || 
    imagePreview
  );

  const { confirmNavigation } = useUnsavedChanges(hasUnsavedChanges);

  const dragonTypes = [
    'Fogo',
    'Água',
    'Terra',
    'Ar',
    'Gelo',
    'Elétrico',
    'Noturno',
    'Venenoso',
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('A imagem deve ter no máximo 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('O arquivo deve ser uma imagem');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !type) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setIsLoading(true);
      setUploadProgress(0);
      
      let imageUrl: string | undefined;

      if (imageFile) {
        try {
          setUploadProgress(30);
          imageUrl = await uploadService.uploadImage(imageFile);
          setUploadProgress(70);
        } catch (error) {
          console.error('Erro no upload:', error);
          setError('Erro no upload da imagem. Por favor, tente novamente.');
          setIsLoading(false);
          return;
        }
      }

      await dragonsService.createDragon({
        name: name.trim(),
        type,
        imageUrl
      });

      setUploadProgress(100);
      navigate('/dragons');
    } catch (err) {
      console.error('Erro ao criar dragão:', err);
      setError('Erro ao criar dragão. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    confirmNavigation('/dragons');
  };

  return (
    <Container>
      <Title>Cadastrar Novo Dragão</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="image">Foto do Dragão</Label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <ImagePreviewContainer
            onClick={() => document.getElementById('image')?.click()}
          >
            {imagePreview ? (
              <ImagePreview src={imagePreview} alt="Preview" />
            ) : (
              <ImagePlaceholder>🐲</ImagePlaceholder>
            )}
          </ImagePreviewContainer>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <>
              <ProgressBar progress={uploadProgress} />
              <UploadInfo>Fazendo upload da imagem...</UploadInfo>
            </>
          )}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="name">Nome do Dragão*</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do dragão"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="type">Tipo do Dragão*</Label>
          <Select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="">Selecione um tipo</option>
            {dragonTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Criando...' : 'Cadastrar Dragão'}
          </Button>
          <CancelButton type="button" onClick={handleCancel}>
            Cancelar
          </CancelButton>
        </ButtonGroup>
      </Form>
    </Container>
  );
}