import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { DragonColor, DragonType, dragonImages } from '../data/dragonImages';

interface GeneratedDragon {
  name: string;
  type: string;
  imageUrl: string;
}

interface DragonGeneratorProps {
  onGenerateDragon?: (dragon: {
    name: string;
    type: string;
    color: string;
  }) => void;
}


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
  gap: 0.8rem;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
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
  color: ${props => props.type === "submit" ? "#828080" : "#828080"};
  width: 50%;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 72, 255, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto 0;
  padding: 3rem;
  border-radius: 20px;
  background: white;
  
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

const PreviewImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto;
  display: block;
  padding: 3px;
  background: linear-gradient(45deg, #0048ff, #5888ff, #ff8bf3, #FFC5EA);
`;

const PreviewInfo = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  h3 {
    color: #828080;
    font-size: 24px;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #828080;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  margin-top: 0.5rem;
  text-align: center;
`;

export function DragonGenerator({ onGenerateDragon }: DragonGeneratorProps) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState<DragonType | ''>('');
  const [color, setColor] = useState<DragonColor | ''>('');
  const [generatedDragon, setGeneratedDragon] = useState<GeneratedDragon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const dragonTypes: DragonType[] = [
    'Fogo',
    'Água',
    'Terra',
    'Ar',
    'Gelo',
    'Elétrico',
    'Noturno',
    'Venenoso',
  ];

  const dragonColors: DragonColor[] = [
    'Amarelo',
    'Azul',
    'Rosa',
    'Roxo',
    'Verde',
    'Vermelho'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !type || !color) {
      setError('Por favor, preencha todos os campos.');  // Adicionado o ponto final
      return;
    }

    try {
      setIsLoading(true);

      // Chama a prop onGenerateDragon se ela existir
      if (onGenerateDragon) {
        onGenerateDragon({ name, type, color });
      }

      // encontra a imagem correspondente
      const matchingDragon = dragonImages.find(
        dragon => dragon.color === color && dragon.type === type
      );

      if (!matchingDragon) {
        throw new Error('Combinação de cor e tipo não encontrada');
      }

      const newDragon = {
        name,
        type,
        imageUrl: matchingDragon.url
      };

      setGeneratedDragon(newDragon);
    } catch (err) {
      setError('Erro ao gerar dragão. Por favor, tente outra combinação.');
      console.error('Erro na geração:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (generatedDragon) {
      try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const userDragons = JSON.parse(localStorage.getItem(`dragons_${currentUser.id}`) || '[]');
        
        const newDragon = {
          id: Date.now(),
          ...generatedDragon,
          createdAt: new Date().toISOString()
        };

        userDragons.push(newDragon);
        localStorage.setItem(`dragons_${currentUser.id}`, JSON.stringify(userDragons));
        
        window.dispatchEvent(new Event('storage'));
        
        navigate('/dragons');
      } catch (err) {
        setError('Erro ao salvar dragão. Por favor, tente novamente.');
        console.error('Erro ao salvar:', err);
      }
    }
  };

  return (
    <Container>
      <Title>Gerador de Dragões</Title>
      <Form onSubmit={handleGenerate} role="form" aria-label="Formulário de geração de dragão">
        <FormGroup>
          <Label htmlFor="dragon-name">Nome do Dragão</Label>
          <Input
            id="dragon-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do dragão"
            required
            aria-required="true"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="dragon-type">Tipo do Dragão</Label>
          <Select
            id="dragon-type"
            value={type}
            onChange={(e) => setType(e.target.value as DragonType)}
            required
            aria-label="Tipo do Dragão"
            aria-required="true"
          >
            <option value="">Selecione um tipo</option>
            {dragonTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="dragon-color">Cor do Dragão</Label>
          <Select
            id="dragon-color"
            value={color}
            onChange={(e) => setColor(e.target.value as DragonColor)}
            required
            aria-label="Cor do Dragão"
            aria-required="true"
          >
            <option value="">Selecione uma cor</option>
            {dragonColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </Select>
        </FormGroup>

        {error && (
          <ErrorMessage role="alert" aria-live="polite">
            {error}
          </ErrorMessage>
        )}

        <ButtonContainer>   
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Gerando...' : 'Gerar Dragão'}
          </Button>
        </ButtonContainer>  
      </Form>

      {generatedDragon && (
        <PreviewContainer>
          <PreviewImage src={generatedDragon.imageUrl} alt={generatedDragon.name} />
          <PreviewInfo>
            <h3>{generatedDragon.name}</h3>
            <p>Tipo: {generatedDragon.type}</p>
          </PreviewInfo>
          <ButtonContainer>
            <Button onClick={handleSave}>
              Adicionar à Lista
            </Button>
          </ButtonContainer>
        </PreviewContainer>
      )}
    </Container>
  );
}

export default DragonGenerator;