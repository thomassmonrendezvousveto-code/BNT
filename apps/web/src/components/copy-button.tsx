'use client';

import { useState } from 'react';

type Props = {
  /** Texte à copier dans le presse-papier au clic. */
  text: string;
  /** Libellé par défaut du bouton. */
  label?: string;
  /** Libellé après copie. */
  copiedLabel?: string;
  /** Classe CSS du bouton. */
  className?: string;
};

/**
 * Bouton qui copie un texte dans le presse-papier au clic.
 * Affiche un feedback visuel pendant 2 secondes après la copie.
 */
export function CopyButton({
  text,
  label = 'Copier le message',
  copiedLabel = 'Copié — collez-le où vous voulez',
  className = 'btn secondary',
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback pour les contextes non sécurisés (rare)
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Échec silencieux — on ne veut surtout pas gêner la personne
    }
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {copied ? copiedLabel : label}
    </button>
  );
}
