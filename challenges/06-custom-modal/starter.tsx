import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
  // TODO: add ref for focus management
  // TODO: add keydown effect for Escape key
  // TODO: render via portal into document.body
  return (
    <div /* overlay */>
      <div /* modal box */>
        <h2>Modal Title</h2>
        <p>This is the modal content.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Custom Modal</h1>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default App;
