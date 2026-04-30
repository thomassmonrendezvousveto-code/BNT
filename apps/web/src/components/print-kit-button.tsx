'use client';

export function PrintKitButton() {
  return (
    <button
      type="button"
      className="btn secondary no-print"
      onClick={() => window.print()}
    >
      Imprimer / enregistrer en PDF
    </button>
  );
}
