import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useUnsavedChanges(hasUnsavedChanges: boolean) {
  const navigate = useNavigate();
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && showPrompt) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    const handleNavigate = (e: PopStateEvent) => {
      if (hasUnsavedChanges && showPrompt) {
        if (!window.confirm('Você tem alterações não salvas. Deseja realmente sair?')) {
          e.preventDefault();
          window.history.pushState(null, '', window.location.pathname);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleNavigate);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigate);
    };
  }, [hasUnsavedChanges, showPrompt]);

  const confirmNavigation = (to: string) => {
    if (hasUnsavedChanges && showPrompt) {
      if (window.confirm('Você tem alterações não salvas. Deseja realmente sair?')) {
        setShowPrompt(false);
        navigate(to);
      }
    } else {
      navigate(to);
    }
  };

  return { confirmNavigation };
}