export const AddProgrammedButton = () => {
  return (
    <div className="relative w-fit  after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition   after:duration-300 after:origin-left text-light-text items-center text-xl ">
      <div
        className="flex gap-2 items-center cursor-pointer w-full justify-end"
        onClick={openAddTransaction}
      >
        Adicionar programação
        <BiPlus aria-label="ícone de Mais" size={30} />
      </div>
    </div>
  );
};
