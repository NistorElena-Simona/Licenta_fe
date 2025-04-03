'use client';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import AuthModal from "../components/modals/login_signup";
import { useModalContext } from "../components/context/ModalContext";
import { Shiba } from "@/components/humanbody/page";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isModalOpen, closeModal } = useModalContext();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-background text-foreground min-h-screen">
      {/* Secțiunea principală cu componenta Shiba */}
      <div className="w-full h-full">
        <Shiba />
      </div>

      {/* Modal pentru autentificare */}
      <div className="mt-8">
        <Modal isOpen={isModalOpen} onOpenChange={onOpenChange} onClose={closeModal}>
          <ModalContent>
            
              <>
                <ModalHeader className="mb-4">Login</ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter />
              </>
          </ModalContent>
        </Modal>
      </div>

      
     
    </section>
  );
}
