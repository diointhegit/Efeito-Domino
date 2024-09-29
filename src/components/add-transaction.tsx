import { CloseButton } from "./close-button";

export function AddTransaction({ close }: { close: () => void }) {
  return (
    <div className="inset-0 flex items-center justify-center absolute bg-black/75 transition-all duration-100 ">
      <div className="w-[50rem] bg-white h-[50rem]">
        <div className="flex items-center">
          <p>Adicionar uma transação</p>
          <CloseButton close={close} />
        </div>
      </div>
    </div>
  );
}
