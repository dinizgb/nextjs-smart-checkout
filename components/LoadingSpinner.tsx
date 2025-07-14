export function LoadingSpinner() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">        
        <div 
          className="
            h-12 w-12 
            border-4 
            border-solid 
            rounded-full 
            
            // Cor cinza para a borda (a maior parte da borda)
            border-gray-300 
            
            // A parte que 'gira': usa um cinza mais escuro (border-t-gray-900)
            border-t-gray-900 
            
            // Aplica a animação de spin do Tailwind
            animate-spin
          "
        ></div>
      </div>
    );
}