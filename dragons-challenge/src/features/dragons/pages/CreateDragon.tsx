import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { dragonsService } from '../services/dragonService';
import { uploadService } from '../../../shared/services/uploadService';
import { useUnsavedChanges } from '../../../shared/hooks/useUnsavedChanges';

const Container = styled.div`
  padding: 2rem 4rem 2rem 6rem;
  width: 100%;
  min-height: 100vh;
  background: white;
  
`;

const Title = styled.h1`
  font-size: 40px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  background: linear-gradient(90deg, #0048FF 0%, #FF8BF3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  padding-bottom: 8px;
  line-height: 1.2;
`;

const Form = styled.form`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem;
  border-radius: 20px;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(45deg, #0048ff, #5888ff, #ff8bf3, #FFC5EA);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: 400;
  color: #828080;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 1rem;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  color: #828080;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  outline: none;

  &:focus {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
  }

  &::placeholder {
    color: #828080;
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: none;
  border-radius: 28px;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  color: #828080;
  background: white;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  outline: none;
  cursor: pointer;

  &:focus {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.12);
  }
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  padding: 3px;
  border-radius: 50%;
  margin: 0 auto 2rem;
  background: linear-gradient(45deg, #0048ff, #5888ff, #ff8bf3, #FFC5EA);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(45deg, #0048ff, #5888ff, #ff8bf3, #FFC5EA);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: 
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  font-size: 3rem;
  color: #4a9eff;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  background: white;
`;

const Button = styled.button`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 28px;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.09);
  background: white;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &[type="submit"] {
    color: #828080;

    &:hover {
      box-shadow: 0px 4px 16px rgba(0, 72, 255, 0.2);
    }
  }
`;

const CancelButton = styled(Button)`
   color: #828080;
  background: white;

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 72, 255, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  margin-top: 0.5rem;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #333;
  border-radius: 2px;
  margin-top: 1rem;
`;

const ProgressBarFill = styled.div<{ $progress: number }>`
  height: 100%;
  background-color: #4a9eff;
  border-radius: 2px;
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

const UploadInfo = styled.p`
  color: #999;
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

      const newDragon = {
        name: name.trim(),
        type,
        imageUrl,
        createdAt: new Date().toISOString()
      };

      await dragonsService.createDragon(newDragon);

      // atualizar lista de dragoes no local storage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const userDragons = JSON.parse(localStorage.getItem(`dragons_${currentUser.id}`) || '[]');
      userDragons.push({ ...newDragon, id: Date.now() });
      localStorage.setItem(`dragons_${currentUser.id}`, JSON.stringify(userDragons));

      //disparar evento para atualizar a lista
      window.dispatchEvent(new Event('storage'));

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
          <ImagePreviewContainer onClick={() => document.getElementById('image')?.click()}>
            <ImageWrapper>
            {imagePreview ? (
              <ImagePreview src={imagePreview} alt="Preview" />
            ) : (
              <ImagePlaceholder>🐲</ImagePlaceholder>
            )}
            </ImageWrapper>
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

export default CreateDragon;